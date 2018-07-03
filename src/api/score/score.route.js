import { Router } from 'express';
import {getScoreList, getScoreById, createScore, deletedScore, deleteScoreById, updateScoreById} from './score.api';
import {validateCreatingScore, validateUpdatingScore} from './score.middleware';

const scoreRoute = Router();

scoreRoute.get('/scores', getScoreList);
scoreRoute.post('/scores', validateCreatingScore, createScore);
scoreRoute.delete('/scores', deletedScore);
scoreRoute.get('/scores/:id', getScoreById);
scoreRoute.put('/scores/:id', validateUpdatingScore, updateScoreById);
scoreRoute.delete('/scores/:id', deleteScoreById);

export default scoreRoute;
