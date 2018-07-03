'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _subject = require('./subject.api');

var _subject2 = require('./subject.middleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const subjectRoute = _express2.default.Router();

subjectRoute.get('/subjects', _subject.getSubjectList);
subjectRoute.post('/subjects', _subject2.validateCreatedSubject, _subject.createSubject);
subjectRoute.get('/subjects/dump', _subject.fakeSubject);
subjectRoute.get('/subjects/:id', _subject.getSubjectById);
subjectRoute.put('/subjects/:id', _subject.updateSubjectById, _subject2.validateUpdateSubject);
subjectRoute.delete('/subjects/:id', _subject.deleteSubjectById);

exports.default = subjectRoute;
//# sourceMappingURL=subject.route.js.map