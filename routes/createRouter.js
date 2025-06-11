const express = require("express");
const router = express.Router();
const helpers = require("../lib/helpers")

router.get("/", helpers.isAuthenticated, (req, res) => {
    res.render("createView");
});

module.exports = router;