const mongoose = require('mongoose');

const StudentCursusSchema = mongoose.Schema({
  studentCursusId: String,
  studentId: String,
  cursusId: String,
  cursusName: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('studentCursus', StudentCursusSchema);
