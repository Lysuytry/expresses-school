'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joinSubjectById = exports.fliterAlgorithms = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _search = require('./search');

var _search2 = _interopRequireDefault(_search);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Algoritms for finding name & gender using in Teacher and Student
const fliterAlgorithms = exports.fliterAlgorithms = data => {
  const { limit, skip, status, name, gender } = data;

  const partternName = new _search2.default(name, gender);
  //projection
  const fliterProject = {
    fullname: { $concat: ['$first', '$last'] }, fullnameReverse: { $concat: ['$last', '$first'] }, first: 1, last: 1, gender: 1, status: 1, birthday: 1, email: 1, telephone: 1 };
  //Fliter name by reverse or normal
  const fliterName = name ? { $or: [{ fullname: { $in: [partternName.getFullnameRegExp(), partternName.getReverseRegExp()] } }, { fullnameReverse: { $in: [partternName.getFullnameRegExp(), partternName.getReverseRegExp()] } }] } : {};
  //find by gender
  const fliterGender = gender ? { gender: partternName.getGenderRegExp() } : {};

  //bind conditions of matching
  const fliterMatch = { $and: [{ status }, _extends({}, fliterName), _extends({}, fliterGender)] };

  return [[{ $project: _extends({}, fliterProject) }, { $match: _extends({}, fliterMatch) }, { $skip: skip }, { $limit: limit }], [{ $project: _extends({}, fliterProject) }, { $match: _extends({}, fliterMatch) }, { $count: 'total' }]];
};

//Algorithm for join table Student with subject only 1

const joinSubjectById = exports.joinSubjectById = (id, status) => {
  ////////////  selected field to show
  const fliterProject = { _id: 1, subjects: 1, status: 1 };
  ////////////
  const fliterLookup = { localField: 'subjects', from: 'subjects', foreignField: '_id', as: 'subjects' };
  /*  using for seperate innner 2 different object outside or just like populate */
  const fliterUnwind = { path: '$subjects' };
  /*                    */
  const fliterMatch = { $and: [{ _id: _mongoose2.default.Types.ObjectId(id) }, { status }] };
  //first get list id of singer who have in name query
  return [{ $project: _extends({}, fliterProject) }, { $lookup: _extends({}, fliterLookup) }, { $unwind: _extends({}, fliterUnwind) }, { $match: _extends({}, fliterMatch) }];
};
//# sourceMappingURL=algorithms.js.map