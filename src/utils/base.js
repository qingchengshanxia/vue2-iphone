/*
* @Author: lhl
* @Date:   2018-06-11 20:22:45
* @Last Modified by:   lhl
* @Last Modified time: 2018-06-11 21:32:56
*/

'use strict';

export default {
    /**
     * 每个插件都有的install方法，用于安装插件
     * @param {Object} Vue - Vue类
     * @param {Object} [pluginOptions] - 插件安装配置
     */
    install:function(Vue,option){
          // 1. 添加全局方法或属性,只能用Vue.loginOut调用，如：Vue.loginOut()；
          // Vue.myGlobalMethod  = function(){
          //   // 逻辑...
          // }

          // 2. 添加全局资源
          // Vue.directive('my-directive', {
          //   bind (el, binding, vnode, oldVnode) {
          //     // 逻辑...
          //   }
          // })

          // 3. 注入组件
          // Vue.mixin({
          //   created: function () {
          //     // 逻辑...
          //   }
          // })

          // 4. 添加实例方法 用this.loginOut()调用
          Vue.prototype.loginOut = function (methodOptions) {
            //vuex中记录退出登录，在computed里面，更新是否登录信息
            // this.$store.commit('IS_LOGIN');
            // localStorage.removeItem('remUserInfo');
            // localStorage.removeItem('userinfo');
            // this.$router.replace({path:'/home/login'});
          }
    }
}
