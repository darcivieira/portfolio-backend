const express = require("express");
const tokenController = require("../controllers/tokenController");

const router = express.Router()

router.post("/", tokenController.create)

module.exports = router;