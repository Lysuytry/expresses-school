'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListReportExamStudent = exports.updateOneStudentScoreById = exports.updateManyStudentScoreById = exports.getStudentScoreById = exports.deletedScore = exports.deleteScoreById = exports.updateScoreById = exports.createScore = exports.getScoreById = exports.getScoreList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _score = require('../../models/score');

var _score2 = _interopRequireDefault(_score);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getScoreList = exports.getScoreList = async (req, res) => {
  try {
    const { limit, skip, status, exam = '' } = req.query;
    const fliterMatch = { $match: { $and: [{ status }, { exam }] } };
    const conditions = [_extends({}, fliterMatch), { $skip: skip }, { $limit: limit }];
    const countConditions = [{ status }];
    const [scores, total] = await Promise.all([_score2.default.aggregate(conditions), _score2.default.count(...countConditions)]);
    res.success(scores, { limit, skip, total });
  } catch (error) {
    res.fail(error.message);
  }
};

const getScoreById = exports.getScoreById = async (req, res) => {
  try {
    const { status } = req.query;
    const conditions = [{ status }];
    const score = await _score2.default.findOne(...conditions);
    score ? res.success(score) : res.success({});
  } catch (error) {
    res.fail(error);
  }
};

const createScore = exports.createScore = async (req, res) => {
  try {
    const { exam, student, result } = req.body;
    const score = new _score2.default({ exam, student, result });
    const created = await score.save();
    res.success(created);
  } catch (error) {
    res.fail(error);
  }
};

const updateScoreById = exports.updateScoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const data = req.body;
    const conditions = [{ _id: id, status }, { $set: data }];
    await _score2.default.updateOne(...conditions);
    res.success('Successfully updated.');
  } catch (error) {
    res.fail(error.message);
  }
};

const deleteScoreById = exports.deleteScoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const conditions = [{ _id: id, status }];
    await _score2.default.updateOne(...conditions, { status: 'inactive' });
    res.success('Successfully deleted.');
  } catch (error) {
    res.fail(error.error);
  }
};

const deletedScore = exports.deletedScore = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    await _score2.default.deleteMany({ id });
    res.success();
  } catch (error) {
    res.fail(error);
  }
};

////////////////////////////

const getStudentScoreById = exports.getStudentScoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, exam = "" } = req.query;
    const student = await _score2.default.findOne({ student: id, exam, status });
    student ? res.success(student) : res.success({});
  } catch (error) {
    res.fail(error);
  }
};

//for sometime they will submit all change
const updateManyStudentScoreById = exports.updateManyStudentScoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, exam = "" } = req.query;
    const { result } = req.body;
    await _score2.default.update({ student: id, exam, status }, { $set: result });
    res.success('Succesfully updated.');
  } catch (error) {
    res.fail(error);
  }
};

//using for edit as in admin webpage always saved after click updated one by one
const updateOneStudentScoreById = exports.updateOneStudentScoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, exam = '' } = req.query;
    const { subject = '', score = 0 } = req.body;
    await _score2.default.update({ student: id, exam, status, result: { $elemMatch: { subject: _mongoose2.default.Types.ObjectId(subject) } } }, { $set: { 'result.$.score': score } });
    res.success('Succesfully updated.');
  } catch (error) {
    res.fail(error);
  }
};

const getListReportExamStudent = exports.getListReportExamStudent = async (req, res) => {
  try {
    const { limit, skip, status, exam = '' } = req.query;
    const match = { status, exam };
    const conditions = [_extends({}, match)];
    //fliter field
    const showResult = '_id student result';
    const showStudent = '_id first last gender email birthday telephone';
    const [scores, total] = await Promise.all([_score2.default.find(...conditions, showResult).skip(skip).limit(limit).populate({ path: 'student', select: showStudent }), _score2.default.count(match)]);
    res.success(scores, { limit, skip, total });
  } catch (error) {
    res.fail(error.message);
  }
};

////////////////////////////
//# sourceMappingURL=score.api.js.map