const routes = require("express").Router();
const {
  Auth_facebook,
  after_auth,
  auth_fail,
  Callback,
} = require("./facebook");
const isLoggedIn = require("../middleware/facebook_auth_log.js");
require("../middleware/facebook_auth.js");

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

module.exports = routes;
