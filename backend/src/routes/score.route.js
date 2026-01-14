const express = require("express");
const router = express.Router();
const { getScore } = require("../controllers/score.controller");

router.get("/", getScore);

module.exports = router;
