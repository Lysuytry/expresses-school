'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUpdatingScore = exports.validateCreatingScore = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _joiObjectid = require('joi-objectid');

var _joiObjectid2 = _interopRequireDefault(_joiObjectid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.objectId = (0, _joiObjectid2.default)(_joi2.default);

const createScoreValidator = _joi2.default.object().keys({
  exam: _joi2.default.string().required(),
  student: _joi2.default.objectId().required(),
  result: _joi2.default.array().items(_joi2.default.object().keys({
    subject: _joi2.default.objectId().required(),
    subjectName: _joi2.default.string().required(),
    socre: _joi2.default.number()
  }).with('subject', 'score').with('subject', 'subjectName'))
});

const updateScoreValidator = _joi2.default.object().keys({
  exam: _joi2.default.string(),
  student: _joi2.default.objectId(),
  result: _joi2.default.array().items(_joi2.default.object().keys({
    subject: _joi2.default.objectId(),
    subjectName: _joi2.default.string(),
    socre: _joi2.default.number()
  }).with('subject', 'score').with('subject', 'subjectName'))
});

const validator = (req, schema) => {
  const { exam, student, result } = req.body;
  return _joi2.default.validate({ exam, student, result }, schema);
};

const validateCreatingScore = exports.validateCreatingScore = (req, res, next) => {
  try {
    const error = validator(req, createScoreValidator);
    error.error === null ? next() : res.fail(error.error.message);
  } catch (error) {
    res.fail(error.error);
  }
};

const validateUpdatingScore = exports.validateUpdatingScore = (req, res, next) => {
  try {
    const error = validator(req, updateScoreValidator);
    error.error === null ? next() : res.fail(error.error.message);
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=score.middleware.js.map