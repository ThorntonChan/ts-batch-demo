import { MicroBatcher } from 'ts-batch/dist/MicroBatcher';
import { MessageType } from '../controller/microbatch/schema';

export const microBatcherConfig = {
  maxBatchSize: 3,
  maxBatchTime: 1000,
  cacheLifespan: 5,
  batchProcessFn: async (batch: any) => {},
};
const microBatcher = new MicroBatcher<MessageType>(microBatcherConfig);

export default microBatcher;
