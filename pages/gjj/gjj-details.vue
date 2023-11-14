<template>
	<view class="main">
		<nav :style="{ height: $store.state.BH + 10 + 'px' }"></nav>
		<view class="top-nav">
			<image class="logo" src="/static/img/gjj-img/779.png" mode=""></image>
			<view class="jiaonang" :style="{ top: $store.state.BH + 20 + 'px' }" @click="GoHome">
				<image class="sc" src="/static/img/gjj-img/887.png" mode=""></image>
				<image class="jn" src="/static/img/gjj-img/46.png" mode=""></image>
			</view>
		</view>
		<view class="money">
			<view class="top">
				<view class="top-left">
					<view class="top-left-top">
						余额（元）
						<image src="/static/img/gjj-img/byj.png" v-if="byj" @click="showData"></image>
						<image src="/static/img/gjj-img/zyj.png" class="zyj" v-else @click="showData"></image>
					</view>
					<view class="top-right-bottom" v-if="byj">******</view>
					<view class="top-right-bottom" v-else>{{ datadata.balance }}</view>
				</view>
				<view class="user-status" v-if="isLoginTwo">
					<view class="dot"></view>
					正常缴存
				</view>
				<view class="top-right" v-else @click="getUser">点击登录</view>
			</view>
			<view class="bottom">
				<view class="bottom-item" @click="GoTo('/pages/gjj/gjj-detail-list?tabIndex=1')">
					<view class="bottom-top">最近缴存（元）</view>
					<view class="bottom-middle" v-if="byj">
						******
						<image src="/static/img/gjj-img/yjt3.png" mode=""></image>
					</view>
					<view class="bottom-middle" v-else>
						{{ datadata.new_in }}
						<image src="/static/img/gjj-img/yjt3.png" mode=""></image>
					</view>
					<view class="bottom-bottom" v-if="byj">---</view>
					<view class="bottom-bottom" v-else>{{ datadata.new_in_time }} 缴存</view>
				</view>
				<view class="bottom-item" @click="GoTo('/pages/gjj/gjj-detail-list?tabIndex=2')">
					<view class="bottom-top">最近提取（元）</view>
					<view class="bottom-middle" v-if="byj">
						******
						<image src="/static/img/gjj-img/yjt3.png" mode=""></image>
					</view>
					<view class="bottom-middle" v-else>
						{{ datadata.new_out }}
						<image src="/static/img/gjj-img/yjt3.png" mode=""></image>
					</view>
					<view class="bottom-bottom" v-if="byj">---</view>
					<view class="bottom-bottom" v-else>{{ datadata.new_out_time }} 提取</view>
				</view>
			</view>
		</view>
		<view class="content-title">
			<view class="left">
				<view class="before"></view>
				<view class="title">热门服务</view>
			</view>
		</view>
		<view class="hot-servers">
			<view class="hot-servers-item" v-for="(item, index) in HotServers" :key="index" @click="Go(item.url)">
				<image :src="item.icon" mode=""></image>
				{{ item.name }}
			</view>
		</view>
		<view class="content-title">
			<view class="left">
				<view class="before"></view>
				<view class="title">城市服务</view>
			</view>
			<view class="right">
				查看更多
				<image src="/static/img/gjj-img/843.png" mode=""></image>
			</view>
		</view>
		<view class="city-server">
			<image class="icon" src="/static/img/gjj-img/113.png"></image>
			上海市住房公积金服务
			<image class="more" src="/static/img/gjj-img/780.png" mode=""></image>
		</view>
		<image class="bottom-banner" src="/static/img/gjj-img/1118.png" mode=""></image>
		<view class="bottom-center">
			<view class="p">该信息来源于上海市公积金管理中心</view>
			<view class="p">中心电话：12329</view>
		</view>
		<tabBar :index="0"></tabBar>
	</view>
</template>

<script>
import tabBar from '@/components/gjj-tabBar/gjj-tabBar2.vue';
export default {
	components: {
		tabBar
	},
	data() {
		return {
			byj: true,
			isLoginTwo: false,
			HotServers: [
				{
					icon: '/static/img/gjj-img/zhxx.png',
					name: '账户信息'
				},
				{
					icon: '/static/img/gjj-img/dkxx.png',
					name: '贷款信息'
				},
				{
					icon: '/static/img/gjj-img/gszk.png',
					name: '个税折扣填报信息'
				},
				{
					icon: '/static/img/gjj-img/zyjx.png',
					name: '转移接续',
					url: '/pages/gjj/gjj-zhuanyi'
				}
			],
			userData: {},
			datadata: {}
		};
	},
	onLoad() {
		if (this.$store.state.isLoginTwo) {
			this.getUser();
		}
	},
	methods: {
		Go(e) {
			if (e) {
				uni.navigateTo({
					url: e
				});
			}
		},
		GoTo(e) {
			if (this.isLoginTwo) {
				if (e) {
					uni.navigateTo({
						url: e
					});
				}
			}
		},
		GoHome() {
			uni.reLaunch({
				url: '/pages/index/index'
			});
		},
		showData() {
			if (this.$store.state.isLoginTwo) {
				this.byj = !this.byj;
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
	}
};
</script>

<style lang="scss">
.main {
	.top-nav {
		position: relative;
		padding: 15rpx 20rpx;
		.logo {
			width: 505rpx;
			height: 104rpx;
		}
		.jiaonang {
			position: fixed;
			right: 30rpx;
			top: 15rpx;
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
	.money {
		background-image: url('../../static/img/gjj-img/bg1.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: 30rpx;
		padding: 36rpx 28rpx;
		.top {
			align-items: center;
			display: flex;
			.top-left {
				width: 50%;
				.top-left-top {
					align-items: center;
					display: flex;
					font-size: 24rpx;
					color: #ffffff;
					font-weight: 400;
					image {
						margin-left: 60rpx;
						width: 43rpx;
						height: 23rpx;
					}
					.zyj {
						width: 43rpx;
						height: 25rpx;
					}
				}
				.top-right-bottom {
					font-size: 52rpx;
					font-weight: 400;
					color: #ffffff;
					margin-top: 7rpx;
				}
			}

			.top-right {
				padding: 17rpx 90rpx;
				background: #284cc7;
				border: 1px solid #4988e9;
				border-radius: 34rpx;
				font-size: 24rpx;
				color: #ffffff;
			}
			.user-status {
				display: flex;
				align-items: center;
				flex: 1;
				padding-right: 30rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #ffffff;
				justify-content: flex-end;
				.dot {
					width: 6rpx;
					height: 6rpx;
					background: #24ff91;
					opacity: 1;
					display: inline-block;
					border-radius: 34rpx;
					margin-right: 13rpx;
				}
			}
		}
		.bottom {
			display: flex;
			align-items: center;
			margin-top: 49rpx;
			.bottom-item {
				width: 50%;
				.bottom-top {
					font-size: 24rpx;
					color: #ffffff;
					font-weight: 400;
				}
				.bottom-middle {
					font-size: 28rpx;
					color: #ffffff;
					font-weight: 400;
					display: flex;
					align-items: center;
					margin: 27rpx 0 22rpx;
					image {
						width: 18rpx;
						height: 33rpx;
						margin-left: 100rpx;
					}
				}
				.bottom-bottom {
					font-size: 28rpx;
					font-weight: 400;
					color: #ffffff;
				}
			}
		}
	}
	.content-title {
		padding: 0 67rpx 0 30rpx;
		padding-top: 32rpx;
		display: flex;
		justify-content: space-between;
		.left {
			display: flex;
			align-items: center;
			.before {
				margin-right: 20rpx;
				width: 8rpx;
				height: 28rpx;
				background: linear-gradient(180deg, #284cc7 0%, #3874f6 100%);
			}
			.title {
				font-size: 31rpx;
				font-weight: 800;
				color: #000000;
			}
		}
		.right {
			font-size: 28rpx;
			font-weight: 400;
			color: #153f9a;
			display: flex;
			align-items: center;
			image {
				width: 32rpx;
				height: 14rpx;
			}
		}
	}
	.hot-servers {
		display: flex;
		justify-content: space-evenly;
		margin: 42rpx 0;
		.hot-servers-item {
			font-size: 27rpx;
			font-weight: 400;
			color: #333333;
			width: 111rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			image {
				width: 95rpx;
				height: 95rpx;
				margin-top: 22rpx;
			}
		}
	}
	.city-server {
		font-size: 24rpx;
		margin: 35rpx 30rpx;
		font-weight: 400;
		color: #365492;
		border-radius: 5rpx;
		background: #f4f8fb;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 27rpx 0;
		.icon {
			width: 64rpx;
			height: 64rpx;
		}
		.more {
			width: 34rpx;
			height: 34rpx;
		}
	}
	.bottom-banner {
		margin: 38rpx 30rpx 83rpx;
		width: 690rpx;
		height: 201rpx;
	}
	.bottom-center {
		font-size: 24rpx;
		font-weight: 400;
		color: #666666;
		text-align: center;
		line-height: 38rpx;
		padding-bottom: 36rpx;
	}
}
</style>
