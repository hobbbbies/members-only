const queries = require("../db/queries");
const { post } = require("../routes/registerRouter");

async function getMessage(req, res) {
    const msg = await queries.getMessage(req.query.msgId);
    res.render('editView', { msg: msg, user: req.user });
}

// Upates db from post requst
async function postMessage(req, res) {
    const msg = await queries.getMessage(req.query.msgId);
    await queries.updateMessage(req.body.msg, req.query.msgId);
    res.redirect("/");
}

async function deleteMessage(req, res) {
    await queries.deleteMessage(req.query.msgId);
    res.redirect("/");
}

module.exports = { getMessage, postMessage, deleteMessage };