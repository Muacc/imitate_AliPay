<template>
	<view class="main">
		<!-- #ifdef H5 -->
		<nav style="height: 97rpx"></nav>
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<nav :style="{ height: $store.state.BH + 15 + 'px' }"></nav>
		<!-- #endif -->
		<image class="bg" src="/static/img/bdc-img/165.png" mode=""></image>
		<view class="nav" @click="back">
			<image src="/static/img/index-img/zjtzz.png" mode=""></image>
			搜索
		</view>
		<view class="title">我的不动产</view>
		<view class="box">
			<view class="box-title">便民服务</view>
			<view class="item" @click="Go('/pages-two/my/cx')">
				<view class="left">
					<image src="/static/img/bdc-img/1.png" mode=""></image>
					我的不动产查询
				</view>
				<image class="yjt" src="/static/img/my-img/yjt6.png" mode=""></image>
			</view>
			<view class="line"></view>
			<view class="item">
				<view class="left">
					<image src="/static/img/bdc-img/2.png" mode=""></image>
					开具本市房屋查询结果证明
				</view>
				<image class="yjt" src="/static/img/my-img/yjt6.png" mode=""></image>
			</view>
			<view class="line2"></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		back() {
			uni.navigateBack();
		},
		Go(e) {
			uni.navigateTo({
				url: e
			});
		}
	}
};
</script>

<style lang="scss">
.main {
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 322rpx;
		z-index: -1;
	}
	.nav {
		font-size: 34rpx;
		font-weight: bold;
		color: #000000;
		margin-left: 36rpx;
		display: flex;
		align-items: center;
		image {
			margin-right: 7rpx;
			width: 19rpx;
			height: 33rpx;
		}
	}
	.title {
		margin: 30rpx 0 0 33rpx;
		font-size: 40rpx;
		font-weight: bold;
		color: #ffffff;
	}
	.box {
		margin: 90rpx 24rpx;
		box-shadow: -4rpx 30rpx 20rpx rgba(0, 0, 0, 0.05);
		padding-bottom: 48rpx;
		border-radius: 0 0 9rpx 9rpx;
		.box-title {
			margin: 5rpx 0 61rpx 34rpx;
			font-size: 37rpx;
			font-weight: bold;
			color: #000000;
		}
		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 18rpx 0 25rpx;
			.left {
				display: flex;
				align-items: center;
				font-size: 32rpx;
				font-weight: 400;
				color: #000000;
				image {
					width: 73rpx;
					height: 73rpx;
					margin-right: 32rpx;
				}
			}
			.yjt {
				width: 14rpx;
				height: 25rpx;
			}
		}
		.line {
			height: 1rpx;
			background: #ededed;
			margin: 34rpx 14rpx;
		}
		.line2 {
			height: 1rpx;
			background: #ededed;
			margin: 34rpx 14rpx 0;
		}
	}
}
</style>
