'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const scoreSchema = (0, _mongoose.Schema)({
  exam: { type: String, required: true },
  student: { type: _mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  result: [{
    _id: false,
    subject: { type: _mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    subjectName: { type: String, required: true },
    score: { type: Number, default: 0, max: 101, min: 0 }
  }],
  status: { type: String, default: 'active' }
}, { timestamps: true });

scoreSchema.index({ 'student': 1, 'exam': 1 }, { 'unique': true });

// scoreSchema.virtual('total').get( function () {
//   return this.result.score
// });

exports.default = _mongoose2.default.model('Score', scoreSchema);
//# sourceMappingURL=score.js.map