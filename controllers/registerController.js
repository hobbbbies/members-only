const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 20 characters.";
const emailErr = "Username must be a valid email"
const queries = require("../db/queries");


const validateUser = [
  body("fname").trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 20 }).withMessage(`First name ${lengthErr}`),
  body("lname").trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 20 }).withMessage(`Last name ${lengthErr}`),
  body("email").trim()
    .isEmail.withMessage(emailErr),
  body("password").trim()
    .notEmpty.withMessage("Password is required")
];

exports.usersCreatePost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    const hash = await helpers.genPassword(req.body.password);
    await queries.createUser(req.body.fname, req.body.lname, req.body.email, hash, req.body.membershipStatus);
    res.redirect("/");
  }
];