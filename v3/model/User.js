const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  userId: {
    type: Number,
    default: 1,
    unique: true
  },
  token: {
    type: String,
    default: ''
  },
  refreshToken: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300
  }
});

const KeyCloakUser = mongoose.model('keyCloakUser', UserSchema);

module.exports = KeyCloakUser;
