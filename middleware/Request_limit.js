const rateLimit = require("express-rate-limit");

const rateLimitMiddleware = (req, res, next) => {
  try {
    const limit = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 1,
      message: "Limit Reached!",
    });

    req.limit = limit;

    next();
  } catch (err) {
    res.status(401).send({ success: false, message: err });
  }
};

module.exports = rateLimitMiddleware;
