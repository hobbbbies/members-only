const queries = require('../db/queries');
require("dotenv").config();

async function registerMember(req, res) {
    if (req.body.code !== process.env.MEMBER_CODE) {
        res.render("memberFail", { user: req.user });
    } else {
        await queries.registerMember(req.query.email, req.body.code);
        res.render('memberSuccess', {user: req.user}); 
    }
}

module.exports = { registerMember };