const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user')

module.exports = function () {
  passport.use(
    "local",
    new LocalStrategy({}, (username, password, done) => {
      User.findOne({username: username}, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result) return done(null, user)
          return done(null, false);
        });
      })
    })
  )

  passport.serializeUser((user, callback) => {
    callback(null, user.id);
  })

  passport.deserializeUser((id, callback) => {
    User.findOne({_id: id}, (err, user) => {
      if (err) throw err;
      if (user) callback(null, {username: user.username});
    })
  })
}