// const { default: axios } = require('axios');
// const StudentCursus = require('../../intra/model/StudentCursus');

// const getFreezes = async (req, res) => {
//   try {
//     let token = req.user.token;
//     let response = await axios.get(
//       `${process.env.API_FREEZE_BASE_URL}/freezes`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );
//     console.log(response);
//     res.json(response.data);
//   } catch (err) {
//     console.error(err);
//   }
// };
// const addCompensationDaysToCadets = async (req, res) => {
//   try {
//     let token = req.user.token;
//     let studentsInCursus = await StudentCursus.find();
//     let studentsId = studentsInCursus.map((record) => Number(record.studentId));
//     let compensationDayStart = process.env.COMPENSATION_DAY_START;
//     let compensationDayEnd = process.env.COMPENSATION_DAY_END;
//     let payload = {
//       user_ids: studentsId,
//       begin_date: compensationDayStart,
//       expected_end_date: compensationDayEnd,
//       reason: 'other',
//       staff_description:
//         'To compensate for 42 Campus closer for the installation of the new cluster.'
//     };

//     const response = axios.post(
//       `${process.env.API_FREEZE_BASE_URL}/freezes/compensation/bulk`,
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//           accept: 'application/json'
//         }
//       }
//     );

//     res.json(response.data);
//   } catch (err) {
//     console.error(err);
//   }
// };

// module.exports = { addCompensationDaysToCadets, getFreezes };
