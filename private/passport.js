const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');
const config = require('./config')

//passport matches a jwt with a user._id
module.exports = function(passport){
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.session.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.getUserById(jwt_payload._id, (err, user)=>{
      if(err){
        return done(err, false);
      }
      if(user){
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  }))
}
