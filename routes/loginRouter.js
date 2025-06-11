const express = require("express");
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
   
    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

router.post("/", passport.authenticate('local', { failureRedirect: '/login/failure', successRedirect: '/login/success' }));

router.get('/success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/">Go to protected route</a></p>');
});

router.get('/failure', (req, res, next) => {
    res.render('loginFailView');
});


module.exports = router;