const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const session = require('cookie-session');
const express = require('express');

module.exports = (app, passport) => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(session({secret: 'SECRET'}));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());
};