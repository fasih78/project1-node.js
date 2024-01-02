const passport = require("passport");

const Auth_facebook = passport.authenticate("facebook", {
  scope: ["public_profile", "email"],
});

const after_auth = (req, res) => {
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
};

const Callback = passport.authenticate("facebook", {
  successRedirect: "/protected/facebook",
  failureRedirect: "/auth/failure/facebook",
});

const auth_fail = (req, res) => {
  res.send("Something went wrong");
};

module.exports = {
  Auth_facebook,
  after_auth,
  Callback,
  auth_fail,
};
