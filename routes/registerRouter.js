const express = require("express");
const router = express.Router();
const controller = require("../controllers/registerController");

 router.get('/', (req, res) => {
    res.render('registerView', { title: 'Register', user: req.user });
 });

  router.post("/", controller.emailCustom, controller.passwordCustom, controller.usersCreatePost);
module.exports = router;