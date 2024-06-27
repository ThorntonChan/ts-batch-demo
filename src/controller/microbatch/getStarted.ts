import microBatcher from '../../util/microBatcher';
import { handleErrorResponse } from '../../util/validator';
import express from 'express';

const getStatusRouter = express.Router();

getStatusRouter.get('/started', (req, res) => {
  try {
    return res.status(200).send(microBatcher.started());
  } catch (e) {
    handleErrorResponse(res, e);
  }
});

export default getStatusRouter;
