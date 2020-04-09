//user authority and authentication
const express = require("express");
const router = express.Router();
//@acces public
//@route GET api/users/test
//
router.get("/test", (req, res) => res.json({ msg: "users works" }));
module.exports = router;
