import express from 'express';
import { handleErrorResponse } from '../../util/validator';
import microBatcher from '../../util/microBatcher';

const postStartRouter = express.Router();

postStartRouter.post('/start', (req, res) => {
  try {
    microBatcher.start();
    return res.status(200).send();
  } catch (e) {
    handleErrorResponse(res, e);
  }
});

export default postStartRouter;
