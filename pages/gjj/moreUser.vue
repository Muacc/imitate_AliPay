<template>
	<view class="main">
		<navBar Title="更多账户"></navBar>

		<view class="items">
			<view class="item">
				<view class="title">
					<view class="left">
						<view class="before-block"></view>
						住房公积金账户
					</view>
					<view class="right">设置主账户</view>
				</view>
				<view class="line"></view>
				<view class="user">
					<view class="left">
						<view class="left-top">
							{{ datadata.gjj_manage_name }}
							<view class="tag">正常缴存</view>
						</view>
						<view class="left-bottom">
							{{ datadata.gjj_manage_code }}
						</view>
					</view>
					<image class="right" src="/static/img/gjj-img/786.png" mode=""></image>
				</view>
			</view>
			<view class="backGround"></view>
			<view class="item">
				<view class="title">
					<view class="left">
						<view class="before-block"></view>
						贷款账户
					</view>
					<view class="right"></view>
				</view>
			</view>
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
		return {
			topH: '',
			datadata: {}
		};
	},
	onLoad() {
		this.getData();
	},
	methods: {
		getData() {
			let that = this;
			that.$api.userInfo({}, (res) => {
				if (res.status) {
					that.$api.accountdata({ user_id: res.data.id }, (req) => {
						this.datadata = req.data;
					});
				}
			});
		}
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
	}
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
	.items {
		.item {
			margin: 0 22rpx;
			.title {
				padding: 25rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left {
					display: flex;
					align-items: center;
					font-size: 32rpx;
					font-weight: 800;
					color: #000000;
					.before-block {
						margin-right: 16rpx;
						width: 8rpx;
						height: 28rpx;
						background: linear-gradient(180deg, #284cc7 0%, #3874f6 100%);
					}
				}
				.right {
					font-size: 26rpx;
					font-weight: 400;
					color: #999999;
				}
			}
			.line {
				width: 707rpx;
				height: 3rpx;
				border-top: 1px solid #d5d5d5;
			}
			.user {
				padding: 27rpx 0 20rpx 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left {
					.left-top {
						display: flex;
						align-items: center;
						font-size: 30rpx;
						font-weight: bold;
						color: #2251d3;
						.tag {
							margin-left: 40rpx;
							font-size: 26rpx;
							font-weight: bold;
							color: #2251d3;
						}
					}
					.left-bottom {
						font-weight: bold;
						font-size: 30rpx;
						color: #666666;
						margin-top: 10rpx;
					}
				}
				.right {
					width: 88rpx;
					height: 44rpx;
				}
			}
		}
		.backGround {
			width: 750rpx;
			height: 23rpx;
			background: #f5f5f5;
		}
	}
}
</style>
