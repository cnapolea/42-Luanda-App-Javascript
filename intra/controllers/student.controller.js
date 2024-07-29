require("dotenv").config();

const axios = require("axios");
const {Student, StudentCandidature} = require("../model/Students");
const { MultiPageRequest } = require("../../helper/requests.helper");

let campusId = process.env.CAMPUS_42_LUANDA_ID;

const getStudentsController = async (req, res, next) => {
  try {
    let isStaff = false;

    const userEndPoint = `${process.env.INTRA_API_BASE_URL}/campus/${campusId}/users?filter[staff?]=${isStaff}`;

    const getGeneralStudentsInformation = await MultiPageRequest(
      userEndPoint,
      req.user,
      true
    );

    const newStudents = [];
    
    for (let i = 0 ; i < getGeneralStudentsInformation.length; i++) {
        
        let student = getGeneralStudentsInformation[i];
        let studentExist = await Student.find({student_id: student.id}).select('student_id');
        if (studentExist.length < 1) newStudents.push(student);
        
        continue;
    }

    if (newStudents.length > 0) {
        const generalStudentsInformation = newStudents.map(
          (student) => ({
            student_id: student.id,
            email: student.email,
            first_name: student.first_name,
            last_name: student.last_name,
            phone: student.phone,
            image: student.image.link,
            pool_year: student.pool_year,
            "active?": student["active?"],
          })
        );
    
        const students = await Student.insertMany(generalStudentsInformation);
        res.json(students);
    }
    
    res.json({students: "All students up to date."});

  } catch (err) {
    console.error(err);

    next(err);
  }
};

const getStudentCandidatureController = async (req, res, next) => {

    
    try {
        const storedUsers = await Student.find().select('student_id');

        for (const student of storedUsers) {
            
            const storedCandidature = await StudentCandidature.findOne({user_id: student.student_id})
            
            if (!storedCandidature) {

                const endpoint = `${process.env.INTRA_API_BASE_URL}/users/${student.student_id}/user_candidature`;
                
                const response = await MultiPageRequest(
                    endpoint,
                    req.user,
                    false
                  );

                const options =  {
                    user_id: response.data.user_id,
                    birth_date: response.data.birth_date,
                    gender: response.data.gender,
                    country: response.data.country,
                    birth_city: response.data.birth_city,
                    contact_phone1: response.data.contact_phone1,
                    piscine_date: response.data.piscine_date,
                    phone: response.data.phone,
                    phone_country_code: response.data.phone_country_code  
                }

                await StudentCandidature.create(options);
            }    
        }
        
        res.json({candidatures: 'All up to date.'});
        
        
    } catch (err) {
        console.error(err)
        next(err)
    }

}

module.exports = {
  getStudentsController,
  getStudentCandidatureController
};
