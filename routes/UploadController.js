var express = require('express');
var fileUpload = require('express-fileupload');


var app = express();
app.use(fileUpload());

app.post('/', function (req, res) {
    let sampleFile = req.files.file;
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


    var data = {
        message: 'Success',
        code: 200,
        data: {
            image: pathnametoshow,
        }
    }

    return res.status(200).json(data);

});





module.exports = app;