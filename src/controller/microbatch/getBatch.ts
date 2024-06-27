import express from 'express';
import { handleErrorResponse, validateOrError } from '../../util/validator';
import microBatcher from '../../util/microBatcher';
import { z } from 'zod';

const getBatchStatusRouter = express.Router();

getBatchStatusRouter.get('/batch', (req, res) => {
  try {
    const batchId = req.query.batchId;
    const batchIdString = validateOrError(batchId, z.string());
    const batchStatus = microBatcher.batchStatus(batchIdString);
    res.status(batchStatus.status === 'NOTFOUND' ? 404 : 200).send(batchStatus);
  } catch (e) {
    handleErrorResponse(res, e);
  }
});

export default getBatchStatusRouter;
