'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const teacherSchema = (0, _mongoose.Schema)({
  first: { type: String, required: true },
  last: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: { type: String, default: 'active' }
}, { timestamps: true });

teacherSchema.virtual('fullname').get(function () {
  return `${this.first} ${this.last}`;
});

teacherSchema.set('toJSON', { virtuals: false });

exports.default = _mongoose2.default.model('Teacher', teacherSchema);
//# sourceMappingURL=teacher.js.map