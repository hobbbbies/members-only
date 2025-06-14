const express = require("express");
const router = express.Router();
const queries = require('../db/queries');

router.get("/", async (req, res) => {
    messages = await queries.getAllMessages();
    res.render('indexView', { messages: messages, user: req.user });
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err)
        res.redirect('/');
    });
});

module.exports = router;