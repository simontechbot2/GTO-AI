const rateLimit =
  require("express-rate-limit");

const limiter =
  rateLimit({
    windowMs:
      Number(
        process.env.RATE_LIMIT_WINDOW_MS ||
        60000
      ),

    max:
      Number(
        process.env.RATE_LIMIT_MAX_REQUESTS ||
        30
      ),

    standardHeaders: true,

    legacyHeaders: false,

    message: {
      error:
        "Too many requests. Please try again later."
    }
  });

module.exports =
  limiter;
