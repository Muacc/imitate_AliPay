<template>
	<view class="APP">
		<navbar Title="三金账单"></navbar>
		<view class="Main">
			<view class="img-title">
				<view class="img-title2">
					<view class="it1"></view>
					<view class="it2"></view>
					<view class="line-x">
						<view class="round1"></view>
						<view class="line"></view>
						<view class="round2"></view>
					</view>
					<view class="pos-block">
						<view class="bill">
							<view class="big-title">
								三金账单
								<image src="/static/img/gjj-img/a11.png" v-if="!Show" @click="ShowMoney"></image>
								<image src="/static/img/gjj-img/a10.png" v-else @click="ShowMoney"></image>
							</view>
							<view class="small-title">一键查询，更方便</view>
							<view v-if="Show">
								<view class="GoldItem">
									<view class="ItemTitle">
										<view class="TitleLeft">
											<image src="/static/6016.png" mode="widthFix"></image>
											<text>养老金</text>
										</view>
										<view class="TitleRight">
											<text>订阅</text>
											<u-icon name="arrow-right" color="#B9B9B9" size="18"></u-icon>
										</view>
									</view>
									<view class="ItemInfo">
										<view class="InfoLeft">
											<text>***</text>
											累计缴费月数
										</view>
										<view class="InfoRight">
											<text>***</text>
											当年度个人缴纳金额
										</view>
									</view>
								</view>
								<view class="GoldItem">
									<view class="ItemTitle">
										<view class="TitleLeft">
											<image src="/static/6017.png" mode="widthFix"></image>
											<text>公积金</text>
										</view>
										<view class="TitleRight" @click="To">
											<text>查看详情</text>
											<u-icon name="arrow-right" color="#B9B9B9" size="18"></u-icon>
										</view>
									</view>
									<view class="ItemInfo">
										<view class="InfoLeft">
											<text>***</text>
											月缴额
										</view>
										<view class="InfoRight">
											<text>***</text>
											账户余额
										</view>
									</view>
								</view>
								<view class="GoldItem">
									<view class="ItemTitle">
										<view class="TitleLeft">
											<image src="/static/6018.png" mode="widthFix"></image>
											<text>医保金</text>
										</view>
										<view class="TitleRight">
											<text>查看详情</text>
											<u-icon name="arrow-right" color="#B9B9B9" size="18"></u-icon>
										</view>
									</view>
									<view class="ItemInfo">
										<view class="InfoLeft">
											<text>***</text>
											当年账户余额
										</view>
										<view class="InfoRight">
											<text>***</text>
											历年账户余额
										</view>
									</view>
								</view>
							</view>
							<view v-else>
								<view class="GoldItem">
									<view class="ItemTitle">
										<view class="TitleLeft">
											<image src="/static/6016.png" mode="widthFix"></image>
											<text>养老金</text>
										</view>
										<view class="TitleRight">
											<text>订阅</text>
											<u-icon name="arrow-right" color="#B9B9B9" size="18"></u-icon>
										</view>
									</view>
									<view class="ItemInfo">
										<view class="InfoLeft">
											<text>-</text>
											累计缴费月数
										</view>
										<view class="InfoRight">
											<text>-</text>
											当年度个人缴纳金额
										</view>
									</view>
								</view>
								<view class="GoldItem">
									<view class="ItemTitle">
										<view class="TitleLeft">
											<image src="/static/6017.png" mode="widthFix"></image>
											<text>公积金</text>
										</view>
										<view class="TitleRight" @click="To">
											<text>查看详情</text>
											<u-icon name="arrow-right" color="#B9B9B9" size="18"></u-icon>
										</view>
									</view>
									<view class="ItemInfo">
										<view class="InfoLeft">
											<text>{{ Data.pay_money }}元</text>
											月缴额
										</view>
										<view class="InfoRight">
											<text>{{ Data.balance }}元</text>
											账户余额
										</view>
									</view>
								</view>
								<view class="GoldItem">
									<view class="ItemTitle">
										<view class="TitleLeft">
											<image src="/static/6018.png" mode="widthFix"></image>
											<text>医保金</text>
										</view>
										<view class="TitleRight">
											<text>查看详情</text>
											<u-icon name="arrow-right" color="#B9B9B9" size="18"></u-icon>
										</view>
									</view>
									<view class="ItemInfo">
										<view class="InfoLeft">
											<text>-</text>
											当年账户余额
										</view>
										<view class="InfoRight">
											<text>-</text>
											历年账户余额
										</view>
									</view>
								</view>
							</view>
							<view class="more">
								<view class="more-title">
									<image src="/static/img/gjj-img/gd.png" mode=""></image>
									<view class="text">更多推荐</view>
									<image src="/static/img/gjj-img/gd.png" mode=""></image>
								</view>
								<view class="MoreItems">
									<view class="MoreItem">
										<image src="/static/6019.png" mode="widthFix"></image>
										实有人口信...
									</view>
									<view class="MoreItem">
										<image src="/static/6020.png" mode="widthFix"></image>
										我的不动产
									</view>
									<view class="MoreItem">
										<image src="/static/6021.png" mode="widthFix"></image>
										提前结清贷...
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import navbar from '@/components/gjj-navbar/gjj-navbar2.vue';
export default {
	components: {
		navbar
	},
	data() {
		return {
			Data: {},
			Show: true
		};
	},
	onLoad() {
		this.GetGold();
	},
	methods: {
		ShowMoney() {
			this.Show = !this.Show;
		},
		To() {
			uni.navigateTo({
				url: '/pages/CockGold/CockGold'
			});
		},
		GetGold() {
			this.$api.UserGold({}, (res) => {
				this.Data = res.data;
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background: #cbb687;
}
* {
	box-sizing: border-box;
}

.Main {
	.img-title {
		margin: 27rpx 9rpx 0;
		background: #bca674;
		border-radius: 16rpx;
		height: 32rpx;
		.img-title2 {
			margin: 0 20rpx;
			padding-top: 10rpx;
			.it1 {
				height: 11rpx;
				background: #ae9763;
				border-radius: 2rpx;
			}
			.it2 {
				height: 30rpx;
				background: #f3f0e9;
				border-radius: 2rpx;
			}
			.line-x {
				display: flex;
				align-items: center;
				background-color: #fff;
				position: relative;
				height: 36rpx;
				.round1 {
					position: absolute;
					left: -18rpx;
					width: 36rpx;
					height: 36rpx;
					border-radius: 50%;
					background-color: #cbb687;
				}
				.line {
					border-top: 1rpx dashed #ae9763;
					flex: 1;
				}
				.round2 {
					position: absolute;
					right: -18rpx;
					width: 36rpx;
					height: 36rpx;
					border-radius: 50%;
					background-color: #cbb687;
				}
			}
			.pos-block {
				position: relative;
				.bill {
					outline: none;
					border: none;
					background-color: #fff;
					padding: 50rpx 23rpx 0;
					.big-title {
						font-size: 38rpx;
						font-weight: bold;
						color: #333333;
						display: flex;
						align-items: center;
						margin-bottom: 15rpx;
						image {
							width: 42rpx;
							height: 42rpx;
							margin-left: 15rpx;
						}
					}
					.small-title {
						font-size: 24rpx;
						color: #b9b9b9;
						font-weight: 400;
					}
					.more {
						margin-top: 45rpx;
						height: 400rpx;
						.more-title {
							display: flex;
							align-items: center;
							justify-content: center;
							margin-bottom: 32rpx;
							.text {
								margin: 0 6rpx;
								font-size: 38rpx;
								font-weight: bold;
								color: #333333;
							}
							image {
								width: 45rpx;
								height: 19rpx;
							}
						}
					}
				}
			}
		}
	}
}

.GoldItem {
	padding: 57rpx 30rpx 40rpx 24rpx;
	border-bottom: 3rpx dashed rgba(185, 185, 185, 0.4);

	.ItemTitle {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.TitleLeft {
			display: flex;
			align-items: center;
			color: #333333;
			font-size: 28rpx;

			image {
				width: 60rpx;
				margin-right: 23rpx;
			}
		}

		.TitleRight {
			color: #b9b9b9;
			font-size: 24rpx;
			display: flex;
			align-items: center;
		}
	}

	.ItemInfo {
		display: flex;
		font-size: 24rpx;
		color: #333333;
		padding: 33rpx 0 0 0;

		.InfoLeft {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;

			text {
				font-size: 40rpx;
				color: #806752ff;
				margin-bottom: 13rpx;
			}
		}

		.InfoRight {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;

			text {
				margin-bottom: 13rpx;
				font-size: 40rpx;
				color: #806752ff;
			}
		}
	}
}

.MoreItems {
	display: flex;

	.MoreItem {
		flex: 1;
		display: flex;
		align-items: center;
		flex-direction: column;
		color: #333333;
		font-size: 27rpx;
		text-align: center;

		image {
			margin-bottom: 20rpx;
			width: 60rpx;
		}
	}
}
</style>
