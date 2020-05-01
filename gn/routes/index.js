let express = require('express');
let router = express.Router();
const config = require('../common/config');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render(config.HOME_PAGE);
});

router.get('/check', function (req, res, next) {
    console.log(req.query.echostr);
    res.send(req.query.echostr);
});

router.get('/test', function (req, res, next) {
    res.render('test');
});

var data = [
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 2, 3, 4],
];

router.get('/test1', function (req, res, next) {
    console.log(req.query);
    res.send({
        data: data,
        recordsFiltered: 100,
        recordsTotal: 100,
    });
});

module.exports = router;
