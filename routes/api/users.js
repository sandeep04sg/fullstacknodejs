//user authority and authentication
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
// load user model
const User = require("../../models/User");
//@acces public
//@route GET api/users/test
//
router.get("/test", (req, res) => res.json({ msg: "users works" }));
//bcrypt gensalt round
const saltRounds = 10;
//@acces public
//@route GET api/users/register
//@desc to register users
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //reading
        d: "mm", // default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });
      bcryptPassword(newUser, res, user); //getsalt is closed
    } //else method is closed
  }); //findone is closed
}); //post method is closed

// bcrypt password method using bc
function bcryptPassword(newUser, res, user) {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then((User) => res.json(user))
        .catch((err) => console.log(err));
    });
  });
}
module.exports = router;
