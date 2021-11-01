const User = require("./../models/user");
const bcrypt = require("bcryptjs")
const passport = require("passport");
exports.Register = (req, res) => {
  User.findOne({username: req.body.username}, async (err, doc) => {
    if (err)
      throw err;
    else if (doc)
      res.send("User already exists!");
    else {
      const newUser = new User({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10)
      });
      await User.create(newUser);
      res.send("User created!");
      console.log("User created: ", newUser)
    }
  })
}

exports.Login = (req, res, next) => {
  passport.authenticate("local", {}, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.send("No user exists!");
    } else {
      req.logIn(user, err => {
        if (err) throw  err;
        console.log("Successfully authenticated: ", req.body);
        res.send("Successfully authenticated!");
      })
    }
  })(req, res, next);
}

exports.LogOut = (req, res) => {
  console.log("LogOut: ", req.user)
  req.logOut();
  res.send("LogOut")
}

exports.GetUser = (req, res) => {
  console.log("GetUser: ", req.user);
  res.send(req.user);
}