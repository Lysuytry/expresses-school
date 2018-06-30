'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStudentById = exports.createStudent = exports.getStudentList = undefined;

var _student = require('../../models/student');

var _student2 = _interopRequireDefault(_student);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getStudentList = exports.getStudentList = async (req, res) => {
  try {
    const [students, total] = await Promise.all([_student2.default.find(), _student2.default.count()]);
    const options = { total };
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
    const { id } = req.query;
    const student = await _student2.default.findOne(id);
    res.success(student);
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=student.api.js.map