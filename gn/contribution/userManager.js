/**
 * Created by ly on 2018/1/6.
 */
/*global mongodb TempMongoDb*/

const co = require("co");
const common = require("../common/common");
const userDao = require("../dao/userDao")

function userLogin(userId, p, callback) {
    co(function* () {
        console.log(userId, p)
        callback({ ti: "mgtLevel" });
    }).catch(function (err) {
        callback(err);
    });
}

module.exports = {
    userLogin,
};