const express = require('express');
const router = express.Router();
const passport = require("passport");

const index = require('../controllers/index');

// Missing media remove (in all the gallery)

router.get("/album/list", passport.authenticate('jwt', {session : false}), index.list_albums);
router.get("/album/add/:name", passport.authenticate('jwt', {session : false}), index.add_album);
router.post("/album/media/remove/all", passport.authenticate('jwt', {session : false}), index.remove_media_all_albums);
router.get("/album/media/list/:name", passport.authenticate('jwt', {session : false}), index.list_album_medias);
router.post("/album/media/add", passport.authenticate('jwt', {session : false}), index.add_media);
router.get("/album/remove/:id", passport.authenticate('jwt', {session : false}), index.remove_album);
router.get("/media/remove/:id", passport.authenticate('jwt', {session : false}), index.remove_media);
router.post("/media/copy", passport.authenticate('jwt', {session : false}), index.copy_media_to_album);

module.exports = router;