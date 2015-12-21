//authentication for api requests
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

passport.use(new BasicStrategy(
  function(username, password, cb){
    User.findOne({username: username}, function(err, user){
      if(err) {return cb(err);}
      //no user with username
      if (!user) {return cb(null, false);}

      //verify password
      user.verifyPassword(password, function(err, isMatch){
        if(err) {return cb(err);}
        //does not match
        if(!isMatch) {return cb(null, false);}
        //success
        return cb(null, user);
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', {session: false});
