'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fakeSubject = exports.deleteSubjectById = exports.updateSubjectById = exports.getSubjectById = exports.getSubjectList = exports.createSubject = undefined;

var _subject = require('../../models/subject');

var _subject2 = _interopRequireDefault(_subject);

var _dump = require('../../common/dump');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createSubject = exports.createSubject = async (req, res) => {
  try {
    const { name, teachers } = req.body;
    const subject = new _subject2.default({ name, teachers });
    const result = await subject.save();
    res.success(result);
  } catch (error) {
    res.fail(error.message);
  }
};

const getSubjectList = exports.getSubjectList = async (req, res) => {
  try {
    const { limit, skip, status } = req.query;
    const fliterMatch = { $and: [{ status }] };
    const countConditions = { status };
    const conditions = [{ $match: fliterMatch }];
    const [subjects, total] = await Promise.all([_subject2.default.aggregate([...conditions, { $skip: skip }, { $limit: limit }]), _subject2.default.count(countConditions)]);
    res.success(subjects, { limit, skip, total });
  } catch (error) {
    res.fail(error.message);
  }
};

const getSubjectById = exports.getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const subject = await _subject2.default.findOne({ _id: id, status });
    res.success(subject);
  } catch (error) {
    res.fail(error.message);
  }
};

const updateSubjectById = exports.updateSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const data = req.body;
    const conditions = [{ _id: id, status }, { $set: data }];
    await _subject2.default.updateOne(...conditions);
    res.success('Successfully Updated.');
  } catch (error) {
    res.fail(error.message);
  }
};

const deleteSubjectById = exports.deleteSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const conditions = [{ _id: id, status }, { $set: { status: 'inactive' } }];
    const result = await _subject2.default.updateOne(...conditions);
    console.log(result);
    res.success('Successfully deleted.');
  } catch (error) {
    res.fail(error.message);
  }
};

const fakeSubject = exports.fakeSubject = async (req, res) => {
  try {
    const subject = new _subject2.default(_dump.fakerSubject);
    await subject.save();
    res.success('ss');
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=subject.api.js.map