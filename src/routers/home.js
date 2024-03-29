const express = require('express');
const router = express.Router();
const path = require('node:path');
const homeController = require ('../controllers/homeController.js')

router.get('/', homeController.index);
router.get('/dashboard', homeController.dashboard);

module.exports = router;