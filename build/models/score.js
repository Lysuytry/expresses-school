'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const scoreSchema = (0, _mongoose.Schema)({
  student: { type: _mongoose.Schema.Types.ObjectId, required: true },
  scores: { type: Map, of: Number }
}, { timestamps: true });

exports.default = _mongoose2.default.model('Score', scoreSchema);
//# sourceMappingURL=score.js.map