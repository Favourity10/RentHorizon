 import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    maxlength: 100,
    minlength: 10,
    unique: true,
    required: true
  },
  password: {
    type: String,
    maxlength: 255,
    minlength: 8,
    required: true
  },
  firstName: {
    type: String,
    maxlength: 255,
    minlength: 2,
    required: true
  },
  lastName: {
    type: String,
    maxlength: 255,
    minlength: 2,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const userModel= mongoose.model('user', userSchema);

export default userModel;