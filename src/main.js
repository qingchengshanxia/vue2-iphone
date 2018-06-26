// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import store from './store/index'
import Mock from './mock/mock'
import VueI18n from 'vue-i18n'
import 'vue2-animate/dist/vue2-animate.min.css';
import './icons/iconfont/iconfont.js'  //引入彩色icon文件 使用svg
import './icons/iconfont/iconfont.css'
import 'lib-flexible'


import { XInput,Group, XButton, Cell,XSwitch } from 'vux'

Vue.component('x-input', XInput)
Vue.component('group', Group)
Vue.component('x-button', XButton)
Vue.component('cell', Cell)
Vue.component('x-switch', XSwitch)


import { LoadingPlugin  } from 'vux'
import 'es6-promise/auto' //Vuex 依赖 Promise。如果你支持的浏览器并没有实现 Promise (比如 IE)，那么你可以使用一个 polyfill 的库，例如 es6-promise。
import 'babel-polyfill';

import axios from 'axios'
import Base from './utils/base.js'  //引入封装公共方法


Vue.use(VueRouter)
Vue.use(VueI18n)
Vue.use(Vuex)
Vue.use(Base)
Vue.use(LoadingPlugin) //引入vux中的loading图


Vue.config.productionTip = false


let defaultToken = "";
var qs = require('querystring');
//决定是否过滤URL中的/api
let isFilterApi = window.location.host.indexOf('127.0.0.1:')>-1||window.location.host.indexOf('localhost:')>-1?false:true;
Vue.prototype.$http = axios.create({
    baseURL: '',
    withCredentials: true, //是否跨域支持
    timeout: 30000, //超时设置
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    transformRequest: [function (data) {
        if(!data.__proto__.append){
          //非上传图片的格式
          data = qs.stringify(data);//序列化
        }

        return data;
    }],
    transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        return data;
    }]
});

let _loading='';
Vue.prototype.$ajax = function (option) {
  if (!option.data) {
    option.data = {};
  }
  // 如果请求参数对象中，存在 noloading:true，则不执行默认的loading加载图；
  // 否则执行默认的加载图
  if(!option.noloading){
    this.$vux.loading.show({
     text: 'Loading'
    })
  }
  this.$http({
    method:option.method,
    url:isFilterApi?(option.url.replace("/api","")):option.url,
    data:option.data,
    dataType: "json",
  }).then(obj=>{
    if(obj.data){
      obj = JSON.parse(obj.data);
    }
    option.success && option.success(obj);
    this.$vux.loading.hide()
  }).catch(err=>{
    this.$vux.loading.hide()
    option.error?option.error(err):console.error(err.message);
  })
};


// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('hasLogin')) {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `token ${localStorage.getItem('hasLogin')}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    localStorage.removeItem('hasLogin');
                    router.replace({
                        path: '/login'
                    })
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    }
);


//国际化语言设置
const i18n = new VueI18n({
    locale: 'zh',    // 语言标识 （这里可以用localStorage使得具有记忆功能）
    messages: {
        'zh': require('./lang/zh'),
        'en': require('./lang/en')
    }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
