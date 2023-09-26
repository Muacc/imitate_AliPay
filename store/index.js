import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	config: {},
	state: {
		BH: '',
		topH: uni.upx2px(87),
		isLoginTwo: false
	},
	mutations: {
		config(state, payload) {
			state.config = payload
		},
	},
	actions: {

	}
})

export default store