'use strict';

const mongoose = require('mongoose');
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = mongoose.model('User');

module.exports = new BearerStrategy(
    (token, done) => {
        User.findOne({ token: token }, (err, user) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user);
        });
    }
);
