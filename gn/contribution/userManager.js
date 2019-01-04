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
        let user = yield common.toPromise(userDao.getUserInfo, { userName: p, password: p });
        callback(0, { OK: "mgtLevel" });
    }).catch(function (err) {
        callback(err);
    });
}

module.exports = {
    userLogin,
};