import { Router } from 'express';
import { createStudent, deleteStudentById, deleteStudentSubjectById, fakeStudent, getStudentById, getStudentList, getStudentSubjectsById, updateStudentById, updateStudentSubjectById } from './student.api';
import { validateCreatingStudent, validateUpdatingStudent } from './student.middleware';

const studentRoute = Router();

studentRoute.get('/students', getStudentList);
studentRoute.post('/students', validateCreatingStudent, createStudent);
studentRoute.get('/students/dump', fakeStudent);
studentRoute.get('/students/:id', getStudentById);
studentRoute.put('/students/:id', validateUpdatingStudent, updateStudentById);
studentRoute.delete('/students/:id', deleteStudentById);
studentRoute.get('/students/:id/subjects', getStudentSubjectsById);
studentRoute.put('/students/:id/subjects', validateUpdatingStudent, updateStudentSubjectById);
studentRoute.delete('/students/:id/subjects/:subId', deleteStudentSubjectById);

export default studentRoute;
