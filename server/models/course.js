import mongoose from 'mongoose';
import Assignment from './assignment';

const courseSchema = new mongoose.Schema({
  coursename: {
      type: String,
      required: [true, "Please check your data entry, no course name specified!"]
  },
  coursedesc: {
      type: String,
      default: ''
  },
  coursestartdate: {
      type: Date,
      default: Date.now
  },
  courseenddate: {
      type: Date,
      required: [true, "Please check your data entry, no course end date specified!"]
  },
  coursefinalscrore: Number,
  assignment: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment'
  }]
});

courseSchema.virtual('id').get(function() {
    return this._id.toHexString();
});
courseSchema.set('toJSON', { virtuals: true });

const Course = mongoose.model("Course", courseSchema);

export default Course;
