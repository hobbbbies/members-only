const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const queries = require('../db/queries');
const helpers = require("../lib/helpers");

const verifyCallback = async (username, password, done) => {
    try {
        const user = await queries.findUserByEmail(username);
        if (!user) return done(null, false);

        const isValid = helpers.validPassword(password, user.password);
        if (isValid) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch(err) {
        done(err);
    }
} 

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser( async (email, done) => {
    try {
        const user = await queries.findUserByEmail(email);
        done(null, user);
    } catch(err) {
        done(err);
    }
    
});