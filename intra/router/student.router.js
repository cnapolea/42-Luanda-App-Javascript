const router = require('express').Router();
const {
  getStudentsController,
  getStudentCandidatureController
} = require('../controllers/student.controller');

router.get('', getStudentsController);
router.get('/candidatures', getStudentCandidatureController);

module.exports = router;
