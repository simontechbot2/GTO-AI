const express =
  require("express");

const router =
  express.Router();

const config =
  require("../config");

const sessions =
  new Map();

router.post(
  "/login",
  (req, res) => {

    const {
      username,
      password
    } = req.body;

    if (
      username !==
        config.adminUsername ||
      password !==
        config.adminPassword
    ) {

      return res
        .status(401)
        .json({
          error:
            "Invalid credentials."
        });

    }

    const token =
      crypto.randomUUID();

    sessions.set(
      token,
      {
        username,
        createdAt: Date.now()
      }
    );

    res.json({
      token,
      user: {
        username,
        role: "admin"
      }
    });
  }
);

router.get(
  "/me",
  (_req, res) => {

    res.status(401).json({
      error: "Not authenticated"
    });

  }
);

router.post(
  "/logout",
  (_req, res) => {

    res.json({
      ok: true
    });

  }
);

module.exports = router;
