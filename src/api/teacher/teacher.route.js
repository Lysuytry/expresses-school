import { Router } from 'express';
import { getTeacherList, createTeacher, deleteTeacher, getTeacherById, updateTeacher} from './teacher.api';
import { validateCreatingTeacher, validateUpdatingTeacher, validateQueryTeacher} from './teacher.middleware';

const teacherRoute = Router();

teacherRoute.get('/teachers', validateQueryTeacher, getTeacherList);
teacherRoute.post('/teachers', validateCreatingTeacher, createTeacher);
teacherRoute.get('/teachers/:id', getTeacherById);
teacherRoute.put('/teachers/:id', validateUpdatingTeacher, updateTeacher);
teacherRoute.delete('/teachers/:id', deleteTeacher);

export default teacherRoute;
