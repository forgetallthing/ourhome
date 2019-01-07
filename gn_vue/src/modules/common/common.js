import Axios from "axios";
import qs from "qs";

let c = {
    ok() {
        Axios.get('//localhost:3000/user/userLogin', {
            params: {
                ID: 12345
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    ajax: () => {
        Axios.post('//localhost:3000/user/userLogin', qs.stringify({ p: 1 }))
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
};

export default c;