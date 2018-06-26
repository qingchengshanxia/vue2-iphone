/*
* @Author: lhl
* @Date:   2018-06-11 10:43:06
* @Last Modified by:   lhl
* @Last Modified time: 2018-06-11 19:10:28
*/

'use strict';

import * as types from './mutation-types.js'

export default {
    [types.IS_LOGIN](state){
        state.islogin = !state.islogin;
    },
}