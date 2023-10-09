<template>
	<view class="main">
		<view class="bg" :style="{ paddingTop: $store.state.BH + 'px' }"></view>
		<view class="main2">
			<nav :style="{ height: $store.state.BH + 'px' }"></nav>
			<view class="title">
				<image src="/static/img/gjj-img/zzz.png" @click="back" mode=""></image>
				<view>身份验证</view>
				<view></view>
			</view>
			<view class="img">
				<image class="zfb" src="/static/img/gjj-img/797.png" mode=""></image>
				<image class="ssb" src="/static/img/gjj-img/ssbyz.png" mode=""></image>
			</view>
			<view class="MP-info">
				<view class="MP-name">上海市大数据中心</view>
				<view class="MP-tips">为了便于你满足上海市大数据中心的实名制的要求，需要你使用支付宝认证服务，并在认证完成后，授权其查询如下信息</view>
			</view>
			<view class="line"></view>
			<view class="condition">
				<view class="item">
					<view class="dot"></view>
					你的本次人脸认证结果
				</view>
				<view class="item">
					<view class="dot"></view>
					你的本次认证过程中拍摄的人脸照片
				</view>
			</view>
		</view>
		<view class="xy">
			使用服务须同意
			<text>《认证服务协议》</text>
		</view>
		<view class="agree-with">
			<view class="yes" @click="Go('/pages/Face/ssbFace')">同意协议并认证</view>
			<view class="no" @click="back">暂不认证</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		Go(e) {
			uni.redirectTo({
				url: e
			});
		},
		back() {
			uni.navigateBack();
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f5f5f5;
}
.bg {
	height: 281rpx;
	position: absolute;
	top: 0%;
	left: 0;
	right: 0;
	background: linear-gradient(134deg, #408ae1 0%, #3371c7 100%);
}
.main {
	.main2 {
		background-color: #fff;
		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 18rpx 37rpx;
			font-size: 32rpx;
			font-weight: 400;
			color: #ffffff;
			position: relative;
			z-index: 999;
			image {
				width: 19rpx;
				height: 33rpx;
			}
		}
		.img {
			display: flex;
			flex-direction: column;
			align-items: center;
			.zfb {
				width: 82rpx;
				height: 101rpx;
				margin-top: 17rpx;
			}
			.ssb {
				width: 100rpx;
				height: 100rpx;
				margin-top: 33rpx;
			}
		}
		.MP-info {
			display: flex;
			flex-direction: column;
			align-items: center;
			.MP-name {
				font-size: 34rpx;
				font-weight: bold;
				color: #333333;
				margin-top: 35rpx;
				margin-bottom: 32rpx;
			}
			.MP-tips {
				width: 630rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #333333;
			}
		}
		.line {
			margin: 48rpx 33rpx 42rpx;
			border-bottom: 1rpx solid #e8e8e8;
		}
		.condition {
			padding-bottom: 33rpx;
			.item {
				display: flex;
				align-items: center;
				margin: 0 32rpx 6rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
				.dot {
					width: 8rpx;
					height: 8rpx;
					background: #999999;
					border-radius: 50%;
					margin-right: 11rpx;
				}
			}
		}
	}
	.xy {
		margin: 24rpx 0 62rpx 33rpx;
		font-size: 28rpx;
		color: #999999;
		font-weight: 400;
		text {
			color: #3874f6;
		}
	}
	.agree-with {
		.yes {
			margin: 0 28rpx;
			background: #3874f6;
			border-radius: 5rpx;
			padding: 22rpx 0;
			font-size: 36rpx;
			font-weight: 400;
			color: #ffffff;
			text-align: center;
		}
		.no {
			margin: 25rpx 28rpx;
			background: #ffffff;
			border: 1px solid #dddddd;
			border-radius: 5rpx;
			padding: 22rpx 0;
			font-size: 36rpx;
			font-weight: 400;
			color: #333;
			text-align: center;
		}
	}
}
</style>
