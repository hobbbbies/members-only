const express = require("express");
const router = express.Router();
const passport = require('passport');
const queries = require('../db/queries')

router.get('/', (req, res, next) => {
    res.render('loginView', { title: "Login", user: req.user });
});

router.post("/", async (req, res, next) => {
    console.log("Login attempt for:", req.body.email);
    console.log(await queries.findUserByEmail(req.body.email));
    passport.authenticate('local', { 
        failureRedirect: '/login/failure', 
        successRedirect: '/' 
    })(req, res, next);
});

router.get('/failure', (req, res, next) => {
    res.render('loginFailView', { user: req.user });
});


module.exports = router;