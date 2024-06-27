/*
**Test notes**
This is a test of the microBatcher functionality, although these are high-level tests,  server functionality and route
viability including validation may not be thoroughly tested.
*/
import {afterAll, beforeAll, describe, expect, jest, test} from '@jest/globals';
import {server} from '../src/index';
import request from 'supertest';
import {newRandomMessage} from './test.utils';
import microBatcher from '../src/util/microBatcher';
import {mockAdd, mockBatchStatus, mockStart, mockStarted, mockStatus, mockStop} from './__mocks__/microBatcher';
import {MessageType} from '../src/controller/microbatch/schema';

process.env.NODE_ENV = 'test';

const batchRoute = '/batch';
const messageRoute = '/message';
const startedRoute = '/started';
const stopRoute = '/stop';
const startRoute = '/start';

let messages: { message: MessageType }[] = [];
let responses: { batchId: string | null; status: string }[] = [];

beforeAll(async () => {
  jest.spyOn(microBatcher, 'add').mockImplementation(mockAdd);
  jest.spyOn(microBatcher, 'status').mockImplementation(mockStatus);
  jest.spyOn(microBatcher, 'batchStatus').mockImplementation(mockBatchStatus);
  jest.spyOn(microBatcher, 'start').mockImplementation(mockStart);
  jest.spyOn(microBatcher, 'stop').mockImplementation(mockStop);
  jest.spyOn(microBatcher, 'started').mockImplementation(mockStarted);
  for (let i = 0; i < 20; i++) {
    const message = newRandomMessage();
    messages.push(message);
    const res = await request(server).post(messageRoute).send(message);
    responses.push(res.body);
    expect(res.status).toBe(201);
  }
});

describe('ts-batch microBatcher tests', () => {
  test('start, stop and startedRoute is working', async () => {
    let res;
    res = await request(server).get(startedRoute);
    expect(res.status).toBe(200);
    expect(res.body).toBe(true);
    res = await request(server).post(stopRoute);
    expect(res.status).toBe(200);
    res = await request(server).post(messageRoute).send(newRandomMessage());
    expect(res.status).toBe(405);
    res = await request(server).get(startedRoute);
    expect(res.status).toBe(200);
    expect(res.body).toBe(false);
    res = await request(server).post(startRoute);
    expect(res.status).toBe(200);
    res = await request(server).post(messageRoute).send(newRandomMessage());
    expect(res.status).toBe(201);
    res = await request(server).get(startedRoute);
    expect(res.status).toBe(200);
    expect(res.body).toBe(true);
  });

  test('deduplication is working', async () => {
    let res;
    const message = newRandomMessage();
    res = await request(server).post(messageRoute).send(message);
    expect(res.status).toBe(201);
    res = await request(server).post(messageRoute).send(message);
    expect(res.status).toBe(405);
  });

  test('reading statuses from cache is working', async () => {
    let res;
    const messageString = JSON.stringify({ message: messages[10].message });
    res = await request(server).get(`${messageRoute}?message=${messageString}`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBeDefined();
    const batchId = res.body.batchId;
    res = await request(server).get(`${batchRoute}?batchId=${batchId}`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBeDefined();
  });

  test('batching and caching is working', async () => {
    let res;
    const messageString = JSON.stringify({ message: messages[0].message });
    res = await request(server).get(`${messageRoute}?message=${messageString}`);
    expect(res.status).toBe(404);
    expect(res.body.status).toBe('NOTFOUND');
    const batchId = responses.filter((r) => r.batchId !== null)[0].batchId;
    res = await request(server).get(`${batchRoute}?batchId=${batchId}`);
    expect(res.status).toBe(404);
    expect(res.body.status).toBe('NOTFOUND');
  });

  // test will time out (fail) after 5000ms, therefore 1 request per 0.5ms must be supported.
  // NB: this may not be possible on older systems
  test('high throughput is supported', async () => {
    for (let i = 0; i < 10000; i++) {
      const res = await request(server).post(messageRoute).send(newRandomMessage());
      expect(res.status).toBe(201);
    }
    expect(mockAdd.mock.calls.length).toBeGreaterThanOrEqual(5000);
  }, 10000);
});

afterAll(() => {
  server.close();
});
