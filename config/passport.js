const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { runSQLQuery } = require('./db');
const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        const query = `SELECT * FROM Users WHERE Id_user="${jwt_payload.id}";`;
        runSQLQuery(query)
        .then(r => {
          if (r.length) return done(null, r[0]);
          else return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};