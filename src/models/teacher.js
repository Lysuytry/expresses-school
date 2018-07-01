import mongoose, { Schema } from 'mongoose';

const teacherSchema = Schema({
  first: {type: String, required: true},
  last: {type: String, required: true},
  gender: {type: String, required: true},
  phone: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  status: {type: String, default: 'active'}
}, {timestamps: true});

teacherSchema.virtual('fullname').get( function(){
  return `${this.first} ${this.last}`;
});

teacherSchema.set('toJSON', {virtuals: false});

export default mongoose.model('Teacher', teacherSchema);
