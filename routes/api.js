const express = require('express');
const router = express.Router();

const api = require('../controllers/api');

router.get('/photos/:keyword', api.getPhotosFromKeyword);
router.get('/videos/:keyword', api.getVideosFromKeyword);

module.exports = router;