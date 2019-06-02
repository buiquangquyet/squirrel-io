var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var userRouter = require('./routes/UserController');
var todoRouter = require('./routes/TodoController');
var path = require('path');


app.get('/', function (req, res) {
    res.redirect('/todo');
    //res.send('<h1>Hello world</h1>');
});

var msg = {
    title: 'facebook',
    content: 'Có một lời mời kết bạn'
}
io.on('connection', function (socket) {
    console.log('an user connected');
    socket.emit('push-notify', 'push-notify :connection');
    socket.emit('newclientconnect', { description:' clients connected!' })
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
console.log(config.getDbConnectionString());
mongoose.connect(config.getDbConnectionString());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);
app.use('/todo', todoRouter);

http.listen(3002, function () {
    console.log('listening on *:3002');
});
