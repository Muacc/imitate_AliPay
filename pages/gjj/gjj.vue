<template>
	<view class="main">
		<view class="fixed">
			<nav :style="{ height: $store.state.BH + 10 + 'px' }"></nav>
			<view class="MP-nav">
				<view class="left">
					<image src="/static/img/gjj-img/home.png"></image>
					公积金
				</view>
				<view class="right">
					<image class="sc" src="/static/img/gjj-img/sc.png"></image>
					<image class="jn" src="/static/img/gjj-img/jn.png"></image>
				</view>
			</view>
		</view>
		<view class="block" :style="{ height: $store.state.BH + 10 + 'px' }"></view>
		<view class="userInfo">
			<image src="/static/img/gjj-img/bg.png" class="bg" mode=""></image>
			<view class="info-box">
				<view class="left">
					<view class="h3" v-if="!isShowData">您好，{{ userData.username }}</view>
					<view class="h3" v-else>您好，{{ userData.true_name }}</view>
					<view class="h5" v-if="!isShowData">账号:****</view>
					<view class="h5" v-else>账号:{{ userData.account }}</view>
				</view>
				<image class="right" v-if="!isShowData" src="/static/img/gjj-img/by.png" @click="changeYJ"></image>
				<image class="right zy" v-else src="/static/img/gjj-img/zy.png" @click="changeYJ"></image>
			</view>
			<view class="info-money">
				<view class="item" v-if="isShowData">
					<view class="title">账户余额</view>
					{{ userData.balance }}元
				</view>
				<view class="item" v-else>
					<view class="title">账户余额</view>
					*** 元
				</view>
				<view class="item" v-if="isShowData">
					<view class="title">当月账户缴额</view>
					{{ userData.pay_money }}元
				</view>
				<view class="item" v-else>
					<view class="title">当月账户缴额</view>
					*** 元
				</view>
			</view>
		</view>
		<view class="data" v-if="!isShowData">
			<view class="item">
				<view class="left">证件类型</view>
				<view class="right">身份证</view>
			</view>
			<view class="item-line"></view>
			<view class="item">
				<view class="left">身份证号</view>
				<view class="right">**************{{ userData.cert_number.slice(14) }}</view>
			</view>
			<view class="item-line"></view>
			<view class="item">
				<view class="left">账户状态</view>
				<view class="right">--</view>
			</view>
			<view class="item-line"></view>
			<view class="item">
				<view class="left">开户日期</view>
				<view class="right">--</view>
			</view>
			<view class="item-line"></view>
			<view class="item">
				<view class="left">末次汇款月份</view>
				<view class="right">--</view>
			</view>
			<view class="item-line"></view>
			<view class="item">
				<view class="left">缴存网点</view>
				<view class="right">--</view>
			</view>
			<view class="item-line"></view>
			<view v-if="isexpand">
				<view class="item">
					<view class="left">累计缴存</view>
					<view class="right">--</view>
				</view>
				<view class="item-line"></view>
				<view class="item">
					<view class="left">累计支出</view>
					<view class="right">--</view>
				</view>
				<view class="item-line"></view>
				<view class="item">
					<view class="left">单位账号</view>
					<view class="right">--</view>
				</view>
				<view class="item-line"></view>
				<view class="item">
					<view class="left">当前所在单位</view>
					<view class="right">--</view>
				</view>
				<view class="item-line"></view>
			</view>
			<view class="expand" v-if="!isexpand">
				<view class="click-expand" @click="changeExpand">
					展开
					<image src="/static/img/gjj-img/xjt.png"></image>
				</view>
				<view class="expand-tips">*该页面显示的身份证件为实名认证时的身份证件。</view>
			</view>
			<view class="expand" v-else>
				<view class="click-expand" @click="changeExpand">
					收起
					<image class="tsq" src="/static/img/gjj-img/xjt.png"></image>
				</view>
				<view class="expand-tips">*该页面显示的身份证件为实名认证时的身份证件。</view>
			</view>
		</view>
		<view class="data" v-else>
			<view class="item">
				<view class="left">证件类型</view>
				<view class="right">身份证</view>
			</view>
			<view class="item-line"></view>
			<view class="item">
				<view class="left">身份证号</view>
				<view class="right">{{ userData.cert_number || '' }}</view>
			</view>
			<view class="item-line"></view>
			<view class="item">
				<view class="left">账户状态</view>
				<view class="right">正常</view>
			</view>
			<view class="item-line"></view>
			<view class="item">
				<view class="left">开户日期</view>
				<view class="right">{{ userData.open_account || '' }}</view>
			</view>
			<view class="item-line"></view>
			<view class="item">
				<view class="left">末次汇款月份</view>
				<view class="right">{{ userData.end_payment || '' }}</view>
			</view>
			<view class="item-line"></view>
			<view class="item">
				<view class="left">缴存网点</view>
				<view class="right">{{ userData.branch || '' }}</view>
			</view>
			<view class="item-line"></view>
			<view v-if="isexpand">
				<view class="item">
					<view class="left">累计缴存</view>
					<view class="right">{{ userData.accumulative_input || '' }}</view>
				</view>
				<view class="item-line"></view>
				<view class="item">
					<view class="left">累计支出</view>
					<view class="right">{{ userData.accumulative_output || '' }}</view>
				</view>
				<view class="item-line"></view>
				<view class="item">
					<view class="left">单位账号</view>
					<view class="right">{{ userData.company_account || '' }}</view>
				</view>
				<view class="item-line"></view>
				<view class="item">
					<view class="left">当前所在单位</view>
					<view class="right">{{ userData.company_name || '' }}</view>
				</view>
				<view class="item-line"></view>
			</view>
			<view class="expand" v-if="!isexpand">
				<view class="click-expand" @click="changeExpand">
					展开
					<image src="/static/img/gjj-img/xjt.png"></image>
				</view>
				<view class="expand-tips">*该页面显示的身份证件为实名认证时的身份证件。</view>
			</view>
			<view class="expand" v-else>
				<view class="click-expand" @click="changeExpand">
					收起
					<image class="tsq" src="/static/img/gjj-img/xjt.png"></image>
				</view>
				<view class="expand-tips">*该页面显示的身份证件为实名认证时的身份证件。</view>
			</view>
		</view>
		<view class="other">
			<view class="other-item" v-for="(item, index) in otherItem" :key="index" @click="Go(item.url)">
				<image class="other-icon" :src="item.icon"></image>
				<view class="other-middle">
					<view class="other-title">
						{{ item.title }}
					</view>
					{{ item.subtitle }}
				</view>
				<image class="yjt" src="/static/img/index-img/yjt.png"></image>
			</view>
		</view>
		<view class="related-services">
			<view class="title">相关服务</view>
			<view class="for-box">
				<view class="item" v-for="(item, index) in relatedServices" :key="index">
					{{ item }}
					<image src="/static/img/my-img/yjt6.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userData: {},
			isShowData: false,
			isexpand: false,
			otherItem: [
				{
					icon: '/static/img/gjj-img/1.png',
					title: '补充住房公积金账户信息',
					subtitle: '账户信息查询'
				},
				{
					icon: '/static/img/gjj-img/2.png',
					title: '住房公积金账户明细查询',
					subtitle: '具体明细查询',
					url: '/pages/gjj/gjj-details'
				},
				{
					icon: '/static/img/gjj-img/3.png',
					title: '补充住房公积金账户明细查询',
					subtitle: '具体明细查询'
				}
			],
			relatedServices: [
				'提取住房公积金支付房屋租赁费用',
				'住房公积金基本账户信息',
				'公积金缴存',
				'公积金贷款试算',
				'公积金里面缴存查询',
				'离退休提取',
				'完全或大部分丧失劳动能力提取',
				'自愿缴存协议期满提取',
				'公积金还款计算',
				'公积金缴存试算',
				'纯公积金贷款受理网点查询'
			]
		};
	},
	async onLoad() {
		await this.getUserInfo();
	},
	methods: {
		Go(e) {
			if (e) {
				uni.navigateTo({
					url: e
				});
			}
		},
		changeYJ() {
			this.isShowData = !this.isShowData;
		},
		getUserInfo() {
			this.$api.userInfo({}, (res) => {
				this.userData = res.data;
			});
		},
		changeExpand() {
			this.isexpand = !this.isexpand;
		}
	}
};
</script>

<style lang="scss">
.main {
	.fixed {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		background-color: #fff;
		z-index: 10;
		.MP-nav {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 15rpx 30rpx;
			.left {
				display: flex;
				align-items: center;
				font-size: 34rpx;
				font-weight: bold;
				color: #000000;
				image {
					margin: 0 12rpx;
					width: 33rpx;
					height: 35rpx;
				}
			}
			.right {
				display: flex;
				align-items: center;
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
	.block {
		margin-bottom: 82rpx;
	}
	.userInfo {
		position: relative;
		padding: 32rpx;
		.bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
		}

		.info-box {
			align-items: center;
			justify-content: space-between;
			display: flex;
			.left {
				.h3 {
					font-weight: 400;
					color: #ffffff;
					font-size: 56rpx;
				}
				.h5 {
					font-size: 28rpx;
					font-weight: 400;
					color: #ffffff;
				}
			}
			.right {
				width: 39rpx;
				height: 17rpx;
			}
			.zy {
				width: 39rpx;
				height: 26rpx;
			}
		}
		.info-money {
			display: flex;
			justify-content: space-between;
			margin-top: 57rpx;
			.item {
				font-size: 28rpx;
				font-weight: 400;
				color: #ffffff;
				.title {
					font-size: 41rpx;
				}
			}
		}
	}
	.data {
		.item {
			display: flex;
			padding: 30rpx;
			justify-content: space-between;
			align-items: center;
			.left {
				font-size: 34rpx;
				font-weight: 400;
				color: #333333;
			}
			.right {
				color: #999999;
				font-weight: 400;
				font-size: 32rpx;
			}
		}
		.item-line {
			border-bottom: 1px solid #ededed;
		}
		.expand {
			text-align: center;
			.click-expand {
				margin: 20rpx 0 15rpx 0;
				font-size: 28rpx;
				font-weight: 400;
				color: #000000;
				image {
					width: 35rpx;
					height: 22rpx;
					margin-left: 11rpx;
				}
				.tsq {
					transform: rotate(180deg);
				}
			}
			.expand-tips {
				font-size: 28rpx;
				font-weight: 400;
				color: #cab385;
			}
		}
	}
	.other {
		.other-item {
			margin-top: 100rpx;
			padding: 0 64rpx 0 73rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.other-icon {
				width: 55rpx;
				height: 55rpx;
				margin-right: 38rpx;
			}
			.other-middle {
				flex: 1;
				font-size: 28rpx;
				color: #999999;
				font-weight: 400;
				.other-title {
					font-size: 32rpx;
					font-weight: bold;
					color: #333333;
				}
			}

			.yjt {
				width: 16rpx;
				height: 25rpx;
			}
		}
	}
	.related-services {
		margin: 60rpx 63rpx 0;
		.title {
			font-size: 36rpx;
			font-weight: 800;
			color: #000000;
		}
		.for-box {
			margin-top: 18rpx;
			.item {
				padding: 42rpx 0;
				border-bottom: 1px solid #f4f4f4;
				display: flex;
				align-items: center;
				justify-content: space-between;
				image {
					width: 16rpx;
					height: 25rpx;
				}
			}
		}
	}
}
</style>
