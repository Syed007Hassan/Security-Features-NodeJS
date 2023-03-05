const express = require("express");
const morgan = require("morgan");
const app = express();
const helmet = require("helmet");
const path = require("path");
const passport = require("passport");
const cookieSession = require("cookie-session");
const { verify } = require("crypto");
const { Strategy } = require("passport-google-oauth20");

require("dotenv").config();
express.static("public");

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  // console.log("profile", profile);
  done(null, profile);
};

//passport will use the strategy we created
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

//save the session to the cookie
passport.serializeUser((user, done) => {
  // User.findOrCreate({ googleId: user.id }
  console.log("serialize user will match islogged id: " + user.id);
  done(null, user.id, user.displayName);
});

//retrieve the session from the cookie
passport.deserializeUser((user, done) => {
  done(null, user);
});

//helmet middleware to secure Express apps by setting various HTTP headers
app.use(helmet());

//cookieSession middleware to store session data in a cookie
app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2], // rotate keys every 24 hours
  })
);
//passport middleware to authenticate requests
app.use(passport.initialize());
// passport middleware to restore authentication state from session
app.use(passport.session());

app.use(express.json());
app.use(morgan("dev"));

const checkLoggedIn = (req, res, next) => {
  const isLoggedIn = req.user;
  console.log("is logged in:" + isLoggedIn);
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
    successRedirect: "/secret",
    session: true,
  }),
  (req, res) => {
    console.log("Google auth callback");
  }
);

app.get("/auth/logout", (req, res) => {
  //req.logout() is a function attached to the request object by passport
  req.logout();
  return res.redirect("/");
});

app.get("/secret", checkLoggedIn, (req, res) => {
  res.send("<h1>Secret page</h1>");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
