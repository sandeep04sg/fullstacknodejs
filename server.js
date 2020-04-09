const express = require("express");
const mongoose = require("mongoose");

const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const users = require("./routes/api/users");

//intialize the variable called app
const app = express();
//DB CONFIG
const db = require("./config/keys").mongoURI;
//connect to database
mongoose
  .connect(db)
  .then(() => console.log("mongoose database connected"))
  .catch((err) => console.log(err));

//routing
app.get("/", (req, res) => res.send("hello sandip"));

//uses routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//assigning the port
const port = process.env.port || 5000;
// reading the port the show to console
app.listen(port, () => console.log(`Server running on port ${port}`));
