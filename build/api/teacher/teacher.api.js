'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTeacher = exports.getTeacherList = undefined;

var _teacher = require('../../models/teacher');

var _teacher2 = _interopRequireDefault(_teacher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getTeacherList = exports.getTeacherList = async (req, res) => {
  try {
    const teachers = await _teacher2.default.find();
    res.success(teachers);
  } catch (error) {
    res.fail(error);
  }
};

const createTeacher = exports.createTeacher = async (req, res) => {
  try {
    const { first, last, gender, phone, email } = req.body;
    const teacher = new _teacher2.default({ first, last, gender, phone, email });
    await teacher.save();
    res.success(`create an object`, 201);
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=teacher.api.js.map