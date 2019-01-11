import common from '../common/common.js';
// this.$alert(123, '似乎出了点问题', {
//     confirmButtonText: '明白了',
// });
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