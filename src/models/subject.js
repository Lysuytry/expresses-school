import mongoose, { Schema } from 'mongoose';

const subjectSchema = Schema({
  name: {type: String, required: true},
  teachers: [{type: Schema.Types.ObjectId, ref: 'Teacher', required: true}],
  status: {type: String, default: 'active'},
}, {timestamps: true});

export default mongoose.model('Subject', subjectSchema);
