<template>
	<view class="Content">
		<navbar Title="更多服务"></navbar>
		<view class="Main">
			<view class="TopSearch">
				<u-search placeholder="搜索服务、事项" height="58rpx" :showAction="false" shape="square" v-model="keyword"></u-search>
			</view>
			<view class="CollectTitle">
				我的收藏
				<view class="Edit">编辑</view>
			</view>
			<view class="Collect">
				<view class="CollectItem" v-for="(A, B) in ImgList3" :key="B" @click="Go(A.path)">
					<image :src="A.src" mode="widthFix"></image>
					<text>{{ A.name }}</text>
				</view>
			</view>

			<view class="Segmented">
				<scroll-view scroll-x="true">
					<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text" activeColor="#4cd964"></uni-segmented-control>
				</scroll-view>
				<view class="ControlList">
					<view class="ControlItem" v-for="(A, B) in ImgList" :key="B">
						<image :src="A.src" mode="widthFix"></image>
						<text>{{ A.name }}</text>
					</view>
				</view>
				<view class="ControlTitle">文化教育</view>
				<view class="ControlList">
					<view class="ControlItem" v-for="(A, B) in ImgList4" :key="B">
						<image :src="A.src" mode="widthFix"></image>
						<text>{{ A.name }}</text>
					</view>
				</view>
				<view class="ControlTitle">社会保障</view>
				<view class="ControlList">
					<view class="ControlItem" v-for="(A, B) in ImgList2" :key="B" @click="Go(A.path)">
						<image :src="A.src" mode="widthFix"></image>
						<text>{{ A.name }}</text>
					</view>
				</view>
				<view style="height: 200rpx"></view>
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
			current: 0,
			keyword: '',
			items: ['婚育婴幼', '文化教育', '旅游休闲', '社会保障', '劳动就业'],

			ImgList: [
				{
					src: '/static/More/6004.png',
					name: '出生一件事'
				},
				{
					src: '/static/More/6005.png',
					name: '3岁以下幼...'
				},
				{
					src: '/static/More/6006.png',
					name: '“爱心妈咪...'
				},
				{
					src: '/static/More/6007.png',
					name: '生育保险待...'
				},
				{
					src: '/static/More/6026.png',
					name: '涉外婚姻登...'
				},
				{
					src: '/static/More/6027.png',
					name: '婚姻登记档案'
				},
				{
					src: '/static/More/6028.png',
					name: '“爱心妈咪...'
				},
				{
					src: '/static/More/6029.png',
					name: '再生育子女...'
				},
				{
					src: '/static/More/6030.png',
					name: '涉外婚姻登...'
				},
				{
					src: '/static/More/6031.png',
					name: '婚姻登记档案'
				},
				{
					src: '/static/More/6032.png',
					name: '“爱心妈咪...'
				},
				{
					src: '/static/More/6033.png',
					name: '再生育子女...'
				}
			],
			ImgList2: [
				{
					src: '/static/More/6008.png',
					name: '个人纳税查询',
					path: '/pages/CockGold/CockGold'
				},
				{
					src: '/static/More/6009.png',
					name: '三金账单',
					path: '/pages/ThreeGold/ThreeGold'
				},
				{
					src: '/static/More/6010.png',
					name: '公积金',
					path: '/pages/CockGold/CockGold'
				},
				{
					src: '/static/More/6011.png',
					name: '云助残服务3535353355',
					path: '/pages/CockGold/CockGold'
				},
				{
					src: '/static/More/6012.png',
					name: '我要租房',
					path: '/pages/CockGold/CockGold'
				},
				{
					src: '/static/More/6013.png',
					name: '既有多层住...',
					path: '/pages/CockGold/CockGold'
				},
				{
					src: '/static/More/6014.png',
					name: '大部分或完...',
					path: '/pages/CockGold/CockGold'
				},
				{
					src: '/static/More/6015.png',
					name: '灵活就业人...',
					path: '/pages/CockGold/CockGold'
				}
			],
			ImgList3: [
				{
					src: '/static/More/6037.png',
					name: '我要租房',
					path: '/pages/CockGold/CockGold'
				},
				{
					src: '/static/More/6038.png',
					name: '信用就医',
					path: '/pages/CockGold/CockGold'
				},
				{
					src: '/static/More/6039.png',
					name: '车管服务',
					path: '/pages/CockGold/CockGold'
				},
				{
					src: '/static/More/6040.png',
					name: '新冠疫苗接...',
					path: '/pages/CockGold/CockGold'
				},
				{
					src: '/static/More/6041.png',
					name: '三金账单',
					path: '/pages/ThreeGold/ThreeGold'
				},
				{
					src: '/static/More/6042.png',
					name: '通信账单',
					path: '/pages/CockGold/CockGold'
				},
				{
					src: '/static/More/6043.png',
					name: '出入境',
					path: '/pages/CockGold/CockGold'
				}
			],
			ImgList4: [
				{
					src: '/static/More/87.png',
					name: '学生专版'
				},
				{
					src: '/static/More/88.png',
					name: '上海旅游高等..'
				},
				{
					src: '/static/More/89.png',
					name: '上海商学院学...'
				},
				{
					src: '/static/More/90.png',
					name: '上海电子信息...'
				},
				{
					src: '/static/More/91.png',
					name: '上海工程技术...'
				},
				{
					src: '/static/More/92.png',
					name: '上海科技大学...'
				},
				{
					src: '/static/More/93.png',
					name: '老年教育'
				},
				{
					src: '/static/More/94.png',
					name: '上海交通大学...'
				},
				{
					src: '/static/More/95.png',
					name: '学分银行'
				},
				{
					src: '/static/More/96.png',
					name: '上海健康医学...'
				},
				{
					src: '/static/More/97.png',
					name: '华东政法大学...'
				},
				{
					src: '/static/More/98.png',
					name: '上海游泳场所...'
				}
			],
			Data: {}
		};
	},
	onLoad() {},
	methods: {
		onClickItem() {},
		Go(e) {
			uni.navigateTo({
				url: e
			});
		}
	}
};
</script>

<style lang="scss" scoped>
::v-deep .segmented-control__text {
	color: #b9b9b9ff !important;
}

::v-deep .segmented-control__item--text {
	color: #333333 !important;
	font-weight: bold;
	border: none !important;
}

::v-deep .ACC::before {
	position: absolute;
	width: 54rpx;
	height: 4rpx;
	content: '';
	background-color: #c8b49b;
	bottom: 0;
	left: 50%;
	margin-left: -27rpx;
	/*宽度的一半*/
}

::v-deep .segmented-control {
	float: left;
}

::v-deep .segmented-control__item {
	width: 23vw;
	position: relative;
}

page {
	background-color: #f6f6f6;
}

.Content {
	.Main {
		.TopSearch {
			padding: 30rpx 30rpx;
			background-color: #fff;
		}

		.CollectTitle {
			padding: 0 30rpx;
			background-color: #fff;
			display: flex;
			font-size: 34rpx;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #333333;
			justify-content: space-between;

			.Edit {
				width: 94rpx;
				height: 36rpx;
				line-height: 36rpx;
				border-radius: 26rpx;
				border: 1rpx solid #c7b68b;
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #c7b68b;
				text-align: center;
			}
		}

		.Collect {
			padding: 0 30rpx;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 17rpx;

			.CollectItem {
				padding: 20rpx 0;
				width: 25%;
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 24rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;

				text {
					margin-top: 20rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}

				image {
					width: 78rpx;
				}
			}
		}

		.Segmented {
			background-color: #fff;

			.ControlTitle {
				padding: 47rpx 30rpx 0 30rpx;
				font-size: 36rpx;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #333333;
			}

			.ControlList {
				display: flex;
				flex-wrap: wrap;
				padding: 0 30rpx;

				.ControlItem {
					padding: 20rpx 0;
					width: 25%;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;

					text {
						margin-top: 20rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}

					image {
						width: 78rpx;
					}
				}
			}
		}
	}
}
</style>
