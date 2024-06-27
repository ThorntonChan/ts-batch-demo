import express from 'express';
import getBatchStatus from './microbatch/getBatch';
import getMessageStatus from './microbatch/getMessage';
import postMessage from './microbatch/postMessage';
import postStart from './microbatch/postStart';
import postStop from './microbatch/postStop';
import getStarted from './microbatch/getStarted';

const router = express.Router();

router.use(getBatchStatus);
router.use(getMessageStatus);
router.use(postMessage);
router.use(postStart);
router.use(postStop);
router.use(getStarted);

router.get('/', (req, res) => {
  res.send({ status: 200 });
});

export default router;
