require("dotenv").config();

module.exports = {

  port:
    Number(process.env.PORT || 3000),

  sessionSecret:
    process.env.SESSION_SECRET ||
    "development-secret",

  adminUsername:
    process.env.ADMIN_USERNAME ||
    "admin",

  adminPassword:
    process.env.ADMIN_PASSWORD ||
    "change-me",

  allowedOrigin:
    process.env.ALLOWED_ORIGIN ||
    "*",

  maxFileSizeMB:
    Number(
      process.env.MAX_FILE_SIZE_MB || 10
    ),

  providers: {

    "provider-a": {
      key:
        process.env.AI_PROVIDER_A_KEY,
      url:
        process.env.AI_PROVIDER_A_URL,
      model:
        process.env.AI_PROVIDER_A_MODEL
    },

    "provider-b": {
      key:
        process.env.AI_PROVIDER_B_KEY,
      url:
        process.env.AI_PROVIDER_B_URL,
      model:
        process.env.AI_PROVIDER_B_MODEL
    },

    "provider-c": {
      key:
        process.env.AI_PROVIDER_C_KEY,
      url:
        process.env.AI_PROVIDER_C_URL,
      model:
        process.env.AI_PROVIDER_C_MODEL
    }

  }
};
