<template>
    <div class="hello">
        <div class='bg'>
            <img id="bg" class="bg_img" src="data:image/jpeg;base64,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" alt="">
        </div>
        <div class='marker'>GN啊啊啊 | 通行证</div>
        <div class='title'>GN科技管理平台</div>
        <div class='banner'>管理GN旗下各项系统以及相关服务</div>
        <div class='block' v-show="flag=='login'">
            <el-tabs v-model="login_active">
                <el-tab-pane label="密码登录" name="first">
                    <el-form label-position="left" status-icon :rules="loginRules" ref="form" label-width="40px" :model="form">
                        <el-form-item label="账号" prop="name">
                            <el-input v-model="form.name" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="form.password" autocomplete="off" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class='float_right' style='width:298px;' type="primary" @click="login('form')">登录</el-button>
                        </el-form-item>
                        <el-row>
                            <el-col :span="15">
                                <el-checkbox v-model="checked">下次自动登录</el-checkbox>
                            </el-col>
                            <el-col :span="9">
                                <el-breadcrumb separator="/">
                                    <el-breadcrumb-item>
                                        <span class='cursor' @click="to_forgetpass()">忘记密码</span>
                                    </el-breadcrumb-item>
                                    <el-breadcrumb-item>
                                        <span class='cursor' @click="to_register()">注册</span>
                                    </el-breadcrumb-item>
                                </el-breadcrumb>
                            </el-col>
                        </el-row>
                        <el-row class='_textcenter font_14' style='margin-top:30px;margin-bottom:20px;color:gray;'>
                            第三方账号登录
                        </el-row>
                        <el-row type="flex" class="marginbottom_20" justify="space-around">
                            <el-col :span="4">
                                <div class='weixin'></div>
                            </el-col>
                            <el-col :span="4">
                                <div class='weibo'></div>
                            </el-col>
                            <el-col :span="4">
                                <div class='qq'></div>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="短信登录" name="second">
                    <el-form label-position="left" label-width="55px" :model="noteform">
                        <el-form-item label="手机号">
                            <el-input v-model="noteform.name"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码">
                            <el-input v-model="noteform.password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class='float_right' style='width:298px;' type="primary">登录</el-button>
                        </el-form-item>
                        <el-row>
                            <el-col :span="15">
                                <el-checkbox v-model="checked">下次自动登录</el-checkbox>
                            </el-col>
                            <el-col :span="9">
                                <el-breadcrumb separator="/">
                                    <el-breadcrumb-item>
                                        <span class='cursor' @click="forgetpass()">忘记密码</span>
                                    </el-breadcrumb-item>
                                    <el-breadcrumb-item>
                                        <span class='cursor' @click="register()">注册</span>
                                    </el-breadcrumb-item>
                                </el-breadcrumb>
                            </el-col>
                        </el-row>
                        <el-row class='_textcenter font_14' style='margin-top:30px;margin-bottom:20px;color:gray;'>
                            第三方账号登录
                        </el-row>
                        <el-row type="flex" class="marginbottom_20" justify="space-around">
                            <el-col :span="4">
                                <div class='weixin'></div>
                            </el-col>
                            <el-col :span="4">
                                <div class='weibo'></div>
                            </el-col>
                            <el-col :span="4">
                                <div class='qq'></div>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class='block1' v-show="flag=='register'">
            <el-tabs v-model="register_active">
                <el-tab-pane label="注册账号" name="first">
                    <el-form label-position="left" :rules="rules2" ref="regiform" status-icon label-width="68px" :model="regiform">
                        <el-form-item label="用户名">
                            <el-input v-model="regiform.name"></el-input>
                        </el-form-item>
                        <el-form-item prop="number" label="手机号" :rules="[{message: '手机号不能为空'},{ type: 'number', message: '请输入正确的手机号'}]">
                            <el-input v-model="regiform.phone"></el-input>
                        </el-form-item>
                        <el-form-item prop="email" label="邮箱" :rules="[{ message: '请输入邮箱地址', trigger: 'blur' },{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
                            <el-input v-model="regiform.email"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input type="password" v-model="regiform.pass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="regiform.checkPass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class='float_right' style='width:298px;' type="primary" @click="register()">注册</el-button>
                        </el-form-item>
                        <el-row class="marginbottom_20">
                            <el-col :span="11" :offset='13'>
                                <el-breadcrumb separator="/">
                                    <el-breadcrumb-item>
                                        <span class='cursor' @click="to_login()">已有账号，返回登录</span>
                                    </el-breadcrumb-item>
                                </el-breadcrumb>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class='block' v-show="flag=='forgetpass'">
            <el-tabs v-model="getpass_active">
                <el-tab-pane label="找回密码" name="first">
                    <el-form label-position="left" label-width="55px" :model="getpass">
                        <el-form-item label="用户名">
                            <el-input v-model="getpass.name"></el-input>
                        </el-form-item>
                        <el-form-item prop="email" label="邮箱" :rules="[{ message: '请输入邮箱地址', trigger: 'blur' },{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
                            <el-input v-model="getpass.email"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class='float_right' style='width:298px;' type="primary" @click="getnewpass()">找回密码</el-button>
                        </el-form-item>
                        <el-row class="marginbottom_20">
                            <el-col :span="6" :offset='18'>
                                <el-breadcrumb separator="/">
                                    <el-breadcrumb-item>
                                        <span class='cursor' @click="to_login()">返回登录</span>
                                    </el-breadcrumb-item>
                                </el-breadcrumb>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import user from "../modules/user/user.js";
let imgUrl = require("../assets/bg.jpg");
let imgObject = new Image();
imgObject.src = imgUrl;
imgObject.onload = function() {
  let ele = document.getElementById("bg");
  ele.src = imgUrl;
  ele.setAttribute("class", "bg_img complete");
};
export default {
  name: "login",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.regiform.checkPass !== "") {
          this.$refs.regiform.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.regiform.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    let validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("账号呢?"));
      } else {
        callback();
      }
    };
    let validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码呢?"));
      } else {
        callback();
      }
    };
    return {
      flag: "login",
      login_active: "first",
      register_active: "first",
      getpass_active: "first",
      form: {
        name: "",
        password: ""
      },
      noteform: {
        name: "",
        password: ""
      },
      regiform: {
        name: "",
        pass: "",
        phone: "",
        email: "",
        checkPass: ""
      },
      loginRules: {
        name: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      getpass: {
        name: "",
        email: ""
      },
      checked: true,
      key: ""
    };
  },
  methods: {
    login(formName) {
        this.$router.push({
            path:'/home'
        })
      if (!this.key) {
        this.$message.error("钥匙不见啦，请刷新重试");
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          user.login(this.form.name, this.form.password).then(res => {
            console.log(res);
            this.$router.push({ path:'/home'})
          });
        } else {
          return false;
        }
      });
    },
    to_forgetpass() {
      this.flag = "forgetpass";
    },
    to_register() {
      this.$message({
        showClose: true,
        message: "注册未开放",
        type: "warning"
      });
      //   this.flag = "register";
    },
    to_login() {
      this.flag = "login";
    },
    register() {},
    getnewpass() {},
    getKey() {
      user.getKey(this).then(res => {
        if (res) {
          this.key = res.key;
        }
      });
    }
  },
  created() {},
  mounted() {
    this.$nextTick(function() {
      this.getKey();
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello {
  width: 100%;
  height: 100%;
}
.bg {
  width: 100%;
  height: 100%;
  /* background-image: url("../assets/bg.jpg"); */
  /* background-size: cover; */
  position: relative;
  overflow: hidden;
}
.bg_img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(4px);
  transition: all 0.7s;
}
.complete {
  filter: blur(0);
}
.marker {
  width: 240px;
  height: 60px;
  /* background-image: url("../assets/logo.png");
  background-size: cover; */
  position: absolute;
  top: 36px;
  left: 6%;
  font-size: 32px;
  color: #fff;
}
.title {
  width: 300px;
  position: absolute;
  top: 90px;
  left: 50%;
  margin-left: -150px;
  font-size: 40px;
  color: #fff;
  text-align: center;
}
.banner {
  width: 500px;
  position: absolute;
  left: 50%;
  margin-left: -250px;
  top: 155px;
  font-size: 24px;
  color: #fff;
  text-align: center;
}
.block {
  width: 300px;
  background-color: #ffffff;
  padding: 15px 25px;
  border-radius: 3px;
  position: absolute;
  top: 250px;
  left: 50%;
  margin-left: -175px;
}
.block1 {
  width: 300px;
  background-color: #ffffff;
  padding: 15px 25px;
  border-radius: 3px;
  position: absolute;
  top: 150px;
  left: 50%;
  margin-left: -150px;
}
.weixin {
  width: 40px;
  height: 40px;
  background-size: 100% 100%;
  background-image: url("../assets/weixin.png");
}
.weixin:hover {
  background-image: url("../assets/weixin_green.png");
}
.weibo {
  width: 40px;
  height: 40px;
  background-size: 100% 100%;
  background-image: url("../assets/weibo.png");
}
.weibo:hover {
  background-image: url("../assets/weibo_red.png");
}
.qq {
  width: 40px;
  height: 40px;
  background-size: 100% 100%;
  background-image: url("../assets/qq.png");
}
.qq:hover {
  background-image: url("../assets/qq_blue.png");
}
</style>
