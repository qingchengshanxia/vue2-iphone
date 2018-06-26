/*
* @Author: lhl
* @Date:   2018-06-11 10:42:55
* @Last Modified by:   lhl
* @Last Modified time: 2018-06-11 20:25:00
*/

'use strict';

import vue from 'vue';
import vuex from 'vuex';
import state from './state.js';
import * as getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';
import login from './modules/login.js';  //（如果不是很复杂的应用，一般来讲是不会分模块的）：
import createLogger from 'vuex/dist/logger'; // 修改日志

vue.use(vuex);

const debug=process.env.NODE_ENV !== 'production';// 开发环境中为true，否则为false



export default new vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules:{
        login
    },
    plugins:debug?[createLogger()]:[] // 开发环境下显示vuex的状态修改
})