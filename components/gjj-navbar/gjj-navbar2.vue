<template>
	<view class="nav-components">
		<view class="nav">
			<nav :style="{ height: $store.state.BH + 10 + 'px' }"></nav>
			<view class="nav-info">
				<view class="nav-left" @click="back">
					<image src="/static/img/index-img/zjtzz.png" mode=""></image>
					{{ Title }}
				</view>
				<view class="nav-right">
					<image class="sc" src="/static/img/gjj-img/778b.png" mode=""></image>
					<image class="jn" src="/static/img/gjj-img/jn.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="nav-block" :style="height()"></view>
	</view>
</template>

<script>
export default {
	name: 'gjj-navbar',
	props: ['Title'],
	data() {
		return {};
	},
	methods: {
		height() {
			let num1 = parseInt(this.$store.state.topH);
			let num2 = parseInt(this.$store.state.BH + 10);
			let num3 = num1 + num2 + 'px';
			let str = `height:${num3}`;
			return str;
		},
		back() {
			uni.navigateBack();
		}
	}
};
</script>

<style lang="scss">
.nav {
	padding: 15rpx 20rpx 20rpx 37rpx;
	background: #fff;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;
	.nav-info {
		font-size: 36rpx;
		font-weight: 400;
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.nav-left {
			line-height: 1;
			display: flex;
			align-items: center;
			color: #000000;
			font-weight: bold;
			font-size: 34rpx;
			image {
				width: 19rpx;
				margin-right: 10rpx;
				height: 33rpx;
			}
		}
		.nav-right {
			display: flex;
			align-items: center;
			.sc {
				width: 52rpx;
				height: 52rpx;
			}
			.jn {
				width: 138rpx;
				height: 52rpx;
				margin-left: 14rpx;
			}
		}
	}
}
</style>
