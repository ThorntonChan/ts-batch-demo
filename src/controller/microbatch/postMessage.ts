import express from 'express';
import microBatcher from '../../util/microBatcher';
import { handleErrorResponse, validateOrError } from '../../util/validator';
import { MessageTypeSchema } from './schema';

const postMessageRouter = express.Router();

postMessageRouter.post('/message', (req, res) => {
  try {
    const message = validateOrError(req.body.message, MessageTypeSchema);
    const messageStatus = microBatcher.add(message);
    if (messageStatus.status === 'QUEUED' || messageStatus.status === 'BATCHED') {
      res.status(201).send(messageStatus);
      return;
    } else if (messageStatus.status === 'DECLINED') {
      res.status(405).send(messageStatus);
      return;
    } else if (messageStatus.status === 'NOTFOUND') {
      res.status(404).send(messageStatus);
      return;
    }
    res.status(500).send(messageStatus);
    return;
  } catch (e) {
    console.log(e);
    handleErrorResponse(res, e);
  }
});

export default postMessageRouter;
