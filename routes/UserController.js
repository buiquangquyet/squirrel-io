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
app.use(fileUpload());


app.get('/', function (req, res, next) {
    var data = {
        title: 'Users',
    };
    res.render('User/IndexView', data);
});

app.post('/save', [
    // email must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
], function (req, res) {
    //TODO Validate form
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    //TODO Validate file
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    
    console.log(req);
    let sampleFile = req.files.image;
    
    var crypto = require("crypto");
    var random_name = crypto.randomBytes(10).toString('hex');
    console.log('random_name' + random_name);

    let pathnametoshow = '/media/' + random_name + '.jpg';
    let pathnametoupload = 'public/media/' + random_name + '.jpg';
    console.log('pathnametoupload' + pathnametoupload);
    sampleFile.mv(pathnametoupload, function (err) {
        if (err)
            return res.status(500).send(err);
        console.log('pathnametoshow:' + pathnametoshow);
        //res.send('File uploaded! :' + name);
    });
    var newuser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        avatar: pathnametoshow,
        password: req.body.password,
        email: req.body.email,
        update_at: new Date().toLocaleString(),
    }

    var user = new UserModel(newuser);

    var newUserdata = UserModel.findOne({ lastname: "quyetbq" }, function (err, adventure) {
        console.log(adventure);
    });

    console.log('newUserdata2');
    var newUserdata2 = UserModel.findUserByEmail('buiquangquyet@gmail.com');
    console.log(newUserdata2);
    user.save().then(() => console.log('add success'));
    var data = {
        message: 'Success',
        code: 200,
        data: {
            avatar: pathnametoshow,
            user: user,
        }
    }

    return res.status(200).json(data);
    res.send('File uploaded! :' + pathnametoshow);

})
module.exports = app;