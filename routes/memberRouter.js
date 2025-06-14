const express = require("express");
const router = express.Router();
const controller = require("../controllers/memberController");

router.get("/", async (req, res) => {
    res.render('memberView', { title: "Member-sign-up", user: req.user });
});

router.post("/", controller.registerMember);

module.exports = router;