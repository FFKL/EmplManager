const mongoose = require('mongoose');
const User = mongoose.model('User');
const local = require('./passportStrategies/local.js');
const bearer = require('./passportStrategies/bearer.js');

module.exports = (passport) => {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
    passport.use(local);
    passport.use(bearer);
};
