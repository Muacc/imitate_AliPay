<template>
	<view class="main">
		<navBar Title="用户服务协议"></navBar>
		<view class="main-box">
			<image src="/static/img/gjj-img/ssb.png" mode=""></image>
			<view class="name">随申办</view>
		</view>
		<view class="no-Login">
			<view class="no-login-left">
				<view class="no-login-left-top">免登录时长</view>
				<view class="no-login-left-bottom">变更默认登录时长，最高30天登录</view>
			</view>
			<view class="no-login-right">
				30天免登录
				<image src="/static/img/my-img/yjt6.png" mode=""></image>
			</view>
		</view>
		<view class="items">
			<view class="item">
				<view class="dot"></view>
				随申办小程序用户服务协议
			</view>
			<view class="item">
				<view class="dot"></view>
				随申办小程序用户隐私政策
			</view>
		</view>
		<view class="look-xy">
			<image src="/static/img/gjj-img/39.png" v-if="!look" @click="look = true"></image>
			<image src="/static/asas.png" v-else @click="look = false"></image>
			<view class="p">
				<view class="text">我已阅读并同意《随申办小程序用户服务协议》</view>
				<view class="text">《随申办小程序用户隐私政策》</view>
			</view>
		</view>
		<view class="no" :class="{ yes: look }" @click="next">下一步</view>
	</view>
</template>

<script>
import navBar from '@/components/gjj-navbar/gjj-navbar2.vue';
export default {
	components: {
		navBar
	},
	data() {
		return {
			look: false
		};
	},
	methods: {
		next() {
			if (!this.look) {
				return;
			} else {
				uni.redirectTo({
					url: '/pages-two/checking/checking'
				});
			}
		}
	}
};
</script>

<style lang="scss">
.main {
	.main-box {
		padding: 205rpx 0;
		text-align: center;
		font-size: 40rpx;
		font-weight: 400;
		color: #000000;
		image {
			width: 116rpx;
			height: 114rpx;
			margin-bottom: 38rpx;
		}
	}
	.no-Login {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 23rpx;
		margin-bottom: 15rpx;
		.no-login-left {
			.no-login-left-top {
				font-size: 34rpx;
				font-weight: 400;
				color: #000000;
			}
			.no-login-left-bottom {
				font-size: 26rpx;
				font-weight: 400;
				color: #999999;
			}
		}

		.no-login-right {
			display: flex;
			align-items: center;
			line-height: 1.2;
			image {
				width: 16rpx;
				height: 28rpx;
				margin-left: 18rpx;
			}
		}
	}
	.items {
		.item {
			font-size: 28rpx;
			font-weight: 400;
			color: #cab385;
			margin: 31rpx 29rpx 0;
			display: flex;
			align-items: center;
			.dot {
				width: 13rpx;
				height: 13rpx;
				background: #cacaca;
				border-radius: 50%;
				opacity: 1;
				margin-right: 21rpx;
			}
		}
	}
	.look-xy {
		display: flex;
		padding: 0 59rpx 0 36rpx;
		margin: 85rpx 0 55rpx;
		image {
			width: 47rpx;
			height: 47rpx;
			margin-right: 20rpx;
		}
		.p {
			font-size: 28rpx;
			font-weight: 400;
			color: #333333;
		}
	}
	.no {
		margin: 0 31rpx;
		padding: 25rpx 0;
		text-align: center;
		background: #e4e4e4;
		border-radius: 5rpx;
		font-size: 36rpx;
		color: #ffffff;
		font-weight: 400;
	}
	.yes {
		background-color: #108ee9;
	}
}
</style>
