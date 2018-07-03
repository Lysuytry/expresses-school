'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fakerTeacher = exports.fakerSubject = exports.fakerStudent = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fakerStudent = exports.fakerStudent = {
  first: _faker2.default.name.firstName(),
  last: _faker2.default.name.lastName(),
  gender: 'male',
  birthday: _faker2.default.date.past(),
  email: _faker2.default.internet.email(),
  telephone: _faker2.default.phone.phoneNumber(),
  subjects: ["5b3a4a6e8b459304f861affa"]
};

const fakerSubject = exports.fakerSubject = {
  name: _faker2.default.name.jobTitle(),
  teachers: ["5b3a45b0138a9a03ce3d6e7e"]
};

const fakerTeacher = exports.fakerTeacher = {
  first: _faker2.default.name.firstName(),
  last: _faker2.default.name.lastName(),
  gender: 'male',
  phone: _faker2.default.phone.phoneNumber(),
  email: _faker2.default.internet.email()
};
//# sourceMappingURL=dump.js.map