const express = require('express');
const router = express.Router();

const apiUsersController = require('../controllers/apiUsersController.js');

router.get('/', apiUsersController.list);
router.get('/:id', apiUsersController.details);

module.exports = router;