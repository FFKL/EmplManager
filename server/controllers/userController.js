'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const crypto = require('crypto-promise');
const co = require('co');

module.exports = {
    login(req, res) {
        res.json(req.user)
    },
    logout(req, res) {
        User.findOne(req.user, (err, user) => {
            user['token'] = null;
            user.save(() => {
                req.logout();
                res.send({message: 'was logout'});
            });
        });
    },
    register(req, res) {
        co(function* () {
                let login = req.body.login;
                let password = req.body.password;
                if (/ /.test(login) || / /.test(password) || !login || !password)
                    res.send(400, {error: 'Login/password contains spaces or was empty'});
                else {
                    let user = yield User.find({login: login}).exec();
                    if (user.length === 0) {
                        let hash = yield crypto.hash('md5')(password);
                        let newUser = yield new User({
                            login : login,
                            hash : hash.toString('hex')
                        }).save();
                        res.send(201, {message: newUser.login + ' was registered'});
                    } else {
                        res.send(400, {error: login + ' is existing. Enter another Login'});
                    }
                }
            }
        ).catch(error => console.log(error));
    }
};