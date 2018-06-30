'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _student = require('./api/student/student.route');

var _student2 = _interopRequireDefault(_student);

var _teacher = require('./api/teacher/teacher.route');

var _teacher2 = _interopRequireDefault(_teacher);

var _constant = require('./common/constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

_mongoose2.default.connect(process.env.CONNECT, _constant.mongoDBOptions, err => {
  err ? console.log(err) : console.log(`MongoDB Connected`);
});

const app = new _express2.default();

app.use((req, res, next) => {
  //response fail
  res.fail = (message, code = 400) => {
    console.log(message);
    return res.status(code).json({ message });
  };
  //response success
  res.success = (data, options, code = 200) => {
    data = typeof data === 'object' ? { data, options } : { message: data };
    return res.status(code).json(data);
  };
  next();
});

app.use((0, _morgan2.default)(`dev`));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use(_constant.ENDPOINT, _student2.default);
app.use(_constant.ENDPOINT, _teacher2.default);

exports.default = app;
//# sourceMappingURL=app.js.map