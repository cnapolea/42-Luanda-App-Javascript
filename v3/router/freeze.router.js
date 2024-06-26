const {
  addCompensationDaysToCadets,
  getFreezes
} = require('../controller/freeze.controller');
const { validateKeyCloakUser } = require('../middleware/user.authentication');

let router = require('express').Router();

router
  .get(
    '/add_bulk_compensation',
    validateKeyCloakUser,
    addCompensationDaysToCadets
  )
  .get('', validateKeyCloakUser, getFreezes);
module.exports = router;
