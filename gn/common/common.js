/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* global bayeux*/
const config = require("./config");
var path = require('path');
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
    fs.appendFile(path.join(__dirname, config.errLog), Date.now() + "\t" + (err.stack ? err.stack : err.message) + "\r\n", function (err) {
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

exports.Base64 = function () {
    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    };

    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    };

    // private method for UTF-8 encoding
    var _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    };

    // private method for UTF-8 decoding
    var _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c, c1, c2;
        c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                var c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    };
}