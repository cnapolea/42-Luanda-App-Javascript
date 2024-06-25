const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 7200
  }
});

const Token = mongoose.model('token', TokenSchema);

module.exports = Token;
