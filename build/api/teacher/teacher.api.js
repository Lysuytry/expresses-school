'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTeacher = exports.updateTeacher = exports.createTeacher = exports.getTeacherById = exports.getTeacherList = undefined;

var _teacher = require('../../models/teacher');

var _teacher2 = _interopRequireDefault(_teacher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getTeacherList = exports.getTeacherList = async (req, res) => {
  try {
    const { status, limit, skip } = req.query;
    //const fliterMatch = {status};
    const conditions = { status };
    const [teachers, total] = await Promise.all([_teacher2.default.find(conditions).skip(skip).limit(limit), _teacher2.default.count(conditions)]);
    res.success(teachers, { limit, skip, total });
  } catch (error) {
    res.fail(error.message);
  }
};

const getTeacherById = exports.getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const conditions = { _id: id, status: 'active' };
    const teacher = await _teacher2.default.findOne(conditions);
    teacher ? res.success(teacher) : res.success({});
  } catch (error) {
    res.fail(error);
  }
};

const createTeacher = exports.createTeacher = async (req, res) => {
  try {
    const { first, last, gender, phone, email } = req.body;
    const teacher = new _teacher2.default({ first, last, gender, phone, email });
    const data = await teacher.save();
    res.success(data);
  } catch (error) {
    res.fail(error.message);
  }
};

const updateTeacher = exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { status = 'active' } = req.query;
    const data = req.body;
    const conditions = [{ _id: id, status }, { $set: data }];
    await _teacher2.default.updateOne(...conditions);
    res.success('Successfully updated.');
  } catch (error) {
    res.fail(error.message);
  }
};

const deleteTeacher = exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const conditions = [{ _id: id, status: 'active' }, { status: 'inactive' }];
    await _teacher2.default.updateOne(...conditions);
    res.success('Deleted successfully.');
  } catch (error) {
    res.fail(error.message);
  }
};
//# sourceMappingURL=teacher.api.js.map