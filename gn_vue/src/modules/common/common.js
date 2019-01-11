import axios from "axios";
import qs from "qs";

let c = {
    baseURL: '//localhost:3000/',
    ajaxGet: (url, data, callback) => {
        if (Object.prototype.toString.call(data) !== "[object Object]") return;
        let b = new c.Base64();
        axios({
            method: 'get',
            baseURL: c.baseURL,
            url: url,
            params: { i: 1, p: encodeURIComponent(b.encode(JSON.stringify(data))) }
        }).then(function (result) {
            let r = result.data;
            if (r.state == 0) {
                if (typeof r == "object") {
                    this.$alert(JSON.stringify(r.value), '似乎出了点问题', {
                        confirmButtonText: '明白了',
                    });
                } else {
                    this.$alert(r.value, '似乎出了点问题', {
                        confirmButtonText: '明白了',
                    });
                }
                callback(0);
            } else if (r.state == 1) {
                callback(r.value);
            } else {
                console.error(result)
                callback(0);
            }
        }).catch(function (error) {
            console.error(error);
            callback(0);
        });
    },
    ajaxPost: (url, data, callback) => {
        if (Object.prototype.toString.call(data) !== "[object Object]") return;
        let b = new c.Base64();
        axios({
            method: 'post',
            baseURL: c.baseURL,
            url: url,
            data: qs.stringify({ i: 1, p: encodeURIComponent(b.encode(JSON.stringify(data))) })
        }).then(function (result) {
            let r = result.data;
            if (r.state == 0) {
                if (typeof r == "object") {
                    this.$alert(JSON.stringify(r.value), '似乎出了点问题', {
                        confirmButtonText: '明白了',
                    });
                } else {
                    this.$alert(r.value, '似乎出了点问题', {
                        confirmButtonText: '明白了',
                    });
                }
                callback(0);
            } else if (r.state == 1) {
                callback(r.value);
            } else {
                console.error(result)
                callback(0);
            }
        }).catch(function (error) {
            console.error(error);
            callback(0);
        });
    },
    Base64() {
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
};

export default c;