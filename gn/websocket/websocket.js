const ws = require("socket.io");

//启动websockets
function startWebsocket() {
    const io = ws();
    let count = 0;
    io.on("connection", function (socket) {
        console.log("当前有用户连接");
        count++;
        console.log("count:" + count);
        let name = '';
        // 加入群聊
        socket.on("join", function (message) {
            console.log(message);
            name = message.name;
            console.log(name + "加入了群聊");

            // 给公众发消息
            socket.broadcast.emit("joinNoticeOther", {
                id: message.id,
                name: name,
                action: "加入了群聊",
                count: count,
                into: true,
            });

            // 给自己发消息
            socket.emit("joinNoticeSelf", {
                count: count,
                id: message.id,
            });
        });

        // 接收客户端所发送的信息
        socket.on("message", function (message) {
            console.log(message);
            // 向所有客户端广播发布的消息
            io.emit("message", message);
        });

        //	 监听到连接断开
        socket.on("disconnect", function () {
            count--;
            console.log(name + "离开了群聊")
            io.emit("disconnection", {
                count: count,
                name: name
            });
        });

    });
    io.listen(9999);
    console.log("socket启动成功")
}

module.exports = {
    startWebsocket,
};