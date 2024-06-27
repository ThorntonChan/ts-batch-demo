import { uuidv4 } from 'ts-batch/dist/util';

export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const newRandomMessage = () => {
  return {
    message: {
      id: randomInt(0, 100000),
      message: uuidv4(),
      body: { data: uuidv4() },
    },
  };
};
