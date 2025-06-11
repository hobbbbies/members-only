const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render('indexView');
});

// router.get('/protected-route', (req, res, next) => {
    
//     // This is how you check if a user is authenticated and protect a route.  You could turn this into a custom middleware to make it less redundant
//     if (req.isAuthenticated()) {
//         res.send('<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>');
//     } else {
//         res.send('<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>');
//     }
// });

module.exports = router;