import { jest } from '@jest/globals';
import { MicroBatcher } from 'ts-batch/dist/MicroBatcher';
import { microBatcherConfig } from '../../src/util/microBatcher';

const mockMicroBatcher = new MicroBatcher(microBatcherConfig);
export const mockAdd = jest.fn((message) => mockMicroBatcher.add(message));
export const mockStatus = jest.fn((message) => mockMicroBatcher.status(message));
export const mockBatchStatus = jest.fn((batchId: string) => mockMicroBatcher.batchStatus(batchId));
export const mockStart = jest.fn(() => mockMicroBatcher.start());
export const mockStop = jest.fn(() => mockMicroBatcher.stop());
export const mockStarted = jest.fn(() => mockMicroBatcher.started());
