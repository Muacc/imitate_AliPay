<template>
	<view>
		<nav :style="{ height: $store.state.BH + 'px' }"></nav>
		<view class="nav">
			<image src="/static/img/my-img/fh.png" class="back" @click="back"></image>
			<view class="nav-title">设置</view>
			<view></view>
		</view>
		<view class="setup-main">
			<view class="setup-list" v-for="(item, index) in List" :key="index">
				<view class="list-item" v-for="(A, B) in item" :key="B">
					<image class="list-item-icon" :src="A.icon"></image>
					<view class="block-right">
						<view class="block-rihgt-top">
							<view class="list-item-left">
								{{ A.name }}
							</view>
							<view class="list-item-right">
								<view class="app-version" v-if="A.version">
									{{ A.version }}
								</view>
								<image class="yjt" src="/static/img/my-img/lh2.png" mode=""></image>
							</view>
						</view>
						<view class="line-x" v-if="B !== item.length - 1"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="account-operation">登录其他账号</view>
		<view class="account-operation" @click="logOut">退出登录</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			List: [
				[
					{
						icon: '/static/img/my-img/sz1.png',
						name: '账号与安全'
					},
					{
						icon: '/static/img/my-img/sz2.png',
						name: '支付设置'
					}
				],
				[
					{
						icon: '/static/img/my-img/sz3.png',
						name: '长辈模式'
					}
				],
				[
					{
						icon: '/static/img/my-img/sz4.png',
						name: '新消息通知'
					},
					{
						icon: '/static/img/my-img/sz5.png',
						name: '隐私'
					},
					{
						icon: '/static/img/my-img/sz6.png',
						name: '通用'
					}
				],
				[
					{
						icon: '/static/img/my-img/sz7.png',
						name: '反馈与投诉'
					},
					{
						icon: '/static/img/my-img/sz8.png',
						name: '关于',
						version: '版本号 10.5.18 '
					}
				]
			]
		};
	},
	methods: {
		back() {
			uni.navigateBack();
		},
		logOut() {
			uni.removeStorage({
				key: 'userToken',
				success() {
					uni.reLaunch({
						url: '/pages/my/my'
					});
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background: #f5f5f5;
}
.nav {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 27rpx;
	.back {
		width: 17rpx;
		height: 28rpx;
	}
	.nav-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #000000;
	}
}
.setup-main {
	.setup-list {
		background-color: #fff;
		margin: 11rpx 25rpx;
		border-radius: 15rpx;
		.list-item {
			display: flex;
			padding: 25rpx 0 25rpx 25rpx;
			.list-item-icon {
				width: 46rpx;
				height: 46rpx;
				margin-right: 24rpx;
			}

			.block-right {
				flex: 1;
				display: flex;
				flex-direction: column;
				.block-rihgt-top {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-right: 33rpx;
					.list-item-left {
						font-size: 32rpx;
						font-weight: 400;
						color: #333333;
					}
					.list-item-right {
						display: flex;
						align-items: center;
						.app-version {
							margin-right: 21rpx;
							font-size: 28rpx;
							font-weight: 400;
							color: #999999;
						}
						.yjt {
							width: 17rpx;
							height: 28rpx;
						}
					}
				}
				.line-x {
					border-bottom: 1px solid #eee;
					margin-top: 24rpx;
				}
			}
		}
	}
}
.account-operation {
	background-color: #fff;
	margin: 11rpx 25rpx;
	border-radius: 15rpx;
	text-align: center;
	padding: 25rpx 0;
}
</style>
