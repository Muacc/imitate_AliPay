<template>
	<view>
		<navBar Title="转移接续"></navBar>
		<view class="tabs">
			<view class="tabs1">我要申请</view>
			<view class="tabs2">申请记录</view>
		</view>
		<view class="box">
			<button @click="Go('/pages/Face/Face')">点我去扫脸</button>
		</view>
	</view>
</template>

<script>
import navBar from '@/components/gjj-navbar/gjj-navbar.vue';
export default {
	components: {
		navBar
	},
	data() {
		return {};
	},
	onLoad() {
		this.getUser();
	},
	methods: {
		getUser() {},
		Go(e) {
			uni.navigateTo({
				url: e
			});
		}
	}
};
</script>

<style lang="scss">
.tabs {
	display: flex;
	padding: 10rpx 0;
	justify-content: space-around;
	.tabs1 {
		display: inline-block;
		text-align: center;
		padding: 15rpx 25rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #2251d3;
		border-bottom: 4rpx solid;
	}
	.tabs2 {
		text-align: center;
		padding: 15rpx 25rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}
}
.box {
	background-color: #f5f5f5;
	padding: 30rpx 30rpx 115rpx;
}
</style>
