const co = require("co");
const common = require("../common/common");
const userDao = require("../dao/userDao");
const ws = require("ws");

function getKey(userId, p, callback) {
    let key = "";
    for (let i = 0; i < 8; ++i) {
        key += String.fromCharCode(65 + Math.round(Math.random() * 26));
    }
    callback(0, {
        key: key
    });
}

function userLogin(userId, p, callback) {
    co(function* () {
        console.log(userId, p)
        let user = yield common.toPromise(userDao.getUserInfo, {
            userName: p,
            password: p
        });
        callback(0, {
            OK: "mgtLevel"
        });
    }).catch(function (err) {
        callback(err);
    });
}

function test(userId, p, callback) {
    co(function* () {
       
        callback(0, {
            OK: "mgtLevel"
        });
    }).catch(function (err) {
        callback(err);
    });
}

module.exports = {
    userLogin,
    getKey,
    test,
};