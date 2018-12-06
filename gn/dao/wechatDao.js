"use strict";

function getWechatCollection() {
    return global.mongodb.collection("wechat");
}


function setWechatUserInfo(data, callback) {
    getWechatCollection().insertOne(data, callback);
}

module.exports = {
    setWechatUserInfo,
};