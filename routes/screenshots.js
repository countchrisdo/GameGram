const express = require('express');
const router = express.Router();
const screenshotsCtrl = require('../controllers/screenshots');
const isLoggedIn = require('../config/auth');

router.post('/games/:id/screenshots', isLoggedIn, screenshotsCtrl.create);
router.delete('/games/:id', isLoggedIn, screenshotsCtrl.delete);

module.exports = router;