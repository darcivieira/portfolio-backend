const express = require("express");
const registerController = require("../controllers/registerController");
const router = express.Router();

router.get("/", registerController.list);
router.post("/", registerController.create);

module.exports = router;