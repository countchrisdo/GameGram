const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/screenshots');
const isLoggedIn = require('../config/auth');

router.post('/movies/:id/screenshots', isLoggedIn, screenshotsCtrl.create);
router.delete('/screenshots/:id', isLoggedIn, screenshotsCtrl.delete);

module.exports = router;