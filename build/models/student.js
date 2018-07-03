'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const studentSchema = (0, _mongoose.Schema)({
  first: { type: String, required: true },
  last: { type: String, required: true },
  gender: { type: String, required: true },
  birthday: { type: Date },
  email: String,
  telephone: String,
  subjects: [{ type: _mongoose.Schema.Types.ObjectId, ref: `Subject`, required: true }],
  status: { type: String, default: 'active' }
}, { timestamps: true });

studentSchema.virtual('fullname').get(function () {
  return `${this.first}${this.last}`;
});

studentSchema.set('toJSON', { virtuals: true });

exports.default = _mongoose2.default.model('Student', studentSchema);
//# sourceMappingURL=student.js.map