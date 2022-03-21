const express = require('express');
const router = express.Router();
const passport = require("passport");

const index = require('../controllers/index');

router.get("/album/add/:name", passport.authenticate('jwt', {session : false}), index.add_album);
router.get("/album/list/:name", passport.authenticate('jwt', {session : false}), index.list_album_medias);
router.post("/album/media/add", passport.authenticate('jwt', {session : false}), index.add_media);
router.get("/album/remove/:id", passport.authenticate('jwt', {session : false}), index.remove_album);
router.get("/media/remove/:id", passport.authenticate('jwt', {session : false}), index.remove_media);
router.post("/media/copy", passport.authenticate('jwt', {session : false}), index.copy_media_to_album);

module.exports = router;