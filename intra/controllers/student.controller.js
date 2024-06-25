require('dotenv').config();

const axios = require('axios');
const Students = require('../model/Students');
const StudentCursus = require('../model/StudentCursus');

let campusId = process.env.CAMPUS_42_LUANDA_ID;
let cursus42Id = '21';

const getStudentsController = async (req, res) => {
  try {
    let token = req.user.token;
    let isStaff = false;
    let campusEndpoint = '/campus';
    let page = 1;
    let perPage = 100;
    let totalPages = 1;
    let allUsers = [];

    console.log('Starting API call...');

    while (page <= totalPages) {
      const response = await axios.get(
        `${process.env.API_BASE_URL}${campusEndpoint}/${campusId}/users?filter[staff?]=${isStaff}&page[number]=${page}&page[size]=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${
              typeof token === 'object' ? token.token : token
            }`
          }
        }
      );

      allUsers = [...allUsers, ...response.data];
      totalPages = parseInt(response.headers['x-total'], 10) || 1;
      page++;

      if (response.data.length <= 0) {
        break;
      }
    }

    const userArrays = allUsers
      .filter((student) => student['active?'] === true)
      .map((student) => ({
        id_42: student.id,
        active: student['active?'],
        usual_full_name: student.usual_full_name,
        isStaff: student['staff?']
      }));

    console.log(userArrays);

    await Students.insertMany(userArrays);

    res.json(userArrays);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const getCadetsController = async (req, res) => {
  try {
    let token = req.user.token;
    let students = await Students.find();
    let cadetsList = [];

    let i = 0;

    while (i < students.length) {
      let studentId = students[i].id_42;
      const response = await axios.get(
        `${process.env.API_BASE_URL}/users/${studentId}/cursus_users`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const studentsInCursusOnly = response.data
        .filter((data) => data.cursus_id === 21)
        .map((data) => {
          return {
            studentCursusId: data.id,
            studentId: data.user.id,
            cursusId: data.cursus_id,
            cursusName: data.cursus.name
          };
        });

      console.log(`Checking if ${student[i].usual_full_name} is a cadet!`);

      cadetsList = [...cadetsList, ...studentsInCursusOnly];

      i++;
    }

    console.log(cadetsList);

    await StudentCursus.insertMany(cadetsList);

    res.json(cadetsList);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getStudentsController,
  getCadetsController
};
