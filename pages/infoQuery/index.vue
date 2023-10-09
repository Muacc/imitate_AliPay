<template>
	<view class="main">
		<navBar Title="信息查询授权"></navBar>
		<view class="empower">
			<view class="person">
				<view class="before-block"></view>
				个人授权
			</view>
			<view class="item" v-for="(A, B) in List" :key="B" @click="Go(A.url)">
				<view class="icon-box">
					<image class="icon" :src="A.img" mode=""></image>
				</view>
				<view class="info">
					<view class="title">
						{{ A.title }}
					</view>
					{{ A.content }}
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
			List: [
				{
					img: '/static/img/gjj-img/query1.png',
					title: '授权住房公积金管理机构查询本人信息',
					content: '授权相关住房公积金管理机构在办理业务时查询本人住房公积金信息'
				},
				{
					img: '/static/img/gjj-img/query2.png',
					title: '授权征信系统接入机构查询本人信息',
					url: '/pages/infoQuery/credit',
					content: '授权接入人民银行征信系统的相关金融机构（银行、保险等）在办理授信业务时查询本人住房公积金信息'
				}
			]
		};
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
.main {
	.empower {
		background-color: #f7f8f9;
		.person {
			font-size: 32rpx;
			font-weight: 800;
			color: #000000;
			display: flex;
			align-items: center;
			padding-left: 32rpx;
			padding-top: 43rpx;
			.before-block {
				background: linear-gradient(180deg, #284cc7 0%, #3874f6 100%);
				width: 8rpx;
				height: 28rpx;
				margin-right: 16rpx;
			}
		}

		.item {
			background-color: #fff;
			margin: 11rpx 30rpx;
			display: flex;
			align-items: center;
			padding: 33rpx 40rpx 35rpx 45rpx;
			border-radius: 5rpx;
			.icon-box {
				.icon {
					width: 68rpx;
					height: 68rpx;
				}
			}

			.info {
				margin-left: 35rpx;
				font-size: 22rpx;
				color: #666666;
				font-weight: 400;
				.title {
					font-size: 28rpx;
					font-weight: 400;
					color: #000000;
				}
			}
		}
	}
}
</style>
