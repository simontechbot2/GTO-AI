const express =
  require("express");

const multer =
  require("multer");

const config =
  require("../config");

const router =
  express.Router();

const upload =
  multer({
    storage:
      multer.memoryStorage(),

    limits: {
      fileSize:
        config.maxFileSizeMB *
        1024 *
        1024
    }
  });

router.post(
  "/upload",
  upload.array("files", 5),
  (req, res) => {

    const files =
      (req.files || [])
        .map(file => ({
          name: file.originalname,
          type: file.mimetype,
          size: file.size
        }));

    res.json({
      success: true,
      files
    });

  }
);

module.exports = router;
