import mongoose from 'mongoose';
import User from './user';
import Assignment from './assignment';
import Course from './course';

const teacherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  salary: Number
});

teacherSchema.virtual('id').get(function() {
    return this._id.toHexString();
});
teacherSchema.set('toJSON', { virtuals: true });

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
