"use strict";

const common = require("../common/common");
const msg = require("../common/message");
const routerMap = {
    user: {
        // routerFile: require("./ncc"),`````````````
        manager: require("../contribution/userManager"),
        router: {
            userLogin: { method: "post" },
            // removeTotalCheck: { arg: ["userId", "userLogin", "p"] },
            // exportExcel: {
            //     ret: function (res, err, r) {
            //         if (err) {
            //             res.send(err);
            //         } else {
            //             res.setHeader("Content-disposition", "attachment; filename=" + encodeURIComponent(r.fileName));
            //             res.writeHead(200, { "Content-Type": "application/octet-stream" });
            //             r.rs.on("end", function () {
            //                 res.end();
            //             });
            //             r.rs.pipe(res);
            //         }
            //     }
            // }
        }
    },
};

let routers = [];

for (let k in routerMap) {
    let routerSetting = routerMap[k];
    let router;
    if (routerSetting.routerFile) {
        router = routerSetting.routerFile;
    } else {
        const express = require("express");
        router = express.Router();
    }
    ((setting, r) => {
        for (let path in setting.router) {
            let rn = setting.router[path];
            if (!rn.manager) {
                rn.manager = setting.manager;
            }
            if (!rn.path) {
                rn.path = path;
            }
            if (!rn.method) {
                rn.method = "get";
            }
            if (!rn.funcName) {
                rn.funcName = path;
            }
            if (!rn.arg) {
                rn.arg = ["userId", "p"];
            }
            (rn => {
                r[rn.method]("/" + rn.path, function (req, res) {
                    if(!req.session){
                        res.send(msg.buildErrMsg({message:"您没有登录~"}));
                        return;
                    }
                    let argVal = {
                        userId: req.session.userId,
                        userLogin: req.session.userLogin,
                        menuId: req.session.menuId,
                    };
                    argVal.p = req[rn.method == "get" ? "query" : "body"].p;
                    argVal.puserid = common.clone(argVal.p);
                    argVal.puserid.userid = argVal.userId;
                    let arg = rn.arg.map(v => argVal[v]);
                    arg.push(rn.ret ? (err, r) => {
                        rn.ret(res, err, r);
                    } : (err, r) => {
                        if (err) {
                            res.send(msg.buildErrMsg(err));
                        } else {
                            res.send(msg.buildSuccessMsg(r));
                        }
                    });
                    rn.manager[rn.funcName](...arg);
                });
            })(rn);
        }
    })(routerSetting, router);
    routers.push({ path: k, r: router });
}

module.exports = routers;