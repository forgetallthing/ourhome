webpackJsonp([0],{"+xnF":function(e,t){},K31e:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={name:"login",data:function(){var e=this;return{flag:"login",login_active:"first",register_active:"first",getpass_active:"first",form:{name:"",password:""},noteform:{name:"",password:""},regiform:{name:"",pass:"",phone:"",email:"",checkPass:""},rules2:{pass:[{validator:function(t,a,s){""===a?s(new Error("请输入密码")):(""!==e.regiform.checkPass&&e.$refs.regiform.validateField("checkPass"),s())},trigger:"blur"}],checkPass:[{validator:function(t,a,s){""===a?s(new Error("请再次输入密码")):a!==e.regiform.pass?s(new Error("两次输入密码不一致!")):s()},trigger:"blur"}]},getpass:{name:"",email:""},checked:!0}},methods:{onSubmit:function(){},to_forgetpass:function(){this.flag="forgetpass"},to_register:function(){this.flag="register"},to_login:function(){this.flag="login"},register:function(){},getnewpass:function(){}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"hello"},[a("div",{staticClass:"bg"}),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:"login"==e.flag,expression:"flag=='login'"}],staticClass:"block"},[a("el-tabs",{model:{value:e.login_active,callback:function(t){e.login_active=t},expression:"login_active"}},[a("el-tab-pane",{attrs:{label:"密码登录",name:"first"}},[a("el-form",{attrs:{"label-position":"left","label-width":"40px",model:e.form}},[a("el-form-item",{attrs:{label:"账号"}},[a("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"密码"}},[a("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),e._v(" "),a("el-form-item",[a("el-button",{staticClass:"float_right",staticStyle:{width:"298px"},attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("登录")])],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:15}},[a("el-checkbox",{model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},[e._v("下次自动登录")])],1),e._v(" "),a("el-col",{attrs:{span:9}},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("span",{staticClass:"cursor",on:{click:function(t){e.to_forgetpass()}}},[e._v("忘记密码")])]),e._v(" "),a("el-breadcrumb-item",[a("span",{staticClass:"cursor",on:{click:function(t){e.to_register()}}},[e._v("注册")])])],1)],1)],1),e._v(" "),a("el-row",{staticClass:"_textcenter font_14",staticStyle:{"margin-top":"30px","margin-bottom":"20px",color:"gray"}},[e._v("\n                      第三方账号登录\n                  ")]),e._v(" "),a("el-row",{staticClass:"marginbottom_20",attrs:{type:"flex",justify:"space-around"}},[a("el-col",{attrs:{span:4}},[a("div",{staticClass:"weixin"})]),e._v(" "),a("el-col",{attrs:{span:4}},[a("div",{staticClass:"weibo"})]),e._v(" "),a("el-col",{attrs:{span:4}},[a("div",{staticClass:"qq"})])],1)],1)],1),e._v(" "),a("el-tab-pane",{attrs:{label:"短信登录",name:"second"}},[a("el-form",{attrs:{"label-position":"left","label-width":"55px",model:e.noteform}},[a("el-form-item",{attrs:{label:"手机号"}},[a("el-input",{model:{value:e.noteform.name,callback:function(t){e.$set(e.noteform,"name",t)},expression:"noteform.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"验证码"}},[a("el-input",{model:{value:e.noteform.password,callback:function(t){e.$set(e.noteform,"password",t)},expression:"noteform.password"}})],1),e._v(" "),a("el-form-item",[a("el-button",{staticClass:"float_right",staticStyle:{width:"298px"},attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("登录")])],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:15}},[a("el-checkbox",{model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},[e._v("下次自动登录")])],1),e._v(" "),a("el-col",{attrs:{span:9}},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("span",{staticClass:"cursor",on:{click:function(t){e.forgetpass()}}},[e._v("忘记密码")])]),e._v(" "),a("el-breadcrumb-item",[a("span",{staticClass:"cursor",on:{click:function(t){e.register()}}},[e._v("注册")])])],1)],1)],1),e._v(" "),a("el-row",{staticClass:"_textcenter font_14",staticStyle:{"margin-top":"30px","margin-bottom":"20px",color:"gray"}},[e._v("\n                          第三方账号登录\n                      ")]),e._v(" "),a("el-row",{staticClass:"marginbottom_20",attrs:{type:"flex",justify:"space-around"}},[a("el-col",{attrs:{span:4}},[a("div",{staticClass:"weixin"})]),e._v(" "),a("el-col",{attrs:{span:4}},[a("div",{staticClass:"weibo"})]),e._v(" "),a("el-col",{attrs:{span:4}},[a("div",{staticClass:"qq"})])],1)],1)],1)],1)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:"register"==e.flag,expression:"flag=='register'"}],staticClass:"block1"},[a("el-tabs",{model:{value:e.register_active,callback:function(t){e.register_active=t},expression:"register_active"}},[a("el-tab-pane",{attrs:{label:"注册账号",name:"first"}},[a("el-form",{ref:"regiform",attrs:{"label-position":"left",rules:e.rules2,"status-icon":"","label-width":"68px",model:e.regiform}},[a("el-form-item",{attrs:{label:"用户名"}},[a("el-input",{model:{value:e.regiform.name,callback:function(t){e.$set(e.regiform,"name",t)},expression:"regiform.name"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"number",label:"手机号",rules:[{message:"手机号不能为空"},{type:"number",message:"请输入正确的手机号"}]}},[a("el-input",{model:{value:e.regiform.phone,callback:function(t){e.$set(e.regiform,"phone",t)},expression:"regiform.phone"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"email",label:"邮箱",rules:[{message:"请输入邮箱地址",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}]}},[a("el-input",{model:{value:e.regiform.email,callback:function(t){e.$set(e.regiform,"email",t)},expression:"regiform.email"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"密码"}},[a("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.regiform.pass,callback:function(t){e.$set(e.regiform,"pass",t)},expression:"regiform.pass"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"确认密码",prop:"checkPass"}},[a("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.regiform.checkPass,callback:function(t){e.$set(e.regiform,"checkPass",t)},expression:"regiform.checkPass"}})],1),e._v(" "),a("el-form-item",[a("el-button",{staticClass:"float_right",staticStyle:{width:"298px"},attrs:{type:"primary"},on:{click:function(t){e.register()}}},[e._v("注册")])],1),e._v(" "),a("el-row",{staticClass:"marginbottom_20"},[a("el-col",{attrs:{span:11,offset:13}},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("span",{staticClass:"cursor",on:{click:function(t){e.to_login()}}},[e._v("已有账号，返回登录")])])],1)],1)],1)],1)],1)],1)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:"forgetpass"==e.flag,expression:"flag=='forgetpass'"}],staticClass:"block"},[a("el-tabs",{model:{value:e.getpass_active,callback:function(t){e.getpass_active=t},expression:"getpass_active"}},[a("el-tab-pane",{attrs:{label:"找回密码",name:"first"}},[a("el-form",{attrs:{"label-position":"left","label-width":"55px",model:e.getpass}},[a("el-form-item",{attrs:{label:"用户名"}},[a("el-input",{model:{value:e.getpass.name,callback:function(t){e.$set(e.getpass,"name",t)},expression:"getpass.name"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"email",label:"邮箱",rules:[{message:"请输入邮箱地址",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}]}},[a("el-input",{model:{value:e.getpass.email,callback:function(t){e.$set(e.getpass,"email",t)},expression:"getpass.email"}})],1),e._v(" "),a("el-form-item",[a("el-button",{staticClass:"float_right",staticStyle:{width:"298px"},attrs:{type:"primary"},on:{click:function(t){e.getnewpass()}}},[e._v("找回密码")])],1),e._v(" "),a("el-row",{staticClass:"marginbottom_20"},[a("el-col",{attrs:{span:6,offset:18}},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("span",{staticClass:"cursor",on:{click:function(t){e.to_login()}}},[e._v("返回登录")])])],1)],1)],1)],1)],1)],1)],1)])},staticRenderFns:[]};var l=a("VU/8")(s,r,!1,function(e){a("+xnF")},"data-v-0a6225cd",null);t.default=l.exports}});
//# sourceMappingURL=0.a6ce1f3cc9f1452fc912.js.map