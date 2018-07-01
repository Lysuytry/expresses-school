import { Router } from 'express';
import { createStudent, getStudentById, getStudentList, updateStudentById, deleteStudentById} from './student.api';
import {validateCreatingStudent, validateUpdatingStudent} from './student.middleware';

const studentRoute = Router();

studentRoute.get('/students', getStudentList);
studentRoute.post('/students', validateCreatingStudent, createStudent);
studentRoute.get('/students/:id', getStudentById);
studentRoute.put('/students/:id', validateUpdatingStudent, updateStudentById);
studentRoute.delete('/students/:id', deleteStudentById);

export default studentRoute;
