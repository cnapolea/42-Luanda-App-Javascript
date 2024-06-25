const {
  getCampusConfigurationList
} = require('../controller/campus.controller');
const { validateKeyCloakUser } = require('../middleware/user.authentication');

const router = require('express').Router();

router.get('', validateKeyCloakUser, getCampusConfigurationList);

module.exports = router;
