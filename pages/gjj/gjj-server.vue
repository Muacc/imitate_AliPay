<template>
	<view class="main">
		<navBar Title="服务"></navBar>
		<!-- <view class="top-nav" ref="topNav">
			<nav :style="{ height: $store.state.BH + 10 + 'px' }"></nav>
			<view class="jiaonang" :style="{ top: $store.state.BH + 20 + 'px' }">
				<view class="left">
					<image src="/static/img/gjj-img/zzz.png" mode=""></image>
					服务
				</view>
				<view class="right">
					<image class="sc" src="/static/img/gjj-img/887.png" mode=""></image>
					<image class="jn" src="/static/img/gjj-img/46.png" mode=""></image>
				</view>
			</view>
		</view> -->
		<view :style="{ height: Math.floor(topH) + 'px' }"></view>
		<view class="big-box">
			<view class="item-block" v-for="(item, index) in list" :key="index">
				<view class="block-title">
					<view class="line-box"></view>
					{{ item.title }}
				</view>
				<view class="for-item">
					<view class="small-item" v-for="(A, B) in item.chiderList" :key="B">
						<image :src="A.img" mode=""></image>
						<view class="name">
							{{ A.name }}
						</view>
						<view class="name" v-if="A.subname">
							{{ A.subname }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<tabBar :index="1"></tabBar>
	</view>
</template>

<script>
import tabBar from '@/components/gjj-tabBar/gjj-tabBar2.vue';
import navBar from '@/components/gjj-navbar/gjj-navbar.vue';
export default {
	components: {
		tabBar,
		navBar
	},
	data() {
		return {
			topH: '',
			list: [
				{
					title: '信息查询',
					chiderList: [
						{
							name: '账户信息',
							img: '/static/img/gjj-img/f1.png'
						},
						{
							name: '缴存明细',
							img: '/static/img/gjj-img/f2.png'
						},
						{
							name: '提取明细',
							img: '/static/img/gjj-img/f3.png'
						},
						{
							name: '贷款信息',
							img: '/static/img/gjj-img/f4.png'
						},
						{
							name: '还款明细',
							img: '/static/img/gjj-img/f5.png'
						},
						{
							name: '个税折扣',
							subname: '填报信息',
							img: '/static/img/gjj-img/f6.png'
						}
					]
				},
				{
					title: '业务办理',
					chiderList: [
						{
							name: '转移接续',
							img: '/static/img/gjj-img/f7.png'
						},
						{
							name: '缴存明细',
							img: '/static/img/gjj-img/f8.png'
						}
					]
				},
				{
					title: '热门服务',
					chiderList: [
						{
							name: '存款利率',
							img: '/static/img/gjj-img/f9.png'
						},
						{
							name: '贷款利率',
							img: '/static/img/gjj-img/f10.png'
						},
						{
							name: '房贷计算',
							img: '/static/img/gjj-img/f11.png'
						},
						{
							name: '全国住房公积',
							subname: '金年报',
							img: '/static/img/gjj-img/f12.png'
						}
					]
				}
			]
		};
	},
	mounted() {
		uni.createSelectorQuery()
			.in(this)
			.select('.top-nav')
			.boundingClientRect((rect) => {
				if (rect) {
					this.topH = rect.height;
				}
			})
			.exec();
	},
	methods: {}
};
</script>

<style lang="scss">
.main {
	.top-nav {
		background-image: url('../../static/img/gjj-img/bg1.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		position: fixed;
		top: 0;
		left: 0;
		width: calc(100% - 60rpx);
		padding: 20rpx 30rpx;
		z-index: 10;
		.logo {
			width: 505rpx;
			height: 104rpx;
		}
		.jiaonang {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left {
				display: flex;
				align-items: center;
				font-size: 36rpx;
				font-weight: 400;
				color: #ffffff;
				image {
					width: 19rpx;
					height: 33rpx;
					margin-right: 5rpx;
				}
			}
			.right {
				.sc {
					width: 52rpx;
					height: 52rpx;
					margin-right: 15rpx;
				}
				.jn {
					width: 138rpx;
					height: 52rpx;
				}
			}
		}
	}
	.big-box {
		.item-block {
			margin-top: 36rpx;
			.block-title {
				display: flex;
				margin-bottom: 42rpx;
				align-items: center;
				padding-left: 22rpx;
				font-size: 31rpx;
				color: #000000;
				font-weight: 800;
				.line-box {
					width: 8rpx;
					height: 28rpx;
					margin-right: 20rpx;
					background: linear-gradient(180deg, #284cc7 0%, #3874f6 100%);
				}
			}
			.for-item {
				display: flex;
				flex-wrap: wrap;
				.small-item {
					margin-bottom: 62rpx;
					width: 33.33%;
					text-align: center;
					image {
						width: 95rpx;
						height: 95rpx;
						margin-bottom: 22rpx;
					}
					.name {
						font-size: 27rpx;
						color: #333333;
						font-weight: 400;
					}
				}
			}
		}
	}
}
</style>
