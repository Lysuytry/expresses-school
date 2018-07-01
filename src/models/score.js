import mongoose, { Schema } from 'mongoose';

const scoreSchema = Schema({
  student: {type: Schema.Types.ObjectId, required: true},
  scores: {type: Map, of: Number}
}, {timestamps: true});

export default mongoose.model('Score', scoreSchema);
