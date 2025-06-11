const express = require("express");
const router = express.Router();
const helpers = require("../lib/helpers");
const queries = require("../db/queries");

router.get("/", helpers.isAuthenticated, (req, res) => {
    res.render("createView");
});

router.post("/", async (req, res) => {
    const date = new Date().toISOString().slice(0, 16).replace('T', ' ');
    await queries.createMessage(req.user.email, req.body.msg, date);
    res.redirect("/");
});

module.exports = router;