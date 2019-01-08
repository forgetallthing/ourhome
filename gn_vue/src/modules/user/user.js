import common from '../common/common.js';

let user = {
    login: function (loginName, password) {
        const promise = new Promise(function (resolve, reject) {
            common.ajaxPost('//localhost:3000/user/userLogin', { loginName: loginName, pw: password }, function (result) {
                console.log(result)
                resolve(result);
            })
        });
        return promise;
    }
}

export default user;