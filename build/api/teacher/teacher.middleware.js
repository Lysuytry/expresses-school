'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateCreatingTeacher = undefined;

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateCreatingTeacher = exports.validateCreatingTeacher = (req, res, next) => {
  const { first, last, gender, phone, email } = req.body;
  try {

    _validator2.default.isAlpha(first) && _validator2.default.isAlpha(last) && _validator2.default.isAlpha(gender) && _validator2.default.isNumeric(phone) && _validator2.default.isEmail(email) ? next() : res.fail('Error Validation');
  } catch (error) {
    res.fail(error.message);
  }
};
//# sourceMappingURL=teacher.middleware.js.map