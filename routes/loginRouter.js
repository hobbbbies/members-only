const express = require("express");
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
   res.render('loginView', {user: req.user});

});

router.post("/", passport.authenticate('local', { failureRedirect: '/login/failure', successRedirect: '/login/success' }));

router.get('/success', (req, res, next) => {
    res.redirect("/");
});

router.get('/failure', (req, res, next) => {
    res.render('loginFailView', { user: req.user });
});


module.exports = router;