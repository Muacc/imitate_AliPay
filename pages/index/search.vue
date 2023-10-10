<template>
	<view class="main" :style="[isSearch ? { backgroundImage: 'none' } : '']">
		<nav :style="{ height: $store.state.BH + 10 + 'px' }"></nav>
		<view class="top-search">
			<image class="back" src="/static/img/my-img/zjt.png" @click="back"></image>
			<view class="input">
				<image class="search-icon" src="/static/img/my-img/search.png" mode=""></image>
				<input @input="changeContent" class="search-input" placeholder-class="search-iput-placeholder" type="text" placeholder="全国房贷利息计算器" v-model="keyWord" />
				<view class="line-y" v-if="isSearch"></view>
				<view class="line2-y" v-else></view>
				<view class="click" v-if="isSearch" @click="subSearch()">搜索</view>
				<image class="clear-keyWord" v-else @click="clear" src="/static/img/my-img/clear.png" mode=""></image>
			</view>
			<view class="dots-more" v-if="!isSearch">
				<view class="small-dot-black"></view>
				<view class="big-dot-black"></view>
				<view class="small-dot-black"></view>
			</view>
		</view>
		<view v-if="isSearch">
			<view class="search-hots">
				<view class="hots-item" v-for="(item, index) in searchHots" :key="index" @click="upKey(item)">
					{{ item }}
				</view>
			</view>
			<view class="search-histry">
				<view class="histry-title">
					<view class="text">搜索历史</view>
					<image class="del-histry" src="/static/img/my-img/sc.png" mode=""></image>
				</view>
				<view class="search-histry-list">
					<view class="search-histry-item" v-for="(item, index) in searchHistry" :key="index" @click="upKey(item.name)">
						{{ item.name }}
					</view>
					<view class="search-histry-more">
						<image class="more-search" src="/static/img/my-img/xjt.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="search-find">
				<view class="find-title">
					<view class="text">搜索发现</view>
					<view class="change">
						换一换
						<image class="change-find" src="/static/img/my-img/sx.png" mode=""></image>
					</view>
				</view>
				<view class="find-list">
					<view class="find-list-item" v-for="(item, index) in findListItem" :key="index">
						<image class="find-dot" src="/static/img/my-img/15.png" mode=""></image>
						<view class="find-title">
							{{ item.title }}
						</view>
						<view class="find-tip">
							{{ item.tip }}
						</view>
					</view>
					<image class="mike" src="/static/img/my-img/718.png" mode=""></image>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="top-tabs">
				<view class="tabs-item" :class="{ activeTab: index == 0 }" v-for="(item, index) in tabList" :key="index">
					{{ item }}
				</view>
			</view>
			<view class="user-box" v-if="searchContent == '公积金'">
				<view class="uesr-title">市民中心·公积金</view>
				<view class="user-subtitle">官方服务 7×24 小时可办</view>
				<view class="my-gjj">
					<view class="gjj-top">
						<image class="avatar" :src="userData.avatar" mode=""></image>
						<view class="gjj-info">
							<view class="my-gjj-title">我的公积金</view>
							<view class="data">{{ userData.username }}丨{{ userData.cert_number_2 }}</view>
						</view>
					</view>
					<view class="user-search">账户查询</view>
				</view>
				<view class="hot-servers">
					<view class="hot-servers-title">
						<view>热门服务</view>
						<view class="hot-servers-more">
							全部
							<image src="/static/img/my-img/hotyjt.png"></image>
						</view>
					</view>
					<view class="hot-servers-content">
						<view class="hsc-item">
							租房提取公积金
							<image src="/static/img/my-img/hotyjt.png" mode=""></image>
						</view>
						<view class="hsc-item">
							全国公积金异地转移
							<image src="/static/img/my-img/hotyjt.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="MP-gjj" v-if="searchContent == '公积金'">
				<view class="page-item-dtitle">
					<view class="page-item-title">
						<text>{{ searchContent }}</text>
						- 小程序
					</view>
					<view class="page-item-title-right">
						全部
						<image src="/static/img/my-img/hotyjt.png"></image>
					</view>
				</view>
				<view class="MP-box">
					<view class="MP-box-top">
						<view class="MP-box-top-left">
							<view class="all">全部</view>
							<view class="ShangHai">上海</view>
						</view>
						<view class="MP-box-top-right">
							更多
							<image src="/static/img/my-img/gl.png" mode=""></image>
						</view>
					</view>
					<view class="MP-line"></view>
					<view class="bdc">
						<view class="MP-item" @click="Go('/pages/gjj/ssb')">
							<image class="MP-item-left" src="/static/img/my-img/ssb.png"></image>
							<view class="MP-item-right">
								<view class="MP-name">
									随申办
									<view class="MP-tags">政府</view>
									<view class="MP-collect">已收藏</view>
								</view>
								<view class="MP-describe">随申办是服务于上海市民的政务小程序。</view>
								<view class="use-number">
									<view class="use-number-left">上海市大数据中心</view>
									<view class="use-number-right">500万+人最近使用</view>
								</view>
								<view class="MP-item-main">
									<view class="main-box">我的不动产</view>
									<view class="main-box">我的不动产查询</view>
								</view>
							</view>
						</view>
						<view class="line-x"></view>
					</view>

					<view class="MP-item" @click="Go('/pages/gjj/gjj')">
						<image class="MP-item-left" src="/static/img/my-img/zf1.png"></image>
						<view class="MP-item-right">
							<view class="MP-name">
								全国住房公积金
								<view class="MP-tags">政府</view>
							</view>
							<view class="MP-describe">
								为全国住房
								<text>公积金</text>
								缴存人提供住房公积金信息查询及异 地转移接续服务。
							</view>
							<view class="MP-comment">“很实用，很方便”</view>
							<view class="use-number">
								<view class="use-number-left">住房和城乡建设部煮饭公积金...</view>
								<view class="use-number-right">1000万+人最近使用</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="MP-gjj" v-else>
				<view class="page-item-dtitle">
					<view class="page-item-title">
						<text>{{ searchContent }}</text>
						- 小程序
					</view>
					<view class="page-item-title-right">
						全部
						<image src="/static/img/my-img/hotyjt.png"></image>
					</view>
				</view>
				<view class="MP-box">
					<view class="bdc">
						<view class="MP-item" @click="Go('/pages/gjj/ssb')">
							<image class="MP-item-left" src="/static/img/my-img/ssb.png"></image>
							<view class="MP-item-right">
								<view class="MP-name">
									随申办
									<view class="MP-tags">政府</view>
									<view class="MP-collect">已收藏</view>
								</view>
								<view class="MP-describe">随申办是服务于上海市民的政务小程序。</view>
								<view class="use-number">
									<view class="use-number-left">上海市大数据中心</view>
									<view class="use-number-right">500万+人最近使用</view>
								</view>
								<view class="MP-item-main">
									<view class="main-box">公积金查询</view>
									<view class="main-box">个人租房提取公积金</view>
								</view>
							</view>
						</view>
						<view class="line-x"></view>
						<view class="list-for-bdc">
							<view class="list-for-bdc-item" v-for="(item, index) in bdcList" :key="index" @click="Go(item.url)">
								<view class="list-for-bdc-flex">
									<image class="bdc-left" :src="item.img" mode=""></image>
									<view class="bdc-middle">
										<view class="p1">
											<view class="p1-left">
												{{ item.name }}
												<view class="bdc-tags">
													{{ item.tags }}
												</view>
											</view>
											<view class="p1-right"></view>
										</view>
										<view class="p2">
											<text class="blue">{{ item.blue }}</text>
											{{ item.subname }}
										</view>
										<view class="p3" v-if="item.bh">
											包含
											<text>我的不动产</text>
											相关内容
										</view>
										<view class="p4">
											上海市大数据中心
											<view class="right">
												{{ item.num }}
											</view>
										</view>
									</view>
								</view>
								<view class="line-x"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="live">
				<view class="page-item-dtitle">
					<view class="page-item-title">
						<text>{{ searchContent }}</text>
						- 生活号
					</view>
					<view class="page-item-title-right">
						全部
						<image src="/static/img/my-img/hotyjt.png"></image>
					</view>
				</view>
				<image class="live-img" src="/static/img/my-img/live.png" mode="widthFix"></image>
			</view>
			<view class="vedio">
				<view class="page-item-dtitle">
					<view class="page-item-title">
						<text>{{ searchContent }}</text>
						- 视频
					</view>
					<view class="page-item-title-right">
						全部
						<image src="/static/img/my-img/hotyjt.png"></image>
					</view>
				</view>
				<image class="vedio-img" src="/static/img/my-img/sp.png" mode="widthFix"></image>
			</view>
			<view class="vedio">
				<view class="page-item-dtitle">
					<view class="page-item-title">
						<text>{{ searchContent }}</text>
						- 文章
					</view>
					<view class="page-item-title-right">
						全部
						<image src="/static/img/my-img/hotyjt.png"></image>
					</view>
				</view>
				<image class="vedio-img" src="/static/img/my-img/wz.png" mode="widthFix"></image>
			</view>
			<view class="vedio">
				<view class="page-item-dtitle">
					<view class="page-item-title">
						<text>{{ searchContent }}</text>
						- 问答
					</view>
					<view class="page-item-title-right">
						全部
						<image src="/static/img/my-img/hotyjt.png"></image>
					</view>
				</view>
				<image class="vedio-img" src="/static/img/my-img/wd.png" mode="widthFix"></image>
			</view>
			<view class="vedio">
				<view class="page-item-dtitle">
					<view class="page-item-title">
						<text>{{ searchContent }}</text>
						- 芝麻企业信用
					</view>
					<view class="page-item-title-right">
						全部
						<image src="/static/img/my-img/hotyjt.png"></image>
					</view>
				</view>
				<image class="vedio-img" src="/static/img/my-img/qy.png" mode="widthFix"></image>
				<image class="right-img" src="/static/img/my-img/22.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			searchContent: '公积金',
			tabList: ['全部', '小程序', '生活号', '理财', '市民服务'],
			searchHots: ['全国房贷计算器', '住房公积金', '全国社保查询'],
			searchHistry: [
				{
					name: '公积金'
				},
				{
					name: '我的不动产'
				},
				{
					name: '学历查询'
				},
				{
					name: '蚂蚁保'
				},
				{
					name: '上海居住证积分'
				},
				{
					name: '积分'
				},
				{
					name: '茄子租物'
				},
				{
					name: '微粒相机'
				}
			],
			bdcList: [
				{
					img: '/static/img/bdc-search/1.png',
					name: '我的不动产查询-上海市',
					tags: '政府',
					subname: '24小时在线查询',
					url: '/pages/userBook/index'
				},
				{
					img: '/static/img/bdc-search/2.png',
					name: '上海不动产',
					tags: '政府',
					subname: '一键查询跑腿',
					url: '/pages/userBook/index'
				},
				{
					img: '/static/img/bdc-search/3.png',
					name: '随申办不动产查询',
					tags: '政府',
					subname: '24小时在线查询',
					url: '/pages/userBook/index'
				},
				{
					img: '/static/img/bdc-search/4.png',
					name: '个人住房房产税缴纳',
					tags: '政府',
					subname: '24小时在线查询',
					bh: true
				},
				{
					img: '/static/img/bdc-search/5.png',
					name: '房产税查询',
					tags: '政府',
					subname: '在线查询房产税',
					bh: true
				},
				{
					img: '/static/img/bdc-search/6.png',
					name: '不动产等级水电气过户-上海市',
					tags: '政府',
					blue: '不动产',
					subname: '等级水电气过户',
					num: '1000 + 人最近使用'
				}
			],
			findListItem: [
				{
					title: '随申办，通办上海事',
					tip: '7万+人最近收藏'
				},
				{
					title: '国家政务服务平台',
					tip: '“查询公积金很方便”'
				},
				{
					title: '全国住房公积金',
					tip: '精选推荐'
				},
				{
					title: '芝麻信用',
					tip: '2万+人最近使用'
				},
				{
					title: '我的社保查询',
					tip: '全网热搜'
				}
			],
			isSearch: true,
			keyWord: '',
			userData: {},
			Exp: '/我\的\不\动\产/'
		};
	},
	async onLoad() {
		// await this.getUserInfo();
	},
	async onShow() {
		await this.getUserInfo();
	},
	methods: {
		Go(e) {
			uni.navigateTo({
				url: e
			});
		},
		back() {
			uni.navigateBack();
		},
		upKey(e) {
			this.keyWord = e;
			this.changeContent();
			this.subSearch();
		},
		getUserInfo() {
			this.$api.userInfo({}, (res) => {
				this.userData = res.data;
			});
		},
		subSearch() {
			this.isSearch = false;
			this.searchContent = this.keyWord;
		},
		changeContent() {
			let data = [
				{
					title: '我的不动产',
					data: [1, 2, 3, 4, 5, 6]
				}
			];
			if (this.keyWord !== '') {
				let result = data.filter((item) => item.title.includes(this.keyWord)).map((item) => item.data);
			} 
		},
		clear() {
			this.isSearch = true;
			this.keyWord = '';
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f5f5f5;
}
.main {
	background-image: url(../../static/img/my-img/85.png);
	background-repeat: no-repeat;
	background-size: 100% 490rpx;
	background-position: top;
	.bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 490rpx;
		z-index: -1;
	}
	.top-search {
		display: flex;
		align-items: center;
		margin: 0 25rpx 0 27rpx;
		.back {
			width: 17rpx;
			height: 28rpx;
			margin-right: 26rpx;
		}
		.input {
			display: flex;
			align-items: center;
			padding: 9rpx 24rpx;
			border: 0.5px solid #4174e5;
			background: #ffffff;
			border-radius: 12rpx;
			flex: 1;
			.search-icon {
				width: 28rpx;
				height: 29rpx;
				margin-right: 10rpx;
			}

			.search-input {
				flex: 1;
				font-size: 24rpx;
				line-height: 1;
				font-weight: 500;
				color: #333333;
			}

			.search-iput-placeholder {
				font-size: 24rpx;
				font-weight: 500;
				color: #cacaca;
			}
			.line-y {
				width: 2rpx;
				height: 39rpx;
				background: #e0e9f8;
				margin-right: 20rpx;
			}
			.line2-y {
				width: 2rpx;
				height: 39rpx;
				margin-right: 20rpx;
			}
			.click {
				font-weight: bold;
				font-size: 24rpx;
				color: #3874f6;
			}
			.clear-keyWord {
				width: 24rpx;
				height: 24rpx;
			}
		}

		.dots-more {
			display: flex;
			align-items: center;
			margin-left: 33rpx;
			.small-dot-black {
				width: 6rpx;
				height: 6rpx;
				background-color: #333;
				border-radius: 50%;
			}
			.big-dot-black {
				margin: 0 5rpx;
				width: 8rpx;
				height: 8rpx;
				background-color: #333;
				border-radius: 50%;
			}
		}
	}
	.search-hots {
		display: flex;
		flex-wrap: wrap;
		margin: 24rpx 20rpx 40rpx;

		.hots-item {
			font-size: 24rpx;
			font-weight: 400;
			color: #333333;
			padding: 10rpx 15rpx;
			background-color: #fff;
			margin-right: 15rpx;
			border-radius: 10rpx;
		}
	}
	.search-histry {
		margin: 0 30rpx 0 20rpx;
		.histry-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.text {
				font-size: 26rpx;
				font-weight: bold;
				color: #333333;
			}
			.del-histry {
				width: 18rpx;
				height: 19rpx;
			}
		}
		.search-histry-list {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			.search-histry-item {
				padding: 10rpx 15rpx;
				margin-top: 15rpx;
				margin-right: 16rpx;
				font-weight: 400;
				color: #333333;
				font-size: 24rpx;
				background: #ffffff;
				border-radius: 10rpx;
			}
			.search-histry-more {
				margin-top: 15rpx;
				margin-right: 15rpx;
				font-weight: 400;
				color: #333333;
				font-size: 24rpx;
				background: transparent;
				border-radius: 10rpx;
				.more-search {
					width: 52rpx;
					height: 52rpx;
				}
			}
		}
	}
	.search-find {
		margin: 40rpx 30rpx 0 20rpx;
		.find-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.text {
				font-size: 26rpx;
				font-weight: bold;
				color: #333333;
			}
			.change {
				font-size: 21rpx;
				font-weight: 400;
				color: #666666;
				.change-find {
					width: 21rpx;
					height: 21rpx;
					margin-left: 8rpx;
				}
			}
		}
		.find-list {
			margin-top: 24rpx;
			background-color: #fff;
			border-radius: 15rpx;
			padding-bottom: 29rpx;
			position: relative;
			.find-list-item {
				padding: 29rpx 23rpx 0;
				display: flex;
				align-items: center;
				.find-dot {
					width: 12rpx;
					height: 12rpx;
				}
				.find-title {
					font-size: 24rpx;
					font-weight: bold;
					color: #333333;
					margin: 0 22rpx 0 15rpx;
				}
				.find-tip {
					font-size: 20rpx;
					font-weight: 400;
					color: #999999;
				}
			}
			.mike {
				position: absolute;
				left: 50%;
				transform: translate(-50%, 0);
				bottom: -60rpx;
				width: 90rpx;
				height: 90rpx;
			}
		}
	}
	.top-tabs {
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin-top: 26rpx;
		.tabs-item {
			font-size: 28rpx;
			font-weight: 400;
			color: #333333;
		}
		.activeTab {
			font-size: 28rpx;
			font-weight: bold;
			color: #333333;
		}
		.tabs-item::after {
			content: '';
			display: block;
			width: 100%;
			height: 4rpx;
			margin-top: 13rpx;
		}
		.activeTab::after {
			content: '';
			display: block;
			width: 100%;
			height: 4rpx;
			background-color: #3874f6;
			margin-top: 13rpx;
		}
	}
	.user-box {
		margin: 14rpx 20rpx 20rpx 20rpx;
		padding: 17rpx 22rpx 25rpx 22rpx;
		border-radius: 15rpx;
		background: #ffffff;
		.uesr-title {
			font-weight: bold;
			font-size: 34rpx;
			color: #333333;
		}
		.user-subtitle {
			font-size: 22rpx;
			font-weight: 400;
			color: #999999;
		}
		.my-gjj {
			padding: 20rpx;
			background: #e1ba9b;
			border-radius: 12rpx;
			margin-top: 20rpx;
			.gjj-top {
				display: flex;
				align-items: center;
				margin-bottom: 21rpx;
				.avatar {
					width: 78rpx;
					height: 78rpx;
					border-radius: 50%;
					margin-right: 21rpx;
				}
				.gjj-info {
					.my-gjj-title {
						font-size: 26rpx;
						font-weight: bold;
						color: #333333;
					}
					.data {
						font-size: 22rpx;
						font-weight: 400;
						color: #7b604d;
					}
				}
			}
			.user-search {
				background: #ffffff;
				border-radius: 5rpx;
				padding: 14rpx 0;
				text-align: center;
				font-size: 26rpx;
				font-weight: bold;
				color: #333333;
			}
		}
		.hot-servers {
			.hot-servers-title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 22rpx;
				font-weight: 400;
				color: #999999;
				margin-top: 21rpx;
				margin-bottom: 15rpx;
				.hot-servers-more {
					image {
						margin-left: 12rpx;
						width: 13rpx;
						height: 22rpx;
					}
				}
			}

			.hot-servers-content {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.hsc-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 16rpx 20rpx;
					background: #f4f7fc;
					border-radius: 5rpx;
					font-size: 28rpx;
					font-weight: bold;
					color: #333333;
					width: 280rpx;
					image {
						width: 13rpx;
						height: 22rpx;
					}
				}
			}
		}
	}
	.page-item-dtitle {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 15rpx;
	}
	.page-item-title {
		color: #333333;
		font-weight: bold;
		font-size: 30rpx;
		text {
			color: #3874f6;
			margin-right: 6rpx;
		}
	}
	.page-item-title-right {
		font-size: 26rpx;
		color: #999999;
		font-weight: 400;
		image {
			width: 12rpx;
			height: 22rpx;
			margin-left: 8rpx;
		}
	}
	.MP-gjj {
		margin: 33rpx 20rpx 0;

		.MP-box {
			background-color: #fff;
			border-radius: 15rpx;
			padding: 14rpx 27rpx 20rpx 22rpx;
			.MP-box-top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.MP-box-top-left {
					display: flex;
					align-items: center;
					.all {
						background: #e9f1fc;
						border: 1px solid #c3cad2;
						border-radius: 8rpx;
						padding: 13rpx 23rpx;
						margin-right: 10rpx;
						font-size: 22rpx;
						font-weight: 400;
						color: #3874f6;
					}
					.ShangHai {
						background: #f5f5f5;
						border-radius: 8rpx;
						padding: 13rpx 23rpx;
						font-size: 22rpx;
						font-weight: 400;
						color: #333333;
					}
				}
				.MP-box-top-right {
					font-size: 22rpx;
					font-weight: 400;
					color: #666666;
					image {
						width: 20rpx;
						height: 22rpx;
						margin-left: 10rpx;
					}
				}
			}
			.MP-line {
				border-bottom: 1px solid #efefef;
				margin: 15rpx 0 20rpx;
			}
			.MP-item {
				display: flex;

				.MP-item-left {
					width: 78rpx;
					height: 78rpx;
					margin-right: 20rpx;
				}
				.MP-item-right {
					flex: 1;
				}
				.MP-name {
					font-size: 30rpx;
					font-weight: bold;
					color: #333333;
					display: flex;
					align-items: center;
					.MP-tags {
						border: 1rpx solid #c3cad2;
						padding: 0 8rpx;
						border-radius: 5rpx;
						font-size: 20rpx;
						font-weight: 400;
						color: #3874f6;
						margin: 0 8rpx;
					}
					.MP-collect {
						font-size: 20rpx;
						font-weight: 400;
						color: #666666;
						padding: 0 8rpx;
						border: 1rpx solid #c3cad2;
						border-radius: 5rpx;
					}
				}

				.MP-describe {
					font-size: 23rpx;
					font-weight: 400;
					color: #666666;
					margin: 10rpx 0;
				}
				.MP-comment {
					padding: 2rpx 0;
					font-weight: 400;
					color: #666666;
					font-size: 19rpx;
					border: 1rpx solid #cacaca;
					display: inline-block;
					border-radius: 5rpx;
					margin-bottom: 10rpx;
				}
				.use-number {
					display: flex;
					justify-content: space-between;
					.use-number-left {
						font-size: 23rpx;
						color: #999999;
						font-weight: 400;
					}
					.use-number-right {
						font-weight: 400;
						color: #3874f6;
						font-size: 23rpx;
					}
				}

				.MP-item-main {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.main-box {
						margin-top: 10rpx;
						padding: 15rpx 0 15rpx 17rpx;
						width: 255rpx;
						background: #f4f7fc;
						border-radius: 5rpx;
						font-size: 24rpx;
						color: #153f9a;
						font-weight: 400;
					}
				}
			}
			.line-x {
				height: 1rpx;
				background-color: #f3f3f3;
				margin: 20rpx 0;
			}
			.list-for-bdc {
				.list-for-bdc-item {
					.list-for-bdc-flex {
						flex: 1;
						display: flex;
						align-items: center;

						.bdc-left {
							width: 78rpx;
							height: 78rpx;
							margin-right: 20rpx;
						}
						.bdc-middle {
							flex: 1;
							.p1 {
								display: flex;
								align-items: center;
								justify-content: space-between;
								.p1-left {
									align-items: center;
									display: flex;
									font-weight: bold;
									color: #333333;
									font-size: 30rpx;
									.bdc-tags {
										margin-left: 10rpx;
										padding: 0 7rpx;
										font-size: 20rpx;
										font-weight: 400;
										color: #3874f6;
										border-radius: 5rpx;
										border: 1rpx solid #c3cad2;
									}
								}

								.p1-right {
								}
							}
							.p2 {
								margin: 10rpx 0;
								font-weight: 400;
								color: #666666;
								font-size: 23rpx;
								.blue {
									color: #2251d3;
								}
							}
							.p3 {
								padding: 2rpx 8rpx;
								font-weight: 400;
								color: #666666;
								font-size: 19rpx;
								margin-bottom: 10rpx;
								text {
									color: #2251d3;
								}
							}
							.p4 {
								font-weight: 400;
								color: #999999;
								font-size: 23rpx;
								display: flex;
								align-items: center;
								justify-content: space-between;
								.right {
									color: #3874f6;
								}
							}
						}
					}
				}
			}
		}
	}
	.live {
		margin: 20rpx;
		.live-img {
			width: 100%;
		}
	}
	.vedio {
		margin: 20rpx;
		position: relative;
		.vedio-img {
			width: 100%;
		}
		.right-img {
			position: absolute;
			top: 50%;
			right: 0;
			transform: translate(0, -50%);
			width: 71rpx;
			height: 71rpx;
		}
	}
}
</style>
