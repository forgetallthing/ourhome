"use strict";
/*global dhtmlXWindows dhtmlx dhtmlXPopup*/
function registerMessage(callback) {
    parent.registerMessage(callback);
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function setCookie(c_name, value, expiredays) {
    var exDate = new Date();
    exDate.setDate(exDate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exDate.toGMTString());
}

var ContextUrl = "";

function buildUrl(u) {
    if (u.charAt(0) == "/") {
        return ContextUrl + u;
    }
    return u;
}

function msgAlert(r) {
    var v = window;
    while (v.parent != v) {
        v = v.parent;
    }
    v.dhtmlx.message({
        title: "提示",
        type: "alert-warning",
        text: r
    });
}

function Base64() {

    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function(input) {
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
    this.decode = function(input) {
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
    var _utf8_encode = function(string) {
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
    var _utf8_decode = function(utftext) {
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

//克隆json
function cloneJson(t) {
    return JSON.parse(JSON.stringify(t));
}

function genId() {
    return "ID_" + (new Date()).getTime() + parseInt(Math.random() * 10000);
}

function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (Array.isArray(obj)) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; ++i) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    //if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
    // }

    // throw new Error("Unable to copy obj! Its type isn't supported.");
}

//Polyfill
if (!Array.prototype.map) {

    Array.prototype.map = function(callback, thisArg) {

        var T, A, k;

        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }

        // 1. Let O be the result of calling ToObject passing the |this|
        //    value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get internal
        //    method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 1) {
            T = thisArg;
        }

        // 6. Let A be a new array created as if by the expression new Array(len)
        //    where Array is the standard built-in constructor with that name and
        //    len is the value of len.
        A = new Array(len);

        // 7. Let k be 0
        k = 0;

        // 8. Repeat, while k < len
        while (k < len) {

            var kValue, mappedValue;

            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty internal
            //    method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {

                // i. Let kValue be the result of calling the Get internal
                //    method of O with argument Pk.
                kValue = O[k];

                // ii. Let mappedValue be the result of calling the Call internal
                //     method of callback with T as the this value and argument
                //     list containing kValue, k, and O.
                mappedValue = callback.call(T, kValue, k, O);

                // iii. Call the DefineOwnProperty internal method of A with arguments
                // Pk, Property Descriptor
                // { Value: mappedValue,
                //   Writable: true,
                //   Enumerable: true,
                //   Configurable: true },
                // and false.

                // In browsers that support Object.defineProperty, use the following:
                // Object.defineProperty(A, k, {
                //   value: mappedValue,
                //   writable: true,
                //   enumerable: true,
                //   configurable: true
                // });

                // For best browser support, use the following:
                A[k] = mappedValue;
            }
            // d. Increase k by 1.
            k++;
        }

        // 9. return A
        return A;
    };
}

if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
        if (this === null) {
            throw new TypeError("Array.prototype.find called on null or undefined");
        }
        if (typeof predicate !== "function") {
            throw new TypeError("predicate must be a function");
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}

if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function(predicate) {
        if (this === null) {
            throw new TypeError("Array.prototype.findIndex called on null or undefined");
        }
        if (typeof predicate !== "function") {
            throw new TypeError("predicate must be a function");
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return i;
            }
        }
        return -1;
    };
}

if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === "[object Array]";
    };
}

if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    };
}

function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}

function toDateString(utc) {
    if (utc) {
        var date = new Date(utc);
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return date.getFullYear() + "-" + (m > 9 ? m : "0" + m) + "-" + (d > 9 ? d : "0" + d);
    } else {
        return "";
    }
}

function toDateTimeString(utc) {
    if (utc) {
        var date = new Date(utc);
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var i = date.getMinutes();
        var s = date.getSeconds();
        return date.getFullYear() + "-" + (m > 9 ? m : "0" + m) + "-" + (d > 9 ? d : "0" + d) + " " +
            (h > 9 ? h : "0" + h) + ":" + (i > 9 ? i : "0" + i) + ":" + (s > 9 ? s : "0" + s);
    } else {
        return "";
    }
}

function arraySync(bsFunc, ar) {
    var callback = arguments[arguments.length - 1];
    if (ar.length == 0) {
        callback("", []);
        return;
    }
    var sendErr = false;
    var finishNum = ar.length;
    var result = [];
    var args = [0, 0];
    for (var index = 2; index < arguments.length - 1; ++index) {
        args.push(arguments[index]);
    }
    args.push(function(err, r) {
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
            callback("", result);
        }
    });

    for (var i = 0; i < ar.length; ++i) {
        args[0] = ar[i];
        args[1] = i;
        bsFunc.apply(null, args);
    }
}

if (!window.JSON) {
    window.JSON = {
        parse: function(sJSON) {
            return eval("(" + sJSON + ")");
        },
        stringify: (function() {
            var toString = Object.prototype.toString;
            var isArray = Array.isArray || function(a) {
                return toString.call(a) === "[object Array]";
            };
            var escMap = { "\"": "\\\"", "\\": "\\\\", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "\t": "\\t" };
            var escFunc = function(m) {
                return escMap[m] || "\\u" + (m.charCodeAt(0) + 0x10000).toString(16).substr(1);
            };
            var escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
            return function stringify(value) {
                if (value == null) {
                    return "null";
                } else if (typeof value === "number") {
                    return isFinite(value) ? value.toString() : "null";
                } else if (typeof value === "boolean") {
                    return value.toString();
                } else if (typeof value === "object") {
                    if (typeof value.toJSON === "function") {
                        return stringify(value.toJSON());
                    } else if (isArray(value)) {
                        var res = "[";
                        for (var i = 0; i < value.length; i++)
                            res += (i ? ", " : "") + stringify(value[i]);
                        return res + "]";
                    } else if (toString.call(value) === "[object Object]") {
                        var tmp = [];
                        for (var k in value) {
                            if (value.hasOwnProperty(k))
                                tmp.push(stringify(k) + ": " + stringify(value[k]));
                        }
                        return "{" + tmp.join(", ") + "}";
                    }
                }
                return "\"" + value.toString().replace(escRE, escFunc) + "\"";
            };
        })()
    };
}
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

    Array.prototype.forEach = function(callback, thisArg) {

        var T, k;

        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }

        // 1. Let O be the result of calling toObject() passing the
        // |this| value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get() internal
        // method of O with the argument "length".
        // 3. Let len be toUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If isCallable(callback) is false, throw a TypeError
        // exception. // See: http://es5.github.com/#x9.11
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }

        // 5. If thisArg was supplied, let T be thisArg; else let
        // T be undefined.
        if (arguments.length > 1) {
            T = thisArg;
        }

        // 6. Let k be 0
        k = 0;

        // 7. Repeat, while k < len
        while (k < len) {

            var kValue;

            // a. Let Pk be ToString(k).
            //    This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty
            //    internal method of O with argument Pk.
            //    This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {

                // i. Let kValue be the result of calling the Get internal
                // method of O with argument Pk.
                kValue = O[k];

                // ii. Call the Call internal method of callback with T as
                // the this value and argument list containing kValue, k, and O.
                callback.call(T, kValue, k, O);
            }
            // d. Increase k by 1.
            k++;
        }
        // 8. return undefined
    };
}

function getBrowser() {
    var _window = window || {};
    var _navigator = navigator || {};
    var u = _navigator.userAgent;
    var _this = {};

    var match = {
        //内核
        "Trident": u.indexOf("Trident") > -1 || u.indexOf("NET CLR") > -1,
        "Presto": u.indexOf("Presto") > -1,
        "WebKit": u.indexOf("AppleWebKit") > -1,
        "Gecko": u.indexOf("Gecko/") > -1,
        //浏览器
        "Safari": u.indexOf("Safari") > -1,
        "Chrome": u.indexOf("Chrome") > -1 || u.indexOf("CriOS") > -1,
        "IE": u.indexOf("MSIE") > -1 || u.indexOf("Trident") > -1,
        "Edge": u.indexOf("Edge") > -1,
        "Firefox": u.indexOf("Firefox") > -1 || u.indexOf("FxiOS") > -1,
        "Firefox Focus": u.indexOf("Focus") > -1,
        "Chromium": u.indexOf("Chromium") > -1,
        "Opera": u.indexOf("Opera") > -1 || u.indexOf("OPR") > -1,

    };
    //修正
    if (match["Mobile"]) {
        match["Mobile"] = !(u.indexOf("iPad") > -1);
    } else if (_window.showModalDialog && _window.chrome) {
        match["360"] = true;
    }
    //基本信息
    var hash = {
        engine: ["WebKit", "Trident", "Gecko", "Presto"],
        browser: ["Safari", "Chrome", "Edge", "IE", "Firefox", "Firefox Focus", "Chromium", "Opera", "Vivaldi", "Yandex", "Kindle", "360", "UC", "QQBrowser", "QQ", "Baidu", "Maxthon", "Sogou", "LBBROWSER", "2345Explorer", "TheWorld", "XiaoMi", "Quark", "Qiyu", "Wechat", "Taobao", "Alipay", "Weibo", "Suning", "iQiYi"],
        os: ["Windows", "Linux", "Mac OS", "Android", "Ubuntu", "FreeBSD", "Debian", "iOS", "Windows Phone", "BlackBerry", "MeeGo", "Symbian", "Chrome OS", "WebOS"],
        device: ["Mobile", "Tablet"]
    };

    for (var s in hash) {
        for (var i = 0; i < hash[s].length; i++) {
            var value = hash[s][i];
            if (match[value]) {
                _this[s] = value;
            }
        }
    }

    //浏览器版本信息
    var version = {
        "Safari": function() {
            return u.replace(/^.*Version\/([\d.]+).*$/, "$1");
        },
        "Chrome": function() {
            return u.replace(/^.*Chrome\/([\d.]+).*$/, "$1").replace(/^.*CriOS\/([\d.]+).*$/, "$1");
        },
        "IE": function() {
            return u.replace(/^.*MSIE ([\d.]+).*$/, "$1").replace(/^.*rv:([\d.]+).*$/, "$1");
        },
        "Edge": function() {
            return u.replace(/^.*Edge\/([\d.]+).*$/, "$1");
        },
        "Firefox": function() {
            return u.replace(/^.*Firefox\/([\d.]+).*$/, "$1").replace(/^.*FxiOS\/([\d.]+).*$/, "$1");
        },
        "Firefox Focus": function() {
            return u.replace(/^.*Focus\/([\d.]+).*$/, "$1");
        },
        "Chromium": function() {
            return u.replace(/^.*Chromium\/([\d.]+).*$/, "$1");
        },
        "Opera": function() {
            return u.replace(/^.*Opera\/([\d.]+).*$/, "$1").replace(/^.*OPR\/([\d.]+).*$/, "$1");
        }
    };
    _this.version = "";
    if (version[_this.browser]) {
        _this.version = version[_this.browser]();
        if (_this.version == u) {
            _this.version = "";
        }
    }
    //修正
    if (_this.browser == "Edge") {
        _this.engine = "EdgeHTML";
    } else if (_this.browser == "Chrome" && parseInt(_this.version) > 27) {
        _this.engine = "Blink";
    } else if (_this.browser == "Opera" && parseInt(_this.version) > 12) {
        _this.engine = "Blink";
    } else if (_this.browser == "Yandex") {
        _this.engine = "Blink";
    }
    return _this;
}

