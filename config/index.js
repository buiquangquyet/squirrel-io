var configValues = require("./config");
module.exports= {
    getDbConnectionString:function () {
        console.log('123123123');
        return `mongodb://127.0.0.1:27017/test/`;
    }
}