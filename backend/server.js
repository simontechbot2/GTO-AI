require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const config =
  require("./config");

const chatRoutes =
  require("./routes/chat");

const authRoutes =
  require("./routes/auth");

const modelRoutes =
  require("./routes/models");

const fileRoutes =
  require("./routes/files");

const adminRoutes =
  require("./routes/admin");

const errorHandler =
  require("./middleware/error-handler");

const app =
  express();

app.use(
  cors({
    origin:
      config.allowedOrigin === "*"
        ? true
        : config.allowedOrigin
  })
);

app.use(
  express.json({
    limit: "10mb"
  })
);

app.use(
  express.urlencoded({
    extended: true
  })
);

app.get(
  "/api/health",
  (_req, res) => {

    res.json({
      ok: true,
      name: "GTO AI",
      timestamp:
        new Date().toISOString()
    });

  }
);

app.use(
  "/api/chat",
  chatRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/models",
  modelRoutes
);

app.use(
  "/api/files",
  fileRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  express.static(
    path.join(
      __dirname,
      "..",
      "frontend"
    )
  )
);

app.use(
  errorHandler
);

app.get(
  "*",
  (_req, res) => {

    res.sendFile(
      path.join(
        __dirname,
        "..",
        "frontend",
        "index.html"
      )
    );

  }
);

app.listen(
  config.port,
  "0.0.0.0",
  () => {

    console.log(
      `GTO AI running on port ${config.port}`
    );

  }
);
