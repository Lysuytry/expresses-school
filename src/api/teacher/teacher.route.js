import { Router } from 'express';
import { getTeacherList, createTeacher} from './teacher.api';
import { validateCreatingTeacher} from './teacher.middleware';

const teacherRoute = Router();

teacherRoute.get('/teachers', getTeacherList);
teacherRoute.post('/teachers', validateCreatingTeacher, createTeacher);

export default teacherRoute;
