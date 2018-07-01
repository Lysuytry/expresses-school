import express from 'express';
import { createSubject, deleteSubjectById, getSubjectById, getSubjectList, updateSubjectById } from './subject.api';
import { validateCreatedSubject, validateUpdateSubject } from './subject.middleware';

const subjectRoute = express.Router();

subjectRoute.get('/subjects', getSubjectList);
subjectRoute.post('/subjects', validateCreatedSubject, createSubject);
subjectRoute.get('/subjects/:id', getSubjectById);
subjectRoute.put('/subjects/:id', updateSubjectById, validateUpdateSubject);
subjectRoute.delete('/subjects/:id', deleteSubjectById);

export default subjectRoute;
