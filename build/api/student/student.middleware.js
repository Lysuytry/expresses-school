'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUpdatingStudent = exports.validateCreatingStudent = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _joiObjectid = require('joi-objectid');

var _joiObjectid2 = _interopRequireDefault(_joiObjectid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.objectId = (0, _joiObjectid2.default)(_joi2.default);

const createStudentValidator = _joi2.default.object().keys({
  first: _joi2.default.string().required(),
  last: _joi2.default.string().required(),
  gender: _joi2.default.string().required(),
  birthday: _joi2.default.string().required(),
  email: _joi2.default.string().email().required(),
  telephone: _joi2.default.string().alphanum().required(),
  subjects: _joi2.default.array().items(_joi2.default.objectId())
});

const updateStudentValidator = _joi2.default.object().keys({
  first: _joi2.default.string(),
  last: _joi2.default.string(),
  gender: _joi2.default.string(),
  birthday: _joi2.default.string(),
  email: _joi2.default.string().email(),
  telephone: _joi2.default.string().alphanum(),
  subjects: _joi2.default.array().items(_joi2.default.objectId())
});

const validateCreatingStudent = exports.validateCreatingStudent = (req, res, next) => {
  try {
    const { first, last, gender, birthday, email, telephone, subjects } = req.body;
    const error = _joi2.default.validate({ first, last, gender, birthday, email, telephone, subjects }, createStudentValidator);
    error.error === null ? next() : res.fail(error);
  } catch (error) {
    res.fail(error.message);
  }
};

const validateUpdatingStudent = exports.validateUpdatingStudent = (req, res, next) => {
  try {
    const { first, last, gender, birthday, email, telephone, subjects } = req.body;
    const error = _joi2.default.validate({ first, last, gender, birthday, email, telephone, subjects }, updateStudentValidator);
    error.error === null ? next() : res.fail(error);
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=student.middleware.js.map