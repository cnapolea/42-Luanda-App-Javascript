const router = require('express').Router();
const {
  authenticateUserController
} = require('../controllers/auth.controller');

router.get('', authenticateUserController);

module.exports = router;
