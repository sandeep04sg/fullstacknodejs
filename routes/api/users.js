//user authority and authentication
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");
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
      bcryptPassword(newUser, res, user);
    } //else method is closed
  }); //findone is closed
}); //post method is closed

// bcrypt password method using bc
function bcryptPassword(newUser, res, user) {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        throw err;
      } else {
        newUser.password = hash;
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      }
    });
  }); //getsalt is closed
}

// jwtToken
//@acces public
//@route Post api/users/login
//@desc Login user jwtToken
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then((user) => {
    // find user
    if (!user) {
      return res.status(404).json({
        email: "email not found",
      });
    }
    //check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //return res.json({ msg: "password is match" });
        //user matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; //create jwt payload

        //token sign
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 60 * 60 },
          (err, token) => {
            res.json({
              success: true,
              token: "bearer" + token,
            });
          }
        );
      } else {
        return res.status(400).json({ password: "incorrect password" });
      }
    });
  });
});
//@acces private
//@route return api/users/current
//@desc return current user
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

module.exports = router;
