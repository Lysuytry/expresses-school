'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _teacher = require('./teacher.api');

var _teacher2 = require('./teacher.middleware');

const teacherRoute = (0, _express.Router)();

teacherRoute.get('/teachers', _teacher2.validateQueryTeacher, _teacher.getTeacherList);
teacherRoute.post('/teachers', _teacher2.validateCreatingTeacher, _teacher.createTeacher);
teacherRoute.get('/teachers/:id', _teacher.getTeacherById);
teacherRoute.put('/teachers/:id', _teacher2.validateUpdatingTeacher, _teacher.updateTeacher);
teacherRoute.delete('/teachers/:id', _teacher.deleteTeacher);

exports.default = teacherRoute;
//# sourceMappingURL=teacher.route.js.map