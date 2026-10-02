const express =
  require("express");

const router =
  express.Router();

router.get(
  "/stats",
  (_req, res) => {

    res.json({
      users: 0,
      conversations: 0,
      requests: 0,
      providers: 3
    });

  }
);

module.exports = router;
