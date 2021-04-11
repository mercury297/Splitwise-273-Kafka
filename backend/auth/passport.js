/* eslint-disable no-underscore-dangle */
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const kafka = require('../kafka/client');

function auth() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: process.env.SECRET,
  };
  passport.use(
    new JwtStrategy(opts, (jwtPayload, callback) => {
      const msg = {};
      console.log('jwt payload', jwtPayload);
      msg.id = jwtPayload._id;
      // eslint-disable-next-line consistent-return
      kafka.make_request('passport', msg, (err, results) => {
        if (err) {
          return callback(err, false);
        }
        if (results) {
          callback(null, results);
        } else {
          callback(null, false);
        }
      });
    }),
  );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate('jwt', { session: false });
