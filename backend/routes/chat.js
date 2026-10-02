const express =
  require("express");

const router =
  express.Router();

const aiRouter =
  require("../services/ai-router");

const rateLimit =
  require("../middleware/rate-limit");

router.post(
  "/",
  rateLimit,
  async (req, res, next) => {

    try {

      const {
        model,
        messages
      } = req.body;

      if (
        !Array.isArray(messages) ||
        messages.length === 0
      ) {

        return res
          .status(400)
          .json({
            error:
              "Messages are required."
          });

      }

      const result =
        await aiRouter(
          model,
          messages
        );

      res.json(result);

    } catch (error) {

      next(error);

    }

  }
);

module.exports = router;
