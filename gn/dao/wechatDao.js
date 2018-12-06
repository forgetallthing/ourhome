"use strict";

function getWechatCollection() {
    return global.mongodb.collection("wechat");
}


function setWechatUserInfo(data, callback) {
    getWechatCollection().insertOne({
        imei: "1",
        user_id: "2",
        reg_time: "3",
        model: "model",
        telephone: "telephone",
        area_code: "areaCode"
    }, callback);
}

module.exports = {
    setWechatUserInfo,
};