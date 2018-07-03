'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fakeStudent = exports.deleteStudentById = exports.updateStudentById = exports.getStudentById = exports.createStudent = exports.getStudentList = undefined;

var _student = require('../../models/student');

var _student2 = _interopRequireDefault(_student);

var _dump = require('../../common/dump');

var _algorithms = require('../../common/algorithms');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getStudentList = exports.getStudentList = async (req, res) => {
  try {
    const { limit, skip } = req.query;
    // ./common/algorithms.js
    const [find, count] = (0, _algorithms.fliterAlgorithms)(req.query);
    const [students, amount] = await Promise.all([_student2.default.aggregate(find), _student2.default.aggregate(count)]);
    const total = amount[0].total;
    const options = { limit, skip, total };
    res.success(students, options);
  } catch (error) {
    res.fail(error);
  }
};

const createStudent = exports.createStudent = async (req, res) => {
  try {
    //year-month-day
    const { first, last, gender, birthday, email, telephone, subjects } = req.body;
    const student = new _student2.default({ first, last, gender, birthday, email, telephone, subjects });
    const result = await student.save();
    res.success(result);
  } catch (error) {
    res.fail(error);
  }
};

const getStudentById = exports.getStudentById = async (req, res) => {
  try {

    const { id } = req.params;
    const { status } = req.query;
    const student = await _student2.default.findOne({ _id: id, status });
    student ? res.success(student) : res.success({});
  } catch (error) {
    res.fail(error);
  }
};

const updateStudentById = exports.updateStudentById = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const { status } = req.query;
    const conditions = [{ _id: id, status }, { $set: data }];
    const result = await _student2.default.updateOne(...conditions);
    console.log(result);
    res.success('Successfully updated.');
  } catch (error) {
    res.fail(error);
  }
};

const deleteStudentById = exports.deleteStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const conditions = [{ _id: id, status }, { $set: { status: 'inactive' } }];
    await _student2.default.updateOne(...conditions);
    res.success('Succesfully deleted.');
  } catch (error) {
    res.fail(error.message);
  }
};

const fakeStudent = exports.fakeStudent = async (req, res) => {
  try {
    const student = new _student2.default(_dump.fakerStudent);
    await student.save();
    res.success('ss');
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=student.api.js.map