var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname   : String,
    lastname    : String,
    username    : String,
    avatar      : String,
    password    : String,
    email       : String,
    update_at   :String,
})
var UserModel = mongoose.model('UserModel', UserSchema);
UserModel.findUserByEmail= function (email) {
    console.log('email:'+email);
    UserModel.findOne({'email':email},function (err,user) {
        console.log('user :'+ user);
        return user;
    });
}
module.exports = UserModel;