"use strict";

function getWechatCollection() {
    return global.mongodb.collection("wechat");
}


function setWechatUserInfo(data, callback) {
    getWechatCollection().update({ 'openid': data.openid }, { $set: data }, { upsert: true }, callback);
}

module.exports = {
    setWechatUserInfo,
};