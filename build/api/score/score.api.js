'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletedScore = exports.deleteScoreById = exports.updateScoreById = exports.createScore = exports.getScoreById = exports.getScoreList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _score = require('../../models/score');

var _score2 = _interopRequireDefault(_score);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getScoreList = exports.getScoreList = async (req, res) => {
  try {
    const { limit, skip, status } = req.query;
    const fliterMatch = { $match: { $and: [{ status }] } };
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
//# sourceMappingURL=score.api.js.map