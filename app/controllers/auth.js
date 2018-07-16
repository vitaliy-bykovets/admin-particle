var router = require('express').Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.post('/login', function (req, res, next) {
  // TODO use Validate in the future
  if(!req.body.email) {
    return res.status(422).json({ errors: { email: "can't be blank" }});
  }

  if(!req.body.password){
    return res.status(422).json({ errors: { password: "can't be blank" }});
  }

  passport.authenticate('local', { session: false }, function(err, user, info){
    if(err) return next(err);

    if(user) {
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});