"use strict";

function getUserCollection() {
    return global.mongodb.collection("us_user");
}

function getUserInfo(filter, callback) {
    getUserCollection().findOne(filter, callback);
}

module.exports = {
    getUserInfo,
};