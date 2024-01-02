const routes = require("express").Router();

const isLoggedIn = require("../middleware/google_auth_logIn");
require("../middleware/google_auth");

const { Auth_google, after_auth, Callback, auth_fail } = require("./google");

routes.get("/", async (req, res) => {
  res.send(
    '<a href="/auth/google">Authenticate with Google <br><a href="/auth/facebook">Authenticate with Facebook'
  );
});

routes.get("/auth/google", async (req, res) => {
  await Auth_google(req, res);
});

routes.get("/protected", isLoggedIn, async (req, res) => {
  await after_auth(req, res);
});

routes.get("/auth/failure", async (req, res) => {
  await auth_fail(req, res);
});

routes.get("/google/callback", async (req, res) => {
  await Callback(req, res);
});

module.exports = routes;
