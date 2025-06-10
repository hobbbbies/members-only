// app.js
const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");
const session = require('express-session');
var passport = require('passport');
const PORT = process.env || 3000;

require('./config/passport');
require('dotenv').config();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: new (require('connect-pg-simple')(session))({
        pool: pool,
    }),
    saveUninitialized: false,
    secret: process.env.SECRET,
    resave: false,
    cookie: {maxAge: 30 * 24 * 60 * 60 * 1000 },
}));
app.use(passport.session());
app.use("/", indexRouter);  

app.listen(3000, () => {
    console.log("Listening on 3000");
})