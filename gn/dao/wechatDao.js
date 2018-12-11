"use strict";

function getWechatCollection() {
    return global.mongodb.collection("wechat");
}

function getWechatPayCollection() {
    return global.mongodb.collection("wechat_pay");
}

function setWechatUserInfo(data, callback) {
    getWechatCollection().updateOne({ 'openid': data.openid }, { $set: data }, { upsert: true }, callback);
}

function setWechatPayInfo(data, callback) {
    getWechatPayCollection().updateOne({ 'out_trade_no': data.out_trade_no }, { $set: data }, { upsert: true }, callback);
}

module.exports = {
    setWechatUserInfo,
    setWechatPayInfo,
};