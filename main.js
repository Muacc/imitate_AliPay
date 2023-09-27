import Vue from 'vue'
import App from './App'
import {
	router,
	RouterMount
} from './router.js' //路径换成自己的
import uView from '@/uni_modules/uview-ui'
Vue.use(router)
Vue.use(uView)

import * as Api from './config/api.js'

import * as Common from './config/common.js'
import * as Db from './config/db.js'
import * as Config from './config/config.js'
import store from './store'
import './common/uni-H5Api'

Vue.config.productionTip = false
Vue.prototype.$api = Api;
Vue.prototype.$common = Common;
Vue.prototype.$db = Db;
Vue.prototype.$config = Config;
Vue.prototype.$store = store;


App.mpType = 'app'

const app = new Vue({
	...App
})

// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
/* app.$mount() */