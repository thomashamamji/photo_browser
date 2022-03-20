const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();

// Passport Config
require('./config/passport')(passport);

// Routes
const indexApi = require('./routes/index');
const userApi = require('./routes/user');
const clientApi = require('./routes/api');

// No passport now

var server = express();

server.use(cors());

server.use(logger('dev'));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(session({ secret: process.env.APP_SECRET }));
server.use(passport.initialize());
server.use(passport.session());

server.use('/index', indexApi);
server.use('/user', userApi);
server.use('/client', clientApi);

// catch 404 and forward to error handler
server.use(function(req, res, next) {
    res.status(404).json({ msg : "La page n'existe pas." });
});

// error handler
server.use(function(err, req, res, next) {
// render the error page
res.status(err.status || 500);

if (req.user) {
    res.json({ msg : err.message });
    console.log(err.message);
} else {
    res.json({ msg : err.message });
    console.log(err.message);
}
});

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server running on port ${port}`));