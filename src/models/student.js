import mongoose, { Schema } from 'mongoose';

const studentSchema = Schema({
  first: {type: String, required: true},
  last: {type: String, required: true},
  gender: {type: String, required: true},
  birthday: {type: Date},
  email: String,
  telephone: String,
  subjects: [ {type: Schema.Types.ObjectId, ref: `Subject`, required:true} ],
  status: {type: String, default: 'active'}
}, {timestamps: true});

studentSchema.virtual('fullname').get(function() {
  return `${this.first}${this.last}`;
});

studentSchema.set('toJSON', { virtuals: false});

export default mongoose.model('Student', studentSchema);
