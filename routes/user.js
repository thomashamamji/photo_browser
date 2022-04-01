const express = require('express');
const passport = require("passport");

const router = express.Router();

const user = require('../controllers/user');

router.post('/register', user.register_new_user);
router.post('/login', user.login);
router.get('/auth/check', passport.authenticate('jwt', {session : false}), user.check_token);

module.exports = router;