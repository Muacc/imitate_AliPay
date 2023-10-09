<template>
	<view class="Content">
		<view class="jn" :style="{ top: $store.state.BH + 10 + 'px' }">
			<image class="sc" src="/static/img/gjj-img/887.png" mode=""></image>
			<image class="gd" @click="toIndex" src="/static/img/gjj-img/46.png" mode=""></image>
		</view>
		<view v-if="time == 0" class="TopBg1"></view>
		<view v-else-if="time == 1" class="TopBg2"></view>
		<view v-else class="TopBg3"></view>
		<view :style="{ height: $store.state.BH + 10 + 'px' }"></view>
		<view class="Top">
			<view class="Left">
				<view class="City">
					<view class="Icon">
						<image src="/static/5927.png" mode=""></image>
						上海
					</view>
				</view>
				<view class="Search" @click="To('/pages/index/Search2')">
					<image src="/static/5928.png" mode=""></image>
					女神专区
				</view>
			</view>
			<view class="Add">
				<u-icon name="plus-circle" size="41rpx" color="#fff"></u-icon>
			</view>
		</view>
		<view class="TopTags">
			<view class="TagItem">
				<image src="/static/sys.png" mode="widthFix"></image>
				扫一扫
			</view>
			<view class="TagItem">
				<image src="/static/ssm.png" mode="widthFix"></image>
				随申码
			</view>
			<view class="TagItem">
				<image src="/static/lz.png" mode="widthFix"></image>
				亮证
			</view>
			<view class="TagItem">
				<image src="/static/kf.png" mode="widthFix"></image>
				客服
			</view>
			<view class="TagItem">
				<image src="/static/zs.png" mode="widthFix"></image>
				专属
			</view>
		</view>
		<view class="Greetings">
			{{ getTimeState() }}
		</view>
		<view class="Weather">
			<view class="Block">
				<text>-2℃~14℃ 晴转多云 东北风转东到...</text>
				<u-icon name="arrow-right" color="#fff" size="15"></u-icon>
				<image src="/static/baozi.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="ModuleList">
			<view class="ModuleItem">
				<image src="/static/yyzq.png" mode="widthFix"></image>
				互联网医院专区
			</view>
			<view class="ModuleItem">
				<image src="/static/More/6008.png" mode="widthFix"></image>
				个人纳税查询
			</view>
			<view class="ModuleItem">
				<image src="/static/jzz.png" mode="widthFix"></image>
				居住证办理
			</view>
			<view class="ModuleItem">
				<image src="/static/hs.png" mode="widthFix"></image>
				核酸采样点
			</view>
			<view class="ModuleItem">
				<image src="/static/ht.png" mode="widthFix"></image>
				红途
			</view>
			<view class="ModuleItem">
				<image src="/static/hscx.png" mode="widthFix"></image>
				核酸查询
			</view>
			<view class="ModuleItem" @click="Go('/pages/My/CX')">
				<image src="/static/zf.png" mode="widthFix"></image>
				我要租房
			</view>
			<view class="ModuleItem" @click="Go('/pages/more/more')">
				<image src="/static/gd.png" mode="widthFix"></image>
				更多
			</view>
		</view>
		<view class="Banner">
			<image src="/static/banner.png" mode="widthFix"></image>
		</view>
		<view class="DataList">
			<text class="Title">精选主题</text>
		</view>
		<view class="ScrollBox">
			<u-scroll-list :indicator="false">
				<view v-for="(item, index) in list" :key="index">
					<image :src="item.thumb" mode="widthFix" class="ScroImgs"></image>
				</view>
			</u-scroll-list>
		</view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text" activeColor="#4cd964"></uni-segmented-control>
		<view class="News">
			<view class="NewItem">
				<image src="/static/B1.png" mode=""></image>
				<view class="NewInfo">
					17线延申段今起架梁施工
					<text>2023-03-10 10:48:34</text>
				</view>
			</view>
			<view class="NewItem">
				<image src="/static/B2.png" mode=""></image>
				<view class="NewInfo">
					美美樱花季，免费看大展！一起开启本周文旅...
					<text>2023-03-10 10:48:34</text>
				</view>
			</view>
		</view>
		<view class="LookMore">
			<u-loadmore status="loadmore" />
		</view>
		<tabbar :index="0"></tabbar>
	</view>
</template>

<script>
import tabbar from '@/components/gjj-tabBar/gjj-tabBar3.vue';
export default {
	components: {
		tabbar
	},
	data() {
		return {
			list: [
				{
					thumb: '/static/SR1.png'
				},
				{
					thumb: '/static/SR2.png'
				},
				{
					thumb: '/static/SR3.png'
				},
				{
					thumb: '/static/SR1.png'
				},
				{
					thumb: '/static/SR2.png'
				}
			],
			items: ['热点关注', '政策图解'],
			current: 0,
			time: 0
		};
	},
	onLoad() {
		this.getTimeState();
	},
	methods: {
		To(e) {
			uni.navigateTo({
				url: e
			});
		},
		getTimeState() {
			// 获取当前时间
			let timeNow = new Date();
			// 获取当前小时
			let hours = timeNow.getHours();
			// 设置默认文字
			let state = ``;
			// 判断当前时间段
			if (hours >= 0 && hours <= 10) {
				state = `早上好!`;
				this.time = 0;
			} else if (hours > 10 && hours <= 12) {
				state = `中午好!`;
				this.time = 0;
			} else if (hours > 12 && hours <= 18) {
				state = `下午好!`;
				this.time = 1;
			} else if (hours > 18 && hours <= 24) {
				state = `晚上好!`;
				this.time = 2;
			}
			return state;
		},
		Go(e) {
			uni.navigateTo({
				url: e
			});
		},
		onClickItem(e) {
			if (this.current != e.currentIndex) {
				this.current = e.currentIndex;
			}
		},
		toIndex() {
			uni.reLaunch({
				url: '/pages/index/index'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
::v-deep .segmented-control {
	border-bottom: 1rpx solid rgba(153, 153, 153, 0.2);
	overflow: visible !important;
}

::v-deep .segmented-control__item--text {
	border-bottom-width: 4rpx;
}

.Content {
	box-sizing: border-box;
	.jn {
		position: fixed;
		right: 30rpx;
		.sc {
			width: 52rpx;
			height: 52rpx;
			margin-right: 15rpx;
		}
		.gd {
			width: 138rpx;
			height: 52rpx;
		}
	}

	.TopBg1 {
		background: url(../../static/6003.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 720rpx;
		z-index: -2;
	}

	.TopBg2 {
		background: url('../../static/SY.webp') no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 720rpx;
		z-index: -2;
	}

	.TopBg3 {
		background: url('/static/6092.png') no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 720rpx;
		z-index: -2;
	}

	.Top {
		padding: 70rpx 0 0 0;
		margin: 0 auto;
		width: 684rpx;
		display: flex;
		align-items: center;
		height: 66rpx;

		.Left {
			display: flex;
			align-items: center;
			width: 615rpx;
			height: 70rpx;
		}

		.City {
			position: relative;

			.Icon {
				display: flex;
				align-items: center;
				height: 100%;
				background: rgba(255, 255, 255, 0.5);
				line-height: 66rpx;
				border-top-left-radius: 10rpx;
				border-bottom-left-radius: 10rpx;
				padding: 0 27rpx 0 38rpx;
				font-size: 24rpx;
				color: #ffffff;

				image {
					width: 16rpx;
					height: 19rpx;
					margin-right: 9rpx;
				}
			}
		}

		.City::after {
			position: absolute;
			right: 0;
			top: 18rpx;
			content: '';
			display: block;
			height: 31rpx;
			border-left: 2rpx solid rgba(255, 255, 255, 0.5);
		}

		.Search {
			padding-left: 28rpx;
			flex: 1;
			display: flex;
			color: #ffffff;
			background: rgba(255, 255, 255, 0.5);
			font-size: 24rpx;
			height: 66rpx;
			align-items: center;
			border-top-right-radius: 10rpx;
			border-bottom-right-radius: 10rpx;

			image {
				width: 17rpx;
				height: 17rpx;
				margin-right: 9rpx;
			}
		}

		.Add {
			margin-left: 31rpx;
		}
	}

	.TopTags {
		display: flex;
		justify-content: space-evenly;
		margin: 47rpx 0 127rpx 0;

		.TagItem {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #ffffff;
			font-size: 28rpx;
			justify-content: space-between;

			image {
				width: 48rpx;
			}
		}
	}

	.Greetings {
		width: 200rpx;
		height: 70rpx;
		margin-left: 66rpx;
		margin-bottom: 120rpx;
		line-height: 50rpx;
		font-size: 50rpx;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #ffffff;
	}

	.Weather {
		display: flex;
		justify-content: flex-end;

		.Block {
			align-items: center;
			display: flex;
			width: 606rpx;
			height: 109rpx;
			line-height: 109rpx;
			background: #c9b487;
			border-radius: 52rpx 0rpx 0rpx 52rpx;
			opacity: 1;
			position: relative;
			font-size: 26rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #ffffff;

			text {
				margin-left: 140rpx;
			}

			image {
				width: 116rpx;
				position: absolute !important;
				top: -20rpx;
				left: -20rpx;
			}
		}
	}

	.ModuleList {
		margin-top: 29rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		margin-bottom: 43rpx;

		.ModuleItem {
			width: 168rpx;
			display: flex;
			font-size: 24rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			align-items: center;
			flex-direction: column;
			margin-bottom: 39rpx;

			image {
				width: 70rpx;
				margin-bottom: 20rpx;
			}
		}
	}

	.Banner {
		padding: 0 30rpx;

		image {
			width: 691rpx;
		}
	}

	.DataList {
		padding: 0 30rpx;

		.Title {
			display: block;
			margin: 50rpx 0 30rpx 0;
			font-size: 36rpx;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #333333;
		}
	}

	.ScrollBox {
		overflow-x: hidden;

		.ScroImgs {
			width: 210rpx;
			margin: 0 20rpx;
		}
	}

	.News {
		margin-top: 20rpx;

		.NewItem {
			display: flex;
			padding: 30rpx 20rpx;
			border-bottom: 1rpx solid rgba(153, 153, 153, 0.2);

			image {
				border-radius: 10rpx;
				width: 215rpx;
				height: 164rpx;
			}

			.NewInfo {
				width: 416rpx;
				font-size: 32rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 30rpx;

				text {
					font-size: 24rpx;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
				}
			}
		}
	}

	.LookMore {
		padding-bottom: 55rpx;
	}
}
</style>
