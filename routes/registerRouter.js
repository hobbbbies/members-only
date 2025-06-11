const express = require("express");
const router = express.Router();
const helpers = require("../lib/helpers");
const controller = require("../controllers/registerController");

 router.get('/', (req, res) => {
    res.render('registerView', {title: Register});
 });

//  router.post('/', async (req, res, next) => {
//     // const saltHash = helpers.genPassword(req.body.password);
//     const hash = await helpers.genPassword(req.body.password);

//     // const salt = saltHash.salt;
//     // const hash = saltHash.hash;

//     console.log("req body: ", req.body);
//     await queries.createUser(req.body.fname, req.body.lname, req.body.email, hash, req.body.membershipStatus);

//     res.redirect('/');
//  });

  router.post("/", controller.usersCreatePost);
module.exports = router;