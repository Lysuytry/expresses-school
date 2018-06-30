import { Router } from 'express';
import { createStudent, getStudentById, getStudentList } from './student.api';

const studentRoute = Router();

studentRoute.get('/students', getStudentList);
studentRoute.post('/students', createStudent);
studentRoute.get('/students/:id', getStudentById);

export default studentRoute;
