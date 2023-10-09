<template>
	<view class="main">
		<nav :style="{ height: $store.state.BH + 'px' }"></nav>
		<view class="search-box">
			<view class="address">
				<image class="city" src="/static/img/index-img/684.png"></image>
				<image class="weather" src="/static/img/index-img/25.png"></image>
			</view>
			<view class="search" @click="Go('/pages/index/search')">
				<view class="search-left">
					<image src="/static/img/index-img/search.png"></image>
					旧衣一站式回收
				</view>
				<view class="search-right">
					<view class="line"></view>
					搜索
				</view>
			</view>
			<image class="add" src="/static/img/index-img/add.png" mode=""></image>
		</view>
		<view class="core-module">
			<view class="item" v-for="(item, index) in CoreModule" :key="index">
				<image :src="item.url" mode=""></image>
				<view class="title">{{ item.title }}</view>
			</view>
		</view>
		<view class="content">
			<view class="small-module">
				<view class="small-item" v-for="(item, index) in SmallModule" :key="index">
					<image :src="item.url" mode=""></image>
					<view class="title">{{ item.title }}</view>
				</view>
			</view>
			<image class="banner" src="/static/img/index-img/842.png" mode="widthFix"></image>
			<image class="banner" src="/static/img/index-img/b1.png" mode="widthFix"></image>
			<image class="banner" src="/static/img/index-img/b3.png" mode="widthFix"></image>
			<image class="banner" src="/static/img/index-img/b4.png" mode="widthFix"></image>
			<image class="banner" src="/static/img/index-img/b5.png" mode="widthFix"></image>
			<image class="banner" src="/static/img/index-img/b6.png" mode="widthFix"></image>
			<image class="banner" src="/static/img/index-img/b7.png" mode="widthFix"></image>
			<image class="banner" src="/static/img/index-img/b8.png" mode="widthFix"></image>
			<image class="banner" src="/static/img/index-img/b9.png" mode="widthFix"></image>
			<image class="banner" src="/static/img/index-img/b10.png" mode="widthFix"></image>
		</view>
		<tabBar :index="0"></tabBar>
	</view>
</template>

<script>
import tabBar from '@/components/gjj-tabBar/gjj-tabBar.vue';
export default {
	components: {
		tabBar
	},
	data() {
		return {
			CoreModule: [
				{
					title: '扫一扫',
					url: '/static/img/index-img/sys.png'
				},
				{
					title: '付钱/收钱',
					url: '/static/img/index-img/sfk.png'
				},
				{
					title: '出行',
					url: '/static/img/index-img/cx.png'
				},
				{
					title: '卡包',
					url: '/static/img/index-img/qb.png'
				}
			],
			SmallModule: [
				{
					title: '股票',
					url: '/static/img/index-img/11.png'
				},
				{
					title: '神奇海洋',
					url: '/static/img/index-img/121.png'
				},
				{
					title: '市民中心',
					url: '/static/img/index-img/4.png'
				},
				{
					title: '淘票票',
					url: '/static/img/index-img/tpp.png'
				},
				{
					title: '转账',
					url: '/static/img/index-img/7.png'
				}, 
				{
					title: '余额宝',
					url: '/static/img/index-img/8.png'
				},
				{
					title: '网商银行',
					url: '/static/img/index-img/12.png'
				},
				{
					title: '芝麻信用',
					url: '/static/img/index-img/13.png'
				},
				{
					title: '生活缴费',
					url: '/static/img/index-img/3.png'
				},
				{
					title: '花呗',
					url: '/static/img/index-img/14.png'
				},
				{ 
					title: '借呗',
					url: '/static/img/index-img/5.png'
				},
				{
					title: '医疗健康',
					url: '/static/img/index-img/2.png'
				},
				{
					title: '蚂蚁森林',
					url: '/static/img/index-img/10.png'
				},
				{
					title: '我的小程序',
					url: '/static/img/index-img/wd.png'
				},
				{
					title: '更多',
					url: '/static/img/index-img/gd.png'
				}
			]
		};
	},
	onLoad() {},
	methods: {
		Go(e) {
			uni.navigateTo({
				url: e
			});
		}
	}
};
</script>

<style scoped lang="scss">
page {
	background-color: #f5f5f5;
}
.main {
	background-image: url('../../static/img/index-img/15.png');
	padding-top: 20rpx;
	.search-box {
		display: flex;
		align-items: center;
		padding: 0 23rpx 0 19rpx;
		.address {
			display: flex;
			flex-direction: column;
			margin-right: 14rpx;
			.city {
				width: 83rpx;
				height: 40rpx;
			}
			.weather {
				width: 60rpx;
				height: 22rpx;
			}
		}
		.search {
			flex: 1;
			background-image: url('../../static/img/index-img/70.png');
			background-size: cover;
			background-repeat: no-repeat;
			display: flex;
			align-items: center;
			height: 59rpx;
			justify-content: space-between;
			padding: 0 21rpx 0 16rpx;
			.search-left {
				display: flex;
				align-items: center;
				font-size: 26rpx;
				font-weight: 500;
				color: #666666;
				image {
					width: 25rpx;
					height: 26rpx;
					margin-right: 12rpx;
				}
			}
			.search-right {
				display: flex;
				align-items: center;
				font-size: 26rpx;
				font-weight: bold;
				color: #3874f6;
				.line {
					width: 2rpx;
					height: 41rpx;
					background: #b9cfff;
					margin-right: 18rpx;
				}
			}
		}
		.add {
			width: 39rpx;
			height: 39rpx;
			margin-left: 21rpx;
		}
	}

	.core-module {
		display: flex;
		align-items: center;
		margin-top: 37rpx;
		margin-bottom: 23rpx;
		.item {
			flex: 1;
			text-align: center;
			image {
				width: 62rpx;
				height: 62rpx;
				margin-bottom: 10rpx;
			}
			.title {
				font-size: 28rpx;
				font-weight: 400;
				color: #ffffff;
			}
		}
	}
	.content {
		background: #f5f5f5;
		border-radius: 20rpx 20rpx 0 0;
		.small-module {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding-bottom: 30rpx;
			.small-item {
				text-align: center;
				margin-top: 40rpx;
				width: 20%;
				image {
					width: 60rpx;
					height: 60rpx;
				}
				.title {
					font-size: 26rpx;
					font-weight: 500;
					color: #333333;
					margin-top: 5rpx;
				}
			}
		}
		.banner {
			margin: 0 20rpx 15rpx 20rpx;
			border-radius: 15rpx;
			width: 710rpx;
		}
	}
}
</style>
