const express = require('express');
const router = express.Router();

const apiProductsController = require('../controllers/apiUsersController.js');

router.get('/', apiUsersController.list);
router.get('/:id', apiUsersController.detail);

module.exports = router;