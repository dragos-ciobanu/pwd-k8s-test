import { Router } from 'express';
import { getScore, getIsCommon, getIsReused } from './Password';

const passwordRouter = Router();
passwordRouter.post('/score', getScore);
passwordRouter.post('/common', getIsCommon);
passwordRouter.post('/reuse', getIsReused);


// Export the base-router
const baseRouter = Router();
baseRouter.use('/password', passwordRouter);
export default baseRouter;
