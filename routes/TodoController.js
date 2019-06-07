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
        title: 'Todo',
    };
    res.render('Todo/IndexView', data);
});

app.get('/getlist',function(req,res,next){

    var listTodo; 
    Todos.find({}, function(err, todos) {
        listTodo = todos;
        var data = {
            message: 'Success',
            code: 200,
            data: listTodo
        }
        return res.status(200).json(data);    
     });

    
});

app.post('/save',function(req, res){
    
    // if (Object.keys(req.files).length == 0) {
    //     return res.status(400).send('No files were uploaded.');
    // }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    // let sampleFile = req.files.image;
    // var crypto = require("crypto");
    // var random_name = crypto.randomBytes(10).toString('hex');
    // console.log('random_name' + random_name);

    // let pathnametoshow = '/media/' + random_name + '.jpg';
    // let pathnametoupload = 'public/media/' + random_name + '.jpg';
    // console.log('pathnametoupload' + pathnametoupload);
    // sampleFile.mv(pathnametoupload, function (err) {
    //     if (err)
    //         return res.status(500).send(err);
    //     console.log('pathnametoshow:' + pathnametoshow);
    //     //res.send('File uploaded! :' + name);
    // });
    

    

    
    var todo = {
        title: req.body.title,
        datetime: req.body.datetime,
        value: req.body.value_txt,
        image: req.body.image,
        create_time: new Date().toLocaleString()
    }

    var newtodo = new Todos(todo);
    newtodo.save().then(() => console.log('add success'));
    console.log(newtodo)
    

    var data = {
        message: 'Success',
        code: 200,
        data: {
            todo: todo,
        }
    }

    return res.status(200).json(data);

})

app.get('/delete/:id',function(req,res,next){
    var _id_delete=req.params.id;
    console.log(_id_delete);
    console.log(req.query.tagId);
    Todos.deleteOne({ _id: _id_delete}, function (err) {
        if (err) return handleError(err);
        // deleted at most one tank document
      });

    return res.status(200).json(_id_delete);
    
});

module.exports = app;