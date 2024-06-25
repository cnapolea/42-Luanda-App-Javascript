const router = require('express').Router();
const {
  getCadetsController,
  getStudentsController
} = require('../controllers/student.controller');
const { validateUser } = require('../middleware/user.authentication');

router.get('', validateUser, getStudentsController);
router.get('/cadets', validateUser, getCadetsController);

module.exports = router;
