const express = require("express");
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
    res.render('loginView', { title: "Login", user: req.user });
});

router.post("/", passport.authenticate('local', { failureRedirect: '/login/failure', successRedirect: '/' }));

router.get('/failure', (req, res, next) => {
    res.render('loginFailView', { user: req.user || null });
});


module.exports = router;