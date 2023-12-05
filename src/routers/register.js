const express = require('express');
const router = express.Router();
const path = require('node:path');
const registerController = require ('../controllers/registerController.js')

router.get('/', registerController.index);
router.post('/', registerController.create);

module.exports = router;