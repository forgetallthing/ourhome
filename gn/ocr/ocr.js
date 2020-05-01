const tesseract = require('tesseract.js');
const tesseract2 = require('node-tesseract');

//图片识别
function tesseractPng() {
    console.log(1);
    tesseract.recognize("./test/t3.png", {
            lang: 'chi_sim',
        })
        .then(function (result) {
            console.log(result)
        })
}

function tesseractPng2() {
    console.log(__dirname + '\\test\\t.png');
    var options = {
        l: 'chi_sim',
        // psm: 6,
    };

    tesseract2.process(__dirname + '\\test\\t3.png', options, function (err, text) {
        if (err) {
            console.error(err);
        } else {
            console.log(text);
        }
    });
}

module.exports = {
    tesseractPng,
    tesseractPng2,
};