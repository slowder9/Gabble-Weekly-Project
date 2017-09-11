const express = require('express');
const mustache = require('mustache-express');
const bodyparser = require('body-parser');
const session = require('express-session');
const Sequelize = require('sequelize');

//Configure server
const server = express();

//Body-parser and express-session
server.use(bodyparser.urlencoded({ extended: false }));
server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

//Configure mustache
server.engine("mustache", mustache());
server.set("views", "./views");
server.set("view engine", "mustache");

//Routes
const routes = require('./routes')
const gabble = require('./gabble');

//Configure Routes
routes(server);

//Server
server.listen(5000);
	console.log('yeet');


