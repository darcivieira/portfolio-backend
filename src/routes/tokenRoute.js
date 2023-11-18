const express = require("express");
const tokenController = require("../controllers/tokenController");
const jwt = require("../helpers/jwtHelper")

const router = express.Router()

router.post("/", tokenController.create)
router.post("/refresh/", jwt.validateToken, tokenController.update)

module.exports = router;