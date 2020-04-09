// users post data
const express = require("express");
const router = express.Router();
//@acces public
//@route GET api/posts/test
//
router.get("/test", (req, res) => res.json({ msg: "Post works" }));
module.exports = router;
