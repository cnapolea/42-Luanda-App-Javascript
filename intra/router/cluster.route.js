const router = require('express').Router();
const { validateUser } = require('../middleware/user.authentication');

const { getClusterController } = require('../controllers/cluster.controllers');

router.get('/clusters', validateUser, getClusterController);

module.exports = router;
