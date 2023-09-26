<template>
	<view>
		<nav :style="{ height: $store.state.BH + 'px' }"></nav>
		<input type="text" v-model="mobile" maxlength="11" />
		<input type="text" v-model="password" />
		<button @click="login">登录</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			mobile: '',
			password: ''
		};
	},
	
	methods: {
		login() {
			this.$api.login(
				{
					mobile: this.mobile,
					password: this.password
				},
				(res) => {
					if (res.data) {
						uni.setStorageSync('userToken', res.data);
						uni.navigateBack();
					}
				}
			);
		}
	}
};
</script>

<style lang="scss"></style>
