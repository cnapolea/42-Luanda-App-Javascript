const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  userId: {
    type: Number,
    default: 1,
    unique: true
  },
  code: {
    type: String,
    default: ''
  },
  token: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 4600
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
