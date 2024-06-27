import express from 'express';
import { handleErrorResponse, validateOrError } from '../../util/validator';
import microBatcher from '../../util/microBatcher';
import { MessageTypeSchema } from './schema';

const getMessageStatusRouter = express.Router();

getMessageStatusRouter.get('/message', (req, res) => {
  try {
    const messageString = req.query?.message;
    if (typeof messageString !== 'string') {
      throw new Error('Message query parameter is missing or not a string');
    }
    const messageJson = JSON.parse(messageString).message;
    const message = validateOrError(messageJson, MessageTypeSchema);
    const messageStatus = microBatcher.status(message);
    res.status(messageStatus.status === 'NOTFOUND' ? 404 : 200).send(messageStatus);
  } catch (e) {
    handleErrorResponse(res, e);
  }
});

export default getMessageStatusRouter;
