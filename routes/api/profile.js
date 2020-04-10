// enviroment specific
const express = require("express");
const router = express.Router();
//@acces public
//@route GET api/profile/test
//@desc to test
router.get("/test", (req, res) => res.json({ msg: "profile works" }));
module.exports = router;
