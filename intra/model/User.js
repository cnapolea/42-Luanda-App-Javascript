const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    unique: true
  },
  access_token: {
    type: String,
    default: ''
  },
  refresh_token: {
    type: String,
    default: '',
    
  },
  token_expiration_date: Date,
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
