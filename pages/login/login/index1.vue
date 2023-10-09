<template>
	<view class="main">
		<nav :style="{ height: $store.state.BH + 'px' }"></nav>
		<view style="height: 50px"></view>
		<u--input placeholder="请输入账号" maxlength="11" border="surround" v-model="mobile"></u--input>
		<u--input placeholder="请输入密码" type="password" border="surround" v-model="password"></u--input>
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

<style lang="scss">
.main {
	margin: 0 50px;
}
</style>
