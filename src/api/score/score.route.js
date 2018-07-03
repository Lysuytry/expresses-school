import { Router } from 'express';
import {getScoreList, getScoreById, createScore, deletedScore, deleteScoreById, updateScoreById, getStudentScoreById,
  updateOneStudentScoreById, updateManyStudentScoreById, getListReportExamStudent} from './score.api';
import {validateCreatingScore, validateUpdatingScore} from './score.middleware';

const scoreRoute = Router();

scoreRoute.get('/scores', getScoreList);
scoreRoute.post('/scores', validateCreatingScore, createScore);
scoreRoute.delete('/scores', deletedScore);
scoreRoute.get('/scores/:id', getScoreById);
scoreRoute.put('/scores/:id', validateUpdatingScore, updateScoreById);
scoreRoute.delete('/scores/:id', deleteScoreById);
scoreRoute.get('/scores/students/report', getListReportExamStudent);
scoreRoute.get('/scores/students/:id', getStudentScoreById);
scoreRoute.put('/scores/students/:id', validateUpdatingScore, updateOneStudentScoreById);
scoreRoute.put('/scores/students/:id/all', validateUpdatingScore, updateManyStudentScoreById);

export default scoreRoute;
