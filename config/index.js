var configValues = require("./config");
module.exports= {
    getDbConnectionString:function () {
        console.log('123123123');
        return `mongodb://localhost:27017/admin/`;
    }
}