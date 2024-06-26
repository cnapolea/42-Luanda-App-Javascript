const router = require('express').Router();
const {
  validateKeyCloakUser
} = require('../../v3/middleware/user.authentication');
const {
  authenticateUserController
} = require('../controllers/auth.controller');

router.get('', validateKeyCloakUser, authenticateUserController);

module.exports = router;
