const express = require("express");
const router = express.Router();
const { connectBank } = require("../controllers/bank.controller");

router.post("/connect", connectBank);

module.exports = router;
