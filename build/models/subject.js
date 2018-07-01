'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const subjectSchema = (0, _mongoose.Schema)({
  name: { type: String, required: true },
  teachers: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }],
  status: { type: String, default: 'active' }
}, { timestamps: true });

exports.default = _mongoose2.default.model('Subject', subjectSchema);
//# sourceMappingURL=subject.js.map