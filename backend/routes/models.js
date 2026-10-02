const express =
  require("express");

const router =
  express.Router();

router.get(
  "/",
  (_req, res) => {

    res.json({
      models: [
        {
          id: "provider-a",
          name: "GTO Fast"
        },
        {
          id: "provider-b",
          name: "GTO Reasoning"
        },
        {
          id: "provider-c",
          name: "GTO Pro"
        }
      ]
    });

  }
);

module.exports = router;
