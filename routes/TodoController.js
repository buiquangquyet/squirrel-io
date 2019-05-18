var express = require('express');
var router = express.Router();
var expressLayouts = require('express-ejs-layouts');
var fileUpload = require('express-fileupload');
var Mylibrary = require('./../library/Mylibrary');
var config = require('./../config');
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var Todos = require("../models/todoModel");
var UserModel = require("../models/UserModel");
var { check, validationResult } = require('express-validator/check');

var app = express();
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout/master');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res, next) {
    var data = {
        title: 'Todo',
    };
    res.render('Todo/IndexView', data);
});

module.exports = app;