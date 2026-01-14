const express = require("express");
const router = express.Router();
const { getUserDashboard } = require("../controllers/user.controller");

router.get("/dashboard", getUserDashboard);

module.exports = router;
