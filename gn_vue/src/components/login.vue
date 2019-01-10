<template>
    <div class="hello">
        <div class='bg'></div>
        <div class='marker'>GN | 通行证</div>
        <div class='title'>GN科技管理平台</div>
        <div class='banner'>管理GN旗下各项系统以及相关服务</div>
        <div class='block' v-show="flag=='login'">
            <el-tabs v-model="login_active">
                <el-tab-pane label="密码登录" name="first">
                    <el-form label-position="left" label-width="40px" :model="form">
                        <el-form-item label="账号">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class='float_right' style='width:298px;' type="primary" @click="onSubmit">登录</el-button>
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
                            <el-button class='float_right' style='width:298px;' type="primary" @click="onSubmit">登录</el-button>
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
export default {
  name: "login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.regiform.checkPass !== "") {
          this.$refs.regiform.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.regiform.pass) {
        callback(new Error("两次输入密码不一致!"));
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
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      getpass: {
        name: "",
        email: ""
      },
      checked: true
    };
  },
  methods: {
    onSubmit() {
      user.login(this.form.name, this.form.password).then(res => {
        console.log(res);
      });
    },
    to_forgetpass() {
      this.flag = "forgetpass";
    },
    to_register() {
      this.flag = "register";
    },
    to_login() {
      this.flag = "login";
    },
    register() {},
    getnewpass() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 100%;
}
.bg {
  width: 100%;
  height: 100%;
  background-image: url("../assets/bg.jpg");
  background-size: cover;
  position: relative;
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
  padding: 15px 25px;
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
  padding: 15px 25px;
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
  margin-left: -150px;
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
