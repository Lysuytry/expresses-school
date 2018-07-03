'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fliterAlgorithms = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _search = require('./search');

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fliterAlgorithms = exports.fliterAlgorithms = data => {
  const { limit, skip, status, name, gender } = data;

  const partternName = new _search2.default(name, gender);
  //projection
  const fliterProject = {
    fullname: { $concat: ['$first', '$last'] }, fullnameReverse: { $concat: ['$last', '$first'] }, first: 1, last: 1, gender: 1, status: 1 };
  //Fliter name by reverse or normal
  const fliterName = name ? { $or: [{ fullname: { $in: [partternName.getFullnameRegExp(), partternName.getReverseRegExp()] } }, { fullnameReverse: { $in: [partternName.getFullnameRegExp(), partternName.getReverseRegExp()] } }] } : {};
  //find by gender
  const fliterGender = gender ? { gender: partternName.getGenderRegExp() } : {};

  //bind conditions of matching
  const fliterMatch = { $and: [{ status }, _extends({}, fliterName), _extends({}, fliterGender)] };

  return [[{ $project: _extends({}, fliterProject) }, { $match: _extends({}, fliterMatch) }, { $skip: skip }, { $limit: limit }], [{ $project: _extends({}, fliterProject) }, { $match: _extends({}, fliterMatch) }, { $count: 'total' }]];
};
//# sourceMappingURL=algorithms.js.map