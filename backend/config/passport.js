var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

//The local authentication strategy authenticates users using a username and password. The strategy requires a verify callback, which accepts these credentials and calls done providing a user.
passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function(email, password, done) {
  User.findOne({ email: email }).then(function(user){
    if(!user || !user.validPassword(password)){
      return done(null, false, { errors: {'email or password': 'is invalid'} });
    }

    return done(null, user);
  }).catch(done);
}));