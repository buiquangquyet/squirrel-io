var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
var todoSchema = new Schema({
    title:String,
    datetime:String,
    value:String,
    image:String,
    create_time:String
})

var Todos = mongoose.model('Todos',todoSchema);
module.exports = Todos;