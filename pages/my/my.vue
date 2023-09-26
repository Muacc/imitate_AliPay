<template>
	<view class="main">
		<nav :style="{ height: $store.state.BH + 'px' }"></nav>
		<view class="seting">
			<image src="/static/img/my-img/kf.png" mode=""></image>
			<image src="/static/img/my-img/sz.png" @click="Go('/pages/my/setup')" mode=""></image>
		</view>
		<view class="user-info">
			<view class="info-left">
				<image class="avater" :src="userData.avatar" mode=""></image>
				<view class="info">
					<view class="name">{{ userData.username }}</view>
					<view class="tel">{{ userData.mobile }}</view>
				</view>
			</view>
			<image class="info-right" src="/static/img/my-img/yjt.png" mode=""></image>
		</view>
		<view class="my-box">
			<view class="block" v-for="(bItem, bIndex) in boxList" :key="bIndex">
				<view class="block-small" v-for="(A, B) in bItem.items" :key="A.title">
					<view class="item">
						<view class="small-left">
							<image class="left-icon" :src="A.icon"></image>
							{{ A.title }}
						</view>
						<view class="small-right">
							<view class="small-tips" :style="{ color: A.color ? A.color : '#999999' }" v-if="A.tips">
								{{ A.tips }}
							</view>
							<view class="small-dot" v-if="A.dot"></view>
							<image class="yjt" src="/static/img/my-img/yjt6.png"></image>
						</view>
					</view>
					<view class="line" v-if="B !== bItem.items.length - 1"></view>
				</view>
			</view>
		</view>
		<tabBar :index="4"></tabBar>
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
			boxList: [
				{
					items: [
						{
							icon: '/static/img/my-img/b1.png',
							title: '支付宝会员',
							tips: '724积分待领取'
						},
						{
							icon: '/static/img/my-img/b2.png',
							title: '用户保护中心'
						},
						{
							icon: '/static/img/my-img/b3.png',
							title: '商家服务',
							tips: '签到领5商家积分',
							dot: true
						}
					]
				},
				{
					items: [
						{
							icon: '/static/img/my-img/b4.png',
							title: '账单'
						},
						{
							icon: '/static/img/my-img/b5.png',
							title: '总资产',
							tips: '免费升百万保障',
							color: '#F0AB3F'
						},
						{
							icon: '/static/img/my-img/b6.png',
							title: '余额'
						},
						{
							icon: '/static/img/my-img/b7.png',
							title: '余额宝'
						},
						{
							icon: '/static/img/my-img/b8.png',
							title: '花呗'
						},
						{
							icon: '/static/img/my-img/b9.png',
							title: '余利宝'
						},
						{
							icon: '/static/img/my-img/b10.png',
							title: '银行卡'
						},
						{
							icon: '/static/img/my-img/b11.png',
							title: '宝藏信用卡',
							tips: '信用卡额度多少元'
						}
					]
				},
				{
					items: [
						{
							icon: '/static/img/my-img/b12.png',
							title: '芝麻信用',
							tips: '724积分待领取',
							dot: true
						},

						{
							icon: '/static/img/my-img/b13.png',
							title: '蚂蚁保'
						},
						{
							icon: '/static/img/my-img/b14.png',
							title: '借呗'
						},
						{
							icon: '/static/img/my-img/b15.png',
							title: '网商银行'
						}
					]
				},
				{
					items: [
						{
							icon: '/static/img/my-img/b16.png',
							title: '支付宝公益'
						}
					]
				}
			],
			userData: {}
		};
	},

	onShow() {
		this.$api.userInfo({}, (res) => {
			this.userData = res.data;
		});
	},
	methods: {
		Go(e) {
			uni.navigateTo({
				url: e
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f5f5f5;
}
.main {
	background-image: url('../../static/img/index-img/15.png');
	padding-top: 20rpx;
	.seting {
		display: flex;
		justify-content: flex-end;
		padding: 0 15rpx;
		image {
			width: 40rpx;
			height: 40rpx;
			margin: 0 15rpx;
		}
	}
	.user-info {
		margin: 35rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.info-left {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.avater {
				width: 106rpx;
				height: 106rpx;
				border-radius: 10rpx;
			}
			.info {
				margin-left: 17rpx;
				.name {
					font-size: 32rpx;
					font-weight: bold;
					color: #ffffff;
					margin-bottom: 6rpx;
				}
				.tel {
					font-size: 22rpx;
					font-weight: 400;
					color: #98c0ff;
				}
			}
		}

		.info-right {
			width: 12rpx;
			height: 23rpx;
		}
	}
	.my-box {
		background-color: #f5f5f5;
		border-radius: 20rpx 20rpx 0 0;
		padding: 15rpx 0;
		.block {
			margin: 15rpx 20rpx;
			background-color: #fff;
			border-radius: 15rpx;
			padding: 17rpx 0;
			.block-small {
				padding: 0 20rpx;
				.item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin: 17rpx 0;
					.small-left {
						font-size: 30rpx;
						font-weight: 400;
						color: #333333;
						display: flex;
						align-items: center;
						.left-icon {
							width: 44rpx;
							height: 44rpx;
							margin-right: 20rpx;
						}
					}

					.small-right {
						display: flex;
						align-items: center;
						.small-tips {
							font-size: 24rpx;
							font-weight: 400;
							margin-right: 7rpx;
						}
						.small-dot {
							width: 15rpx;
							height: 15rpx;
							background: #e84c50;
							border-radius: 50%;
							margin-right: 7rpx;
						}
						.yjt {
							width: 10rpx;
							height: 20rpx;
						}
					}
				}
				.line {
					border-bottom: 1px solid #eeeeee;
				}
			}
		}
	}
}
</style>
