'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fakeStudent = exports.deleteStudentSubjectById = exports.updateStudentSubjectById = exports.getStudentSubjectsById = exports.deleteStudentById = exports.updateStudentById = exports.getStudentById = exports.createStudent = exports.getStudentList = undefined;

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
    await _student2.default.updateOne({ _id: id, status }, { $set: { status: 'inactive' } });
    res.success('Succesfully deleted.');
  } catch (error) {
    res.fail(error.message);
  }
};

//////////////
//    Used via aggregate function
// export const getStudentSubjectsById = async (req, res) => {
//   try{
//     const { id } = req.params;
//     const { status } = req.query;
//     //from algorithms.js
//     const conditions = joinSubjectById(id, status);
//     //.....
//     const student = await Student.aggregate(conditions);
//     student ? res.success(student) : res.success({});
//   } catch(error){
//     res.fail(error);
//   }
// };
//////////////////
//    Used via population mongoose
const getStudentSubjectsById = exports.getStudentSubjectsById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const studentField = '_id first last';
    const student = await _student2.default.findOne({ _id: id, status }, studentField).populate({ path: 'subjects', select: '_id name' });
    student ? res.success(student) : res.success({});
  } catch (error) {
    res.fail(error);
  }
};

///////////////////
//    used to update or deleted subject from student
const updateStudentSubjectById = exports.updateStudentSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const conditions = { _id: id, status };
    const { subjects } = req.body;
    await _student2.default.update(conditions, { $addToSet: { subjects } });
    res.success('Successfully updated.');
  } catch (error) {
    res.fail(error);
  }
};
///////////////////
//    used to deleted or deleted subject from student
const deleteStudentSubjectById = exports.deleteStudentSubjectById = async (req, res) => {
  try {
    const { id, subId } = req.params;
    const { status } = req.query;
    const conditions = { _id: id, status };
    await _student2.default.update(conditions, { $pull: { subjects: subId } }, { multi: true });
    res.success('Successfully deleted field.');
  } catch (error) {
    res.fail(error);
  }
};

//////////////

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