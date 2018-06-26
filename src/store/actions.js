/*
* @Author: lhl
* @Date:   2018-06-11 10:43:06
* @Last Modified by:   lhl
* @Last Modified time: 2018-06-11 17:22:00
*/

'use strict';

import * as types from './mutation-types.js'

export default {
    loginAsyn({commit},{bool}){
        commit(types.IS_LOGIN, bool)
    },
};