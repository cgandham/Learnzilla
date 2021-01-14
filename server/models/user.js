import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
      type: String,
      required: [true, "Please check your data entry, no name specified!"]
  },
  password: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
},
  address: {
      type: String,
      default: ''
  },
  email: {
      type: String,
      required: [true, "Please check your data entry, no email specified!"]
  },
  password: {
      type: String,
      required: [true, "Please check your data entry, no password specified!"]
  },
  university: {
      type: String,
      required: [true, "Please check your data entry, no university name specified!"]
  },
  role: {
      type: String,
      required: [true, "Please check your data entry, no role specified!"]
  }
});

userSchema.virtual('id').get(function() {
    return this._id.toHexString();
});
userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model("User", userSchema);

export default User;
