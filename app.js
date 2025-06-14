// app.js
const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
const createRouter = require("./routes/createRouter");
const editRouter = require("./routes/editRouter");
const memberRouter = require("./routes/memberRouter");
const session = require('express-session');
const passport = require('passport');
const pool = require('./db/pool');
const path = require('node:path');
const { log } = require("node:console");
const PORT = process.env.PORT || 3000;

require('./config/passport');
require('dotenv').config();
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
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
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/create", createRouter);
app.use("/edit", editRouter);
app.use("/member", memberRouter);

app.listen(PORT, () => {
    console.log("Listening on ", PORT);
});

