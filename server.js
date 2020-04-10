const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const users = require("./routes/api/users");
const passport = require("passport");
//intialize the variable called app
const app = express();
// middelware service body-parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//DB CONFIG
const db = require("./config/keys").mongoURI;
//connect to database
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoose database connected"))
  .catch((err) => console.log(err));

//passport middleware
app.use(passport.initialize());
//passport config
require("./config/passport")(passport);

// //uses routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//assigning the port
const port = process.env.port || 5000;
// reading the port the show to console
app.listen(port, () => console.log(`Server running on port ${port}`));
