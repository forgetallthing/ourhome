webpackJsonp([2],{WdKW:function(t,e){},wfVY:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("DmT9"),a=s.n(i),n={props:{},name:"socket",data:function(){return{wsStateValue:!1,textarea:"",socked:null,chat_list:[],wsState:"已关闭:",userNickname:null,socketId:void 0,userPhoto:null,onlineTotal:0,photoList:["../../static/man.png","../../static/women.png","../../static/child.png","../../static/fiwomen.png"]}},computed:{},created:function(){},mounted:function(){var t=this;document.onkeydown=function(e){if(e||(e=window.event),13==(e.keyCode||e.which))return t.send(),!1}},watch:{},methods:{connect:function(){var t=this;if(!this.userPhoto){var e=Math.floor(4*Math.random());this.userPhoto=this.photoList[e]}if(this.wsStateValue)if(this.wsState="已连接:",this.userNickname){this.socket=a()("http://ipromiseyourlife.com:9999",{forceNew:!1});var s=this;this.socket.on("connect",function(){t.socketId=t.socket.id}),this.socket.emit("join",{name:this.userNickname}),this.socket.on("message",function(t){s.showMes(t)}),this.socket.on("joinNoticeSelf",function(t){s.onlineTotal=t.count}),this.socket.on("joinNoticeOther",function(t){s.showMes(t),s.onlineTotal=t.count}),this.socket.on("disconnection",function(t){s.showMes(t),s.onlineTotal=t.count})}else this.openUserNicknameInput();else this.socket.close(),this.socket=null,this.onlineTotal=0,this.chat_list=[],this.wsState="已关闭:",this.userPhoto=null,this.userNickname=null},send:function(){if(this.textarea)if(this.socket){var t={id:this.socketId,name:this.userNickname,mes:this.textarea,time:new Date,photo:this.userPhoto};this.socket.send(t),this.textarea=null}else this.$message({type:"info",message:"您还没进入聊天室~"});else this.$message({type:"info",message:"请多少输入点啥吧~"})},showMes:function(t){this.chat_list.push(t),t.id===this.socketId&&this.$nextTick(function(){msg_end.scrollIntoView()})},openUserNicknameInput:function(){var t=this;this.$prompt("请输入聊天昵称","GN在线",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^[\W\w]*?/,inputErrorMessage:"昵称格式不正确"}).then(function(e){var s=e.value;t.$message({type:"success",message:"你的昵称是: "+s}),t.userNickname=s,t.connect()}).catch(function(){t.$message({type:"info",message:"取消输入,没有昵称无法进入哦~"}),t.wsState="已关闭:",t.wsStateValue=!1})}},components:{}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticStyle:{height:"100%"}},[s("div",{staticClass:"talk"},[t._l(t.chat_list,function(e,i){return s("div",{key:i},[e.id&&e.id!=t.socketId?s("div",{staticClass:"mes-contain"},[s("img",{staticClass:"userPhoto userPhoto-left",attrs:{src:e.photo,alt:""}}),t._v(" "),s("div",{staticClass:"userName userName-left"},[t._v(t._s(e.name))]),t._v(" "),s("div",{staticClass:"userMes userMes-left"},[t._v(t._s(e.mes))]),t._v(" "),s("br",{staticStyle:{clear:"both"}})]):e.id&&e.id==t.socketId?s("div",{staticClass:"mes-contain"},[s("img",{staticClass:"userPhoto userPhoto-right",attrs:{src:e.photo,alt:""}}),t._v(" "),s("div",{staticClass:"userName userName-right"},[t._v(t._s(e.name))]),t._v(" "),s("div",{staticClass:"userMes userMes-right"},[t._v(t._s(e.mes))]),t._v(" "),s("br",{staticStyle:{clear:"both"}})]):e.into?s("div",{staticClass:"broad"},[s("span",{staticClass:"broad-text"},[t._v(t._s(e.name)+"闪亮登场!!!")])]):s("div",{staticClass:"broad"},[s("span",{staticClass:"broad-text"},[t._v(t._s(e.name)+"夹着尾巴逃了")])])])}),t._v(" "),s("div",{staticStyle:{height:"0px",overflow:"hidden"},attrs:{id:"msg_end"}})],2),t._v(" "),s("el-input",{staticClass:"mes-content",attrs:{type:"textarea",rows:2,placeholder:"请输入内容"},model:{value:t.textarea,callback:function(e){t.textarea=e},expression:"textarea"}}),t._v(" "),s("div",{staticClass:"mes-set"},[s("span",[t._v("当前在线："+t._s(t.onlineTotal))]),t._v(" "),s("el-switch",{staticClass:"mes-swich",attrs:{"inactive-text":t.wsState,"active-color":"#13ce66","inactive-color":"#0089A7"},on:{change:t.connect},model:{value:t.wsStateValue,callback:function(e){t.wsStateValue=e},expression:"wsStateValue"}}),t._v(" "),s("el-button",{staticClass:"mes-send",attrs:{size:"small",type:"primary"},on:{click:t.send}},[t._v("send")])],1)],1)},staticRenderFns:[]};var c=s("VU/8")(n,o,!1,function(t){s("WdKW")},"data-v-8df35db4",null);e.default=c.exports}});
//# sourceMappingURL=2.1d20c19184ba38d081c3.js.map