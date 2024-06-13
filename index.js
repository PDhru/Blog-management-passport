const express = require("express");
const app = express();
const port = 8088;
const mongoose = require("mongoose");
const router = require("./router/user.router");
const connectDB = require("./config/database");
const localauth = require("./middleware/passport");
const passport = require("passport");
const session = require("express-session");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(
  require("express-session")({
    secret: "primary key123",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
localauth(passport);

app.use(router);

app.listen(port, (err) => {
  connectDB();
  console.log(`server is running on port http://localhost:${port}`);
});
