class Mylibrary {
    constructor(){
        
    }
    GennerateString(number){
        var crypto = require("crypto");
        var random_name = crypto.randomBytes(number).toString('hex');
        return random_name;
    }

}