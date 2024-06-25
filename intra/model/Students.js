const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  id_42: String,
  cursus_id: Number,
  active: Boolean,
  usual_full_name: String,
  isStaff: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('student', StudentSchema);
