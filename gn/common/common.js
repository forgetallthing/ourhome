/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* global bayeux*/
const config = require("./config");
const fs = require("fs");

exports.genId = function () {
    return "ID_" + (new Date()).getTime() + parseInt(Math.random() * 10000);
};

exports.clone = function (obj) {
    var result = {},
        oClass = isClass(obj);
    if (oClass === "Object") {
        result = {};
    } else if (oClass === "Array") {
        result = [];
    } else {
        return obj;
    }
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var copy = obj[key];
            if (isClass(copy) == "Object") {
                result[key] = arguments.callee(copy);
            } else if (isClass(copy) == "Array") {
                result[key] = arguments.callee(copy);
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
};

function isClass(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
}

exports.arraySync = function (bsFunc, ar) {
    var callback = arguments[arguments.length - 1];
    if (ar.length == 0) {
        callback(0, []);
        return;
    }
    var sendErr = false;
    var finishNum = ar.length;
    var result = [];
    var args = [0, 0];
    for (var index = 2; index < arguments.length - 1; ++index) {
        args.push(arguments[index]);
    }
    args.push(function (err, r) {
        if (err) {
            if (!sendErr) {
                sendErr = true;
                callback(err);
            }
            return;
        }
        --finishNum;
        result[r.i] = r.v;
        if (finishNum == 0) {
            callback(0, result);
        }
    });

    for (var i = 0; i < ar.length; ++i) {
        args[0] = ar[i];
        args[1] = i;
        bsFunc.apply(null, args);
    }
};

function toPromise() {
    var f = arguments[0];
    var a = Array.prototype.slice.call(arguments, 1);

    return new Promise(function (resolve, reject) {
        a.push(function (err, r) {
            if (err) {
                reject(err);
            } else {
                resolve(r);
            }
        });
        f.apply(null, a);
    });
}

exports.toPromise = toPromise;
exports.err = function (err) {
    if (err && err.stack) {
        console.error(err.stack);
    } else if (err.message) {
        console.error(err.message);
    }
    var errFile = config.errLog;
    fs.appendFile(errFile, Date.now() + "\t" + (err.stack ? err.stack : err.message) + "\r\n", function (err) {
        if (err) {
            console.error(err);
        }
    });
};

exports.getRandom = function () {
    return Math.floor(Math.random() * config._RandomLimit);
};

exports.sendMessage = function (userId, message) {
    let c = bayeux.getClient();
    c.publish("/selfMessage/" + userId, message);
};

exports.sendNotify = function (message, userId) {
    let c = bayeux.getClient();
    if (userId) {
        c.publish("/publishMessage/" + userId, message);
    } else {
        c.publish("/publishNotice", message);
    }

};

exports.sendUnReadMessageCount = function (userId, count) {
    let c = bayeux.getClient();
    c.publish("/unReadMessageCount/" + userId, count);
};

exports.isNull = function (v) {
    "use strict";
    return v === null || v === undefined || v === "";
};

exports.checkTimeRange = function (start, end) {
    let startTime = new Date(start).getTime(),
        endTime = new Date(end).getTime() + 86400000,
        cur_Time = new Date().getTime();
    return cur_Time > startTime && cur_Time < endTime;
};

exports.getDbUrl = function (cfg, dbName) {
    let url = [cfg.sys_mongo, "/", dbName];
    if (cfg.repSet) {
        url.push("?replicaSet=" + cfg.repSet);
    }
    return url.join("");
};