import mongoose, { Schema } from 'mongoose';

const scoreSchema = Schema({
  exam: {type: String, required: true},
  student: {type: Schema.Types.ObjectId, ref: 'Student', required: true},
  result: [
    {
      subject: {type: Schema.Types.ObjectId, ref: 'Subject', required: true},
      subjectName: {type: String, required: true},
      socre: {type: Number, default: 0}
    }
  ],
  status: {type: String, default: 'active'}
}, {timestamps: true});

// scoreSchema.virtual('total').get( function () {
//   return this.result.score
// });

export default mongoose.model('Score', scoreSchema);

