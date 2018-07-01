'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateQueryTeacher = exports.validateUpdatingTeacher = exports.validateCreatingTeacher = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _joiObjectid = require('joi-objectid');

var _joiObjectid2 = _interopRequireDefault(_joiObjectid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.objectId = (0, _joiObjectid2.default)(_joi2.default);
// Validation methods
const createTeacherValidatorSchema = _joi2.default.object().keys({
  first: _joi2.default.string().required(),
  last: _joi2.default.string().required(),
  gender: _joi2.default.string().required(),
  phone: _joi2.default.string().alphanum().required(),
  email: _joi2.default.string().email().required()
});

const updateTeacherValidatorSchema = _joi2.default.object().keys({
  id: _joi2.default.objectId(),
  first: _joi2.default.string(),
  last: _joi2.default.string(),
  gender: _joi2.default.string(),
  phone: _joi2.default.string().alphanum(),
  email: _joi2.default.string().email()
});

const validateCreatingTeacher = exports.validateCreatingTeacher = (req, res, next) => {
  try {
    const { first, last, email, phone, gender } = req.body;
    const { error } = _joi2.default.validate({ first, last, email, phone, gender }, createTeacherValidatorSchema);
    error.error === null ? next() : res.fail(error.message);
  } catch (error) {
    res.fail(error.message);
  }
};

const validateUpdatingTeacher = exports.validateUpdatingTeacher = (req, res, next) => {
  try {
    const { first, last, email, phone, gender } = req.body;
    const { id } = req.params;
    const { error } = _joi2.default.validate({ first, last, email, phone, gender, id }, updateTeacherValidatorSchema);
    error.error === null ? next() : res.fail(error.message);
  } catch (error) {
    res.fail(error.message);
  }
};

const validateQueryTeacher = exports.validateQueryTeacher = (req, res, next) => {
  try {
    next();
  } catch (error) {
    res.fail(error.message);
  }
};
//# sourceMappingURL=teacher.middleware.js.map