<template>
	<view>
		<nav :style="{ height: $store.state.BH + 10 + 'px' }" style="background-color: #fff"></nav>
		<view class="title">身份验证</view>
		<view class="main">
			<image src="/static/img/gjj-img/rzok.png" mode=""></image>
			<view class="text">认证成功</view>
			<view class="subtext">恭喜你,完成了身份验证</view>
		</view>
		<view class="button" @click="To">返回({{ time }})</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			time: 4,
			timer: null
		};
	},
	onReady() {
		this.timer = setInterval(() => {
			if (this.time > 0) {
				this.time--;
			} else {
				this.To();
				clearInterval(this.timer); // 倒计时结束后清除定时器
			}
		}, 1000);
	},
	methods: {
		To() {
			uni.redirectTo({
				url: '/pages-two/my/cx'
			});
		}
	},
	beforeDestroy() {
		clearInterval(this.timer); // 组件销毁前清除定时器
	}
};
</script>

<style lang="scss">
page {
	background-color: #f5f5f5;
}
.title {
	padding: 15rpx 0;
	text-align: center;
	font-size: 32rpx;
	font-weight: bold;
	color: #000000;
	background-color: #fff;
}

.main {
	background-color: #fff;
	padding: 59rpx 0;
	text-align: center;
	border-top: 1rpx solid #e5e5e5;
	image {
		width: 130rpx;
		height: 130rpx;
	}
	.text {
		font-size: 40rpx;
		font-weight: 400;
		color: #333333;
		margin: 30rpx 0 17rpx;
	}
	.subtext {
		font-weight: 400;
		font-size: 28rpx;
		color: #999999;
	}
}
.button {
	margin: 61rpx 32rpx 0;
	padding: 22rpx 0;
	font-size: 36rpx;
	font-weight: 400;
	color: #ffffff;
	background: #3874f6;
	text-align: center;
	border-radius: 5rpx;
}
</style>
