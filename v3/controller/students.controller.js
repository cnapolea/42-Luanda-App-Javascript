// const addCompensationDaysToCadets = async (req, res) => {
//     try {
//       let tokenObject = await Token.findOne();
//       let studentsInCursus = await StudentCursus.find();
//       let studentsId = studentsInCursus.map((record) => record.studentId);
//       let compensationDayStart = process.env.COMPENSATION_DAY_START;
//       let compensationDayEnd = process.env.COMPENSATION_DAY_END;
//       let payload = {
//         user_ids: studentsId,
//         begin_date: compensationDayStart,
//         expected_end_date: compensationDayEnd,
//         reason: 'Other',
//         staff_description:
//           'To compensate for 42 Campus closer for the installation of the new cluster.'
//       };

//       const response = axios.post(
//         'https://freeze.42.fr/api/v2/freezes/compensation/bulk',
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${tokenObject.token}`,
//             'Content-Type': 'application/json',
//             accept: 'application/json'
//           }
//         }
//       );
//       console.log(response.data);
//       res.json(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };
