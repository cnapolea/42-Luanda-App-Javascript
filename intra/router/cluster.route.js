const router = require('express').Router();

const { getClusterController } = require('../controllers/cluster.controllers');

router.get('/clusters', getClusterController);

module.exports = router;
