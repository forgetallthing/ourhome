var fs = require('fs');
var com = require('./common');

exports.buildErrMsg = function (s) {
    if (typeof s == "object") {
        com.err(s);
    }
    return { state: 0, value: s.message ? s.message : s };
};

exports.buildSuccessMsg = function (s) {
    return { state: 1, value: s };
};