const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    student_id: {
        type: Number,
        required: true, 
    },
    email: String,
    first_name: String,
    last_name: String,
    phone: String,
    image: String,
    pool_year: String,
    "active?": Boolean,
})

const StudentCandidatureSchema = mongoose.Schema({
    user_id: Number,
    birth_date: Date,
    gender: String,
    country: String,
    birth_city: String,
    contact_phone1: String,
    piscine_date: Date,
    phone: String,
    phone_country_code: String,
})

const Student = mongoose.model('student', StudentSchema);
const StudentCandidature = mongoose.model('studentCandidature', StudentCandidatureSchema);

module.exports = {Student, StudentCandidature};