<template>
  <div style="height:100%">
    <div class="talk">
      <div v-for="(item,index) in chat_list" :key='index'>
        <div v-if="item.id && item.id!=socketId" class="mes-contain">
          <img class="userPhoto userPhoto-left" :src="item.photo" alt="">
          <div class="userName userName-left">{{item.name}}</div>
          <div class="userMes userMes-left">{{item.mes}}</div>
          <br style='clear:both' />
        </div>
        <div v-else-if="item.id && item.id==socketId" class="mes-contain">
          <img class="userPhoto userPhoto-right" :src="item.photo" alt="">
          <div class="userName userName-right">{{item.name}}</div>
          <div class="userMes userMes-right">{{item.mes}}</div>
          <br style='clear:both' />
        </div>
        <div class="broad" v-else-if="item.into">
          <span class="broad-text">{{item.name}}闪亮登场!!!</span>
        </div>
        <div class="broad" v-else>
          <span class="broad-text">{{item.name}}夹着尾巴逃了</span>
        </div>
      </div>
      <div id="msg_end" style="height:0px; overflow:hidden"></div>
    </div>
    <el-input class="mes-content" type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
    </el-input>
    <div class="mes-set">
      <span>当前在线：{{onlineTotal}}</span>
      <el-switch class="mes-swich" @change='connect' v-model="wsStateValue" :inactive-text='wsState' active-color="#13ce66" inactive-color="#0089A7">
      </el-switch>
      <el-button class="mes-send" size='small' @click="send" type="primary">send</el-button>
    </div>
  </div>
</template>

<script>
import SocketIO from "socket.io-client";
export default {
  props: {},
  name: "socket",
  data() {
    return {
      wsStateValue: false,
      textarea: "",
      socked: null,
      chat_list: [],
      wsState: "已关闭:",
      userNickname: null,
      socketId: undefined,
      userPhoto: null,
      onlineTotal: 0,
      photoList: [
        "../../static/man.png",
        "../../static/women.png",
        "../../static/child.png",
        "../../static/fiwomen.png"
      ]
    };
  },
  computed: {},
  created() {},
  mounted() {
    let that = this;
    document.onkeydown = function(e) {
      if (!e) {
        e = window.event;
      }
      if ((e.keyCode || e.which) == 13) {
        that.send();
        return false;
      }
    };
  },
  watch: {},
  methods: {
    connect() {
      //随机头像
      if (!this.userPhoto) {
        let random = Math.floor(Math.random() * 4);
        this.userPhoto = this.photoList[random];
      }
      if (this.wsStateValue) {
        this.wsState = "已连接:";
        if (!this.userNickname) {
          this.openUserNicknameInput();
        } else {
          let socketUrl = "http://ipromiseyourlife.com:9999";
          // let socketUrl = "http://localhost:9999";
          this.socket = SocketIO(socketUrl, {
            forceNew: false
          });
          let that = this;
          this.socket.on("connect", () => {
            this.socketId = this.socket.id;
          });
          this.socket.emit("join", { name: this.userNickname });
          this.socket.on("message", function(message) {
            that.showMes(message);
          });
          this.socket.on("joinNoticeSelf", function(message) {
            that.onlineTotal = message.count;
          });
          this.socket.on("joinNoticeOther", function(message) {
            that.showMes(message);
            that.onlineTotal = message.count;
          });
          this.socket.on("disconnection", function(message) {
            that.showMes(message);
            that.onlineTotal = message.count;
          });
        }
      } else {
        this.socket.close();
        this.socket = null;
        this.onlineTotal = 0;
        this.chat_list = [];
        this.wsState = "已关闭:";
        this.userPhoto = null;
        this.userNickname = null;
      }
    },
    send() {
      if (!this.textarea) {
        this.$message({
          type: "info",
          message: "请多少输入点啥吧~"
        });
      } else if (this.socket) {
        const message = {
          id: this.socketId,
          name: this.userNickname,
          mes: this.textarea,
          time: new Date(),
          photo: this.userPhoto
        };
        this.socket.send(message);
        this.textarea = null;
      } else {
        this.$message({
          type: "info",
          message: "您还没进入聊天室~"
        });
      }
    },
    showMes(message) {
      this.chat_list.push(message);
      this.$nextTick(function() {
        msg_end.scrollIntoView();
      });
    },
    openUserNicknameInput() {
      this.$prompt("请输入聊天昵称", "GN在线", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\W\w]*?/,
        inputErrorMessage: "昵称格式不正确"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的昵称是: " + value
          });
          this.userNickname = value;
          this.connect();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入,没有昵称无法进入哦~"
          });
          this.wsState = "已关闭:";
          this.wsStateValue = false;
        });
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.talk {
  width: 100%;
  height: 80%;
  overflow-y: scroll;
  border: 1px solid #cccccc;
}
.mes-content {
  margin-top: 12px;
}
.mes-set {
  margin-top: 10px;
}
.mes-swich {
  margin: 6px 20px;
}
.mes-send {
  float: right;
  width: 150px;
  height: 40px;
  background-color: #0089a7;
  font-size: 18px;
}
.mes-contain {
  width: 96%;
  height: auto;
  margin: 22px 2%;
  position: relative;
}
.broad {
  text-align: center;
  font-size: 16px;
  color: #255359;
  margin: 15px 0;
}
.broad-text {
  display: inline-block;
  padding: 5px 5px;
  background: #cccccc;
  border-radius: 8%;
}
.userPhoto {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
}
.userName {
  margin: 10px 16px;
  font-size: 16px;
  color: #26453d;
  width: calc(100% - 120px);
}
.userMes {
  margin: 0 15px;
  background-color: #a5dee4;
  padding: 16px 19px;
  border-radius: 8%;
  max-width: 36%;
  word-wrap: break-word;
  font-size: 16px;
  line-height: 22px;
}
.userPhoto-left,
.userName-left,
.userMes-left {
  float: left;
}
.userPhoto-right,
.userName-right,
.userMes-right {
  float: right;
}
.userName-right {
  text-align: right;
}
</style>
