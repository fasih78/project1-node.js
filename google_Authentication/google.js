const routes = require("express").Router();

const session = require("express-session");
const passport = require("passport");
const isLoggedIn = require("../middleware/google_auth2");
require("../middleware/google_auth");

routes.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with');
});
routes.get("/protected", isLoggedIn, (req, res) => {
  const htmlContent = `
        <html>
          <head>
            <title>Authentication Success</title>
          </head>
          <body>
            <h1>Authentication Successfully</h1>
            <p>Hello, ${req.user.displayName}! This is a protected route.</p>
          </body>
        </html>
      `;

  res.send(htmlContent);
});

routes.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

routes.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);

routes.get("/auth/failure", (req, res) => {
  res.send("something went wrong");
});

module.exports = routes;
