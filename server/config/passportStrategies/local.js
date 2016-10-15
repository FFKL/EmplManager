'use strict';

const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');
const co = require('co');
const crypto = require('crypto-promise');
const jwt = require('jsonwebtoken');

module.exports = new LocalStrategy( {
        usernameField: 'login',
        passwordField: 'password'
    },
    (login, password, done) => {
        co(function* () {
                let user = yield User.findOne({login: login}).exec();
                if (!user)
                    return done(null, false, { message: 'Incorrect login.' });
                let hash = yield crypto.hash('md5')(password);
                if (hash.toString('hex') !== user.hash)
                    return done(null, false, { message: 'Incorrect password.' });
                user['token'] = jwt.sign({id: user.id}, 'itissecret');
                user.save();
                return done(null, user);

            }
        ).catch(error => console.log(error.stack))
    }
);