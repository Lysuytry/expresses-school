'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _student = require('./student.api');

var _student2 = require('./student.middleware');

const studentRoute = (0, _express.Router)();

studentRoute.get('/students', _student.getStudentList);
studentRoute.post('/students', _student2.validateCreatingStudent, _student.createStudent);
studentRoute.get('/students/:id', _student.getStudentById);
studentRoute.put('/students/:id', _student2.validateUpdatingStudent, _student.updateStudentById);
studentRoute.delete('/students/:id', _student.deleteStudentById);

exports.default = studentRoute;
//# sourceMappingURL=student.route.js.map