'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _student = require('./student.api');

const studentRoute = (0, _express.Router)();

studentRoute.get('/students', _student.getStudentList);
studentRoute.post('/students', _student.createStudent);
studentRoute.get('/students/:id', _student.getStudentById);

exports.default = studentRoute;
//# sourceMappingURL=student.route.js.map