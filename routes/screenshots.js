const express = require('express');
// const app = express();
// const path = require('path');
const router = express.Router();
const passport = require('passport');

// const upload = require('../uploadMiddleware');
// const Resize = require('../Resize');

const isLoggedIn = require('../config/auth');
const screenshotsCtrl = require('../controllers/screenshots');

// router.get('/', async function (req, res) {
//     await res.render('index');
//   });

// router.post('/post', upload.single('image'), async function (req, res) {
// const imagePath = path.join(__dirname, '../public/images');
// const fileUpload = new Resize(imagePath);
// if (!req.file) {
//     res.status(401).json({error: 'Please provide an image'});
// }
// const filename = await fileUpload.save(req.file.buffer);
// return res.status(200).json({ name: filename });
// });

router.get('/screenshots/:id/edit', isLoggedIn, screenshotsCtrl.edit);
router.post('/games/:id/screenshots', isLoggedIn, screenshotsCtrl.create);
router.put('/screenshots/:id', isLoggedIn, screenshotsCtrl.update);
router.delete('/screenshots/:id', isLoggedIn, screenshotsCtrl.delete);

module.exports = router;