import microBatcher from '../../util/microBatcher';
import { handleErrorResponse } from '../../util/validator';
import express from 'express';

const postStopRouter = express.Router();

postStopRouter.post('/stop', (req, res) => {
  try {
    microBatcher.stop();
    return res.status(200).send();
  } catch (e) {
    handleErrorResponse(res, e);
  }
});
export default postStopRouter;
