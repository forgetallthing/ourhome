import common from '../common/common.js';

let user = {
    login: function (loginName, password) {
        const promise = new Promise(function (resolve, reject) {
            common.ajaxPost('/user/userLogin', { loginName: loginName, pw: password }, function (result) {
                resolve(result);
            })
        });
        return promise;
    },
    getKey: function (loginName, password) {
        const promise = new Promise(function (resolve, reject) {
            common.ajaxPost('/user/getKey', {}, function (result) {
                resolve(result);
            })
        });
        return promise;
    }
}

export default user;