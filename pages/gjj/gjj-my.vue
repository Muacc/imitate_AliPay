<template>
	<view class="main">
		<view class="top-nav" ref="topNav">
			<nav :style="{ height: $store.state.BH + 10 + 'px' }"></nav>
			<view class="jiaonang" :style="{ top: $store.state.BH + 20 + 'px' }">
				<view class="left" @click="back()">
					<image src="/static/img/gjj-img/zzz.png" mode=""></image>
					我的账户
				</view>
				<view class="right">
					<image class="sc" src="/static/img/gjj-img/887.png" mode=""></image>
					<image class="jn" src="/static/img/gjj-img/46.png" mode=""></image>
				</view>
			</view>
		</view>
		<view :style="{ height: Math.floor(topH) + 'px' }"></view>
		<view class="user-box" v-if="!isLoginTwo">
			<image src="/static/img/gjj-img/nologin.png" mode=""></image>
			<view class="no-login" @click="getUser">请登录</view>
		</view>
		<view class="user-box-2" v-else>
			<view class="postion">
				<view class="dot"></view>
				正常缴存
			</view>
			<view class="user-top">
				<image class="avatar" :src="userData.avatar"></image>
				<view class="info">
					<view class="name">
						{{ datadata.username }}
					</view>
					<view class="code">账户： {{ userData.account }}</view>
				</view>
			</view>
			<view class="user-middle">缴存单位：{{ datadata.company_name }}</view>
			<view class="user-bottom">
				<view class="item">
					{{ datadata.gjj_base }} 元
					<view class="item-name">缴存基数</view>
				</view>
				<view class="item">
					{{ datadata.gjj_gr_rate }} % / {{ datadata.gjj_gs_rate }} %
					<view class="item-name">个人/单位存缴比例</view>
				</view>
			</view>
		</view>
		<view class="items">
			<view class="item" @click="Go('/pages/gjj/moreUser')">
				<view class="left">
					<image src="/static/img/gjj-img/moreuser.png" mode=""></image>
					更多账户
				</view>
				<view class="right">
					<image class="yjt" src="/static/img/my-img/zjt.png" mode=""></image>
				</view>
			</view>
			<view class="item">
				<view class="left">
					<image src="/static/img/gjj-img/sz.png" mode=""></image>
					设置
				</view>
				<view class="right">
					开启关爱版
					<image class="yjt" src="/static/img/my-img/zjt.png" mode=""></image>
				</view>
			</view>
		</view>
		<tabBar :index="2"></tabBar>
	</view>
</template>

<script>
import tabBar from '@/components/gjj-tabBar/gjj-tabBar2.vue';
export default {
	components: {
		tabBar
	},
	data() {
		return { topH: '', isLoginTwo: false, userData: {}, datadata: {} };
	},
	onLoad() {
		if (this.$store.state.isLoginTwo) {
			this.getUser();
		}
	},
	methods: {
		back() {
			uni.navigateBack();
		},
		Go(e) {
			if (e) {
				uni.navigateTo({
					url: e
				});
			}
		},
		getUser() {
			this.$api.userInfo({}, (res) => {
				this.userData = res.data;
				this.isLoginTwo = true;
				this.$store.state.isLoginTwo = true;
				this.getData();
			});
		},
		getData() {
			this.$api.accountdata(
				{
					user_id: this.userData.id
				},
				(res) => {
					this.datadata = res.data;
				}
			);
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
	background-image: url('../../static/img/gjj-img/bg1.png');
	background-size: 100% 400rpx;
	background-repeat: no-repeat;
	.top-nav {
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
				line-height: 1.2;
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
	.user-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 10rpx 28rpx 30rpx;
		padding: 66rpx 0 87rpx;
		text-align: center;
		background-color: #fff;
		box-shadow: 0rpx 3rpx 20rpx rgba(121, 143, 190, 0.28);
		border-radius: 10rpx;
		image {
			width: 128rpx;
			height: 128rpx;
		}
		.no-login {
			font-size: 31rpx;
			font-weight: 400;
			color: #ffffff;
			width: 356rpx;
			padding: 16rpx 0;
			background: linear-gradient(90deg, #1d45c4 0%, #7799f2 100%);
			border-radius: 38rpx;
			margin-top: 43rpx;
		}
	}
	.user-box-2 {
		margin: 10rpx 28rpx 30rpx;
		padding: 23rpx 0 35rpx 28rpx;
		background-color: #fff;
		box-shadow: 0rpx 3rpx 20rpx rgba(121, 143, 190, 0.28);
		border-radius: 10rpx;
		position: relative;
		.postion {
			position: absolute;
			padding: 10rpx 37rpx;
			right: 0;
			top: 30rpx;
			display: flex;
			align-items: center;
			border-radius: 30rpx 0rpx 0rpx 30rpx;
			background: #153f9a;
			font-size: 28rpx;
			font-weight: 400;
			color: #ffffff;
			.dot {
				margin-right: 15rpx;
				width: 12rpx;
				height: 12rpx;
				background: #24ff91;
				opacity: 1;
				border-radius: 34rpx;
			}
		}
		.user-top {
			display: flex;
			.avatar {
				width: 112rpx;
				height: 112rpx;
			}
			.info {
				margin-left: 46rpx;
				.name {
					margin-bottom: 26rpx;
					font-size: 40rpx;
					color: #333333;
					font-weight: bold;
				}
				.code {
					font-size: 28rpx;
					color: #333333;
					font-weight: 400;
				}
			}
		}

		.user-middle {
			font-size: 28rpx;
			font-weight: 400;
			color: #333333;
			margin: 50rpx 0 35rpx;
		}
		.user-bottom {
			display: flex;
			.item {
				flex: 1;
				font-size: 40rpx;
				font-weight: bold;
				color: #333333;
				.item-name {
					font-weight: 400;
					font-size: 28rpx;
					margin-top: 9rpx;
				}
			}
		}
	}

	.items {
		.item {
			padding: 25rpx 0;
			margin: 0 33rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			border-bottom: 1px solid #d5d5d5;
			.left {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				font-weight: 400;
				color: #323232;
				image {
					width: 47rpx;
					height: 47rpx;
					margin-right: 20rpx;
				}
			}
			.right {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				font-weight: 400;
				color: #666666;
				.yjt {
					display: flex;
					align-items: center;
					width: 13rpx;
					height: 22rpx;
					transform: rotate(180deg);
					margin-left: 35rpx;
				}
			}
		}
	}
}
</style>
