const express = require("express");
const morgan = require("morgan");
const app = express();
const helmet = require("helmet");
const path = require("path");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");

require("dotenv").config();
express.static("public");

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};

const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  console.log("accessToken", accessToken);
  console.log("refreshToken", refreshToken);
  console.log("profile", profile);
  done(null, profile);
};

//passport will use the strategy we created
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

//helmet middleware to secure Express apps by setting various HTTP headers
app.use(helmet());
//passport middleware to authenticate requests
app.use(passport.initialize());

app.use(express.json());
app.use(morgan("dev"));

const checkLoggedIn = (req, res, next) => {
  const isLoggedIn = 1;
  if (!isLoggedIn) {
    res.status(401).send("Please log in");
  } else {
    next();
  }
};

// this is the route that the user will hit to start the authentication process
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: false,
  }),
  (req, res) => {
    console.log("Google auth callback");
  }
);

app.get("/auth/logout", (req, res) => {});

app.get("/secret", checkLoggedIn, (req, res) => {
  res.send("<h1>Secret page</h1>");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
