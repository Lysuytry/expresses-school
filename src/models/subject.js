import mongoose, { Schema } from 'mongoose';

const subjectSchema = Schema({
  name: {type: String, required: true},
  teacher: String,
  status: {type: String, default: 'active'},
}, {timestamps: true});

export default mongoose.model('Subject', subjectSchema);
