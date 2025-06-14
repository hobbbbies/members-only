const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 20 characters.";
const emailErr = "Username must be a valid email"
const queries = require("../db/queries");
const helpers = require("../lib/helpers");



const validateUser = [
  body("fname").trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 20 }).withMessage(`First name ${lengthErr}`),
  body("lname").trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 20 }).withMessage(`Last name ${lengthErr}`),
  body("email").trim()
    .isEmail().withMessage(emailErr),
  body("password").trim()
    .notEmpty().withMessage("Password is required")
];

const emailCustom = body('email').custom(async (value) => {
    const users = await queries.findUserByEmail(value)
    if (users) {
        throw new Error("Email already in use");
    }
    return true;
});

const passwordCustom = body('verifyPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error("Passwords do not match");
    }
    return true;
});

const usersCreatePost = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("registerView", {
        title: "Register",
        user: req.user,
        errors: errors.array(),
      });
    }
    const hash = await helpers.genPassword(req.body.password);
    await queries.createUser(req.body.fname, req.body.lname, req.body.email, hash, req.body.admin);
    const user = await queries.findUserByEmail(req.body.email);

    req.login(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/');
    });
  }
];

module.exports = { usersCreatePost, emailCustom, passwordCustom }