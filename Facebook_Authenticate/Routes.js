const routes = require("express").Router();
const session = require("express-session");
const express  = require ('express')
const app = express()
const passport = require("passport");

const {
  Auth_facebook,
  after_auth,
  auth_fail,
  Callback,
} = require("./facebook");
const isLoggedIn = require("../middleware/facebook_auth_log.js");
require("../middleware/facebook_auth.js");
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "FMS-1",
  })
);

app.use(passport.initialize());
app.use(passport.session());


// routes.get("/", async (req, res) => {
//   res.send('<a href="/auth/facebook">Authenticate with Facebook');
// });

routes.get("/auth/facebook", async (req, res) => {
  await Auth_facebook(req, res);
});

routes.get("/protected/facebook", isLoggedIn, async (req, res) => {
  await after_auth(req, res);
});

routes.get("/auth/failure/facebook", async (req, res) => {
  await auth_fail(req, res);
});

routes.get("/auth/facebook/callback", async (req, res) => {
  await Callback(req, res);
});


routes.get('/logout', (req, res) => {
  // Destroy the session data
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destroy error:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Redirect the user to the home page or another appropriate URL after logout
    res.redirect('/');
  });
});







module.exports = routes;
