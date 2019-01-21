import common from '../common/common.js';

let user = {
  login: function (loginName, password) {
    const promise = new Promise((resolve, reject) => {
      common.ajaxPost('/user/userLogin', {
        loginName: loginName,
        pw: password
      }, result => {
        resolve(result);
      })
    });
    return promise;
  },
  getKey: function (vm) {
    const promise = new Promise((resolve, reject) => {
      common.ajaxPost('/user/getKey', {}, result => {
        resolve(result);
      })
    });
    return promise;
  }
}

export default user;
