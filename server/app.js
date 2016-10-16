'use strict';
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8080;

require('./models/user')(mongoose);
require('./models/employee')(mongoose);
require('./models/time')(mongoose);

require('./config/express')(app, passport);
require('./config/mongoose')(mongoose);
require('./config/passport')(passport);
require('./config/routes')(app, passport);

app.use(express.static(__dirname + '/public'));

const server = app.listen(PORT, () => { console.log("Server started on localhost:" + PORT) });

module.exports = server;