'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUpdateSubject = exports.validateCreatedSubject = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _joiObjectid = require('joi-objectid');

var _joiObjectid2 = _interopRequireDefault(_joiObjectid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.objectId = (0, _joiObjectid2.default)(_joi2.default);

const createSubjectValidator = _joi2.default.object().keys({
  name: _joi2.default.string().required(),
  teachers: _joi2.default.array().items(_joi2.default.objectId())
});

const updateSubjectValidator = _joi2.default.object().keys({
  name: _joi2.default.string(),
  teachers: _joi2.default.array()
});

const validateCreatedSubject = exports.validateCreatedSubject = (req, res, next) => {
  try {
    const { name, teachers } = req.body;
    const error = _joi2.default.validate({ name, teachers }, createSubjectValidator);
    error.error === null ? next() : res.fail(error);
  } catch (error) {
    res.fail(error.message);
  }
};

const validateUpdateSubject = exports.validateUpdateSubject = (req, res, next) => {
  try {
    const { name, teachers } = req.body;
    const error = _joi2.default.validate({ name, teachers }, updateSubjectValidator);
    error.error === null ? next() : res.fail(error.value);
  } catch (error) {
    res.fail(error.message);
  }
};
//# sourceMappingURL=subject.middleware.js.map