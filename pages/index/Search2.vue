<template>
	<view class="Main">
		<navbar Title="搜索"></navbar>
		<view class="Input" :style="{ marginTop: 10 + 'px' }">
			<u--input
				class="uuinput"
				placeholderStyle="font-size:24rpx;color: #888888;"
				placeholder="公交到站查询"
				prefixIcon="search"
				prefixIconStyle="font-size: 20px;color: #888888"
				suffixIcon="search"
				:clearable="true"
				v-model="keyname"
				:suffixImg="mkf"
				@confirm="serach(keyname)"
				@change="UpsearchContent"
			></u--input>
			<view v-if="showInOne" class="Clear" @click="back">取消</view>
		</view>
		<view v-if="show" style="margin-top: 40rpx">
			<view class="History">
				<view class="SearchTitle" style="padding-bottom: 0;">历史搜索</view>
				<image class="HisDel" src="/static/a66.png" style="width: 40rpx; height: 40rpx" mode=""></image>
			</view>
			<view class="HisBox" @click="Go('bdc')">我的不动产</view>
			<view class="HisBox" style="margin-left: 20rpx" @click="Go('公积金')">公积金</view>
			
			<view v-if="showInOne">
				<view class="SearchTitle">大家都在搜</view>
				<view class="Box">
					<view class="Item" v-for="(A, B) in List" :key="A.name">
						<view class="Name">
							{{ A.name }}
						</view>
					</view>
				</view>
			</view>
			<view v-else>
				<view class="SearchTitle2">您可能想要搜索的办理事项：</view>
				<view class="Box2">
					<view class="Item2" v-for="(A, B) in searchContentResList" :key="A.name" @click="selectItem(A)">
						<view class="Name2">
							{{ A }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="SerTitle" style="margin-top: 58rpx; margin-bottom: 20rpx">办理事项</view>
			<view class="HisList" v-for="(A, B) in HisList" :key="A" @click="Go(A)">
				{{ A }}
				<image src="/static/img/my-img/yjt6.png" style="width: 13rpx; height: 26rpx"></image>
			</view>
			<view class="look-more-button">查看更多服务应用</view>
			<view class="SerTitle2" style="margin-top: 36rpx">办事指南</view>
			<view class="HisList2" v-for="(A, B) in HisList2" :key="A.name">
				<view class="left">
					<view class="Item">
						{{ A.name }}
					</view>
					<view class="Item2">
						<view class="O">
							{{ A.item1 }}
						</view>
						<view class="B">
							{{ A.item2 }}
						</view>
					</view>
				</view>
				<image class="right" src="/static/img/my-img/yjt6.png" style="width: 13rpx; height: 26rpx"></image>
			</view>
		</view>
		<view class="look-more-button" v-if="!show">查看更多事项服务</view>
		<view style="height: 50px"></view>
		<view class="Talk" v-if="Talk" :style="{ bottom: keyHeight + 'px' }">
			<image src="/static/706.png" style="width: 68rpx; height: 69rpx; border-radius: 50%" mode=""></image>
			<text>按住说话</text>
		</view>
		<view class="gjjmask" v-if="showgjj">
			<view class="gjjpwd">
				<view class="close" @click="showgjj = false">
					<uni-icons type="closeempty" size="20"></uni-icons>
				</view>
				<view class="title">请输入数据查询密码</view>
				<view class="tips">请确保是本人操作</view>
				<u-code-input maxlength="6" v-model="value5" size="83rpx" :hairline="true" space="0" mode="box" dot @finish="gjj" color="#000"></u-code-input>
			</view>
		</view>
	</view>
</template>

<script>
import navbar from '@/components/gjj-navbar/gjj-navbar2.vue';
import search from '../../uni_modules/uview-ui/libs/config/props/search';
export default {
	components: {
		navbar
	},
	data() {
		return {
			keyname: '',
			Talk: false,
			value5: '',
			showgjj: false,
			showInOne: true,
			mkf: '/static/img/index-img/mkf.png',
			List: [
				{
					name: '少儿住院互助基金参保'
				},
				{
					name: '随申码刷码乘车活动'
				},
				{
					name: '个人住房房产税缴纳'
				},
				{
					name: '上海公共招聘'
				},
				{
					name: '公积金专区'
				},
				{
					name: '智慧接种'
				},
				{
					name: '我要租房'
				},
				{
					name: '居住证办理'
				}
			],
			HisList: [],
			HisList2: [
				{ name: '存量房买卖合同手拉手网上签约', item1: '上海市房屋管理局', item2: '公共服务' },
				{
					name: '房屋等建筑物、构筑物所有权等级-首次登记',
					item1: '上海市规划和自然资源局',
					item2: '行政确认'
				},
				{
					name: '房屋等建筑物、构筑物所有权等级-转移登记',
					item1: '上海市规划和自然资源局',
					item2: '行政确认'
				}
			],
			keyHeight: 0,
			syshei: this.$store.state.BH + 10,
			show: true,
			searchContentList: ['我的不动产', '我的房屋', '我的不动产查询', '公积金'],
			searchContentResList: []
		};
	},
	onLoad() {
		// #ifdef APP-PLUS
		uni.onKeyboardHeightChange((res) => {
			// 监听软键盘的高度，页面隐藏后一定要取消监听键盘
			this.keyHeight = res.height + 15;
			if (res.height == 0) {
				this.Talk = false;
			} else {
				this.Talk = true;
			}
		});
		// #endif
	},
	onHide() {
		// #ifdef APP-PLUS
		// 取消监听键盘高度
		uni.offKeyboardHeightChange((res) => {});
		// #endif
	},
	methods: {
		selectItem(searchContent) {
			this.keyname = searchContent;
			this.show = false;
			this.serach(searchContent);
		},
		UpsearchContent() {
			if (this.keyname.length > 0) {
				this.mkf = '';
				this.showInOne = false;
			} else {
				this.mkf = '/static/img/index-img/mkf.png';
				this.showInOne = true;
			}
			if (this.keyname.trim() === '') {
				this.searchContentResList = []; // 清空搜索结果数组
			} else {
				this.showInOne = false;
				this.show = true;
				const searchContentResList = this.searchContentList.filter((item) => item.includes(this.keyname));
				this.searchContentResList = searchContentResList;
			}
		},
		serach(e) {
			if (e == '公积金') {
				this.HisList = ['公积金', '我的不动产查询', '市区房地产交易中心查询'];
			} else {
				this.HisList = ['我的不动产', '我的不动产查询', '市区房地产交易中心查询'];
			}
			this.show = false;
		},
		back() {
			uni.navigateBack();
		},
		Go(A) {
			let t = this;
			if (A == '公积金') {
				t.showgjj = true;
			} else {
				uni.redirectTo({
					url: '/pages/userBook/index'
				});
			}
		},
		gjj() {
			uni.redirectTo({
				url: '/pages/CockGold/CockGold'
			});
		}
	}
};
</script>

<style lang="scss">
.Main {
	padding: 0 30rpx;

	.Input {
		display: flex;
		align-items: center;
		height: 60rpx;

		.uuinput {
			border-radius: 50rpx;
			background: #fff;

			border: 1px solid #c7b58b !important;
		}
		.Clear {
			background-color: #fff;
			margin-left: 25rpx;

			color: #c7b58b;
			font-weight: 400;
			font-size: 30rpx;
		}
	}
	.History {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 44rpx;
		margin-bottom: 27rpx;
		font-size: 26rpx;
		font-weight: 500;
		color: #000000;
		font-family: MiSans;
	}
	.HisBox {
		display: inline-block;
		color: #c2b790;
		font-weight: 400;
		font-size: 24rpx;
		padding: 10rpx 26rpx;
		background: #f8f7f3;
		border-radius: 5rpx;
		margin-bottom: 36rpx;
	}
	.SearchTitle {
		font-size: 28rpx;
		color: #000000;
		font-weight: bold;
		padding-bottom: 27rpx;
	}
	.SearchTitle2 {
		font-size: 28rpx;
		color: #000000;
		font-weight: bold;
		padding-bottom: 29rpx;
		border-bottom: 1rpx solid #e5e5e5;
	}
	.Box2 {
		.Item2 {
			padding: 28rpx 0 30rpx;
			border-bottom: 1rpx solid #e5e5e5;
			.Name2 {
				font-size: 28rpx;
				font-weight: 400;
				color: #000000;
			}
		}
	}

	.Box {
		display: flex;
		flex-wrap: wrap;
		.Item {
			display: flex;
			align-items: center;
			margin-bottom: 25rpx;
			padding: 13rpx 26rpx;
			background: #fcfaf5;
			font-size: 28rpx;
			margin-right: 15rpx;
			.Name {
				color: #cab385;
				font-weight: 400;
			}
			.Hot {
				font-size: 24rpx;
				color: #fff;
				background-color: #f8b13b;
				padding: 2rpx 4rpx;
				border-radius: 5rpx;
				margin-left: 15rpx;
			}
			.Rec {
				font-size: 24rpx;
				color: #fff;
				background-color: #c9a67a;
				padding: 2rpx 4rpx;
				border-radius: 5rpx;
				margin-left: 15rpx;
			}
			.New {
				font-size: 24rpx;
				color: #fff;
				background-color: #a089fd;
				padding: 2rpx 4rpx;
				border-radius: 5rpx;
				margin-left: 15rpx;
			}
		}
	}
	.LookMore {
		margin: 37rpx 0 45rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #f8f7f3;
		border-radius: 5rpx;
		padding: 22rpx 0;
		color: #c2b790;
		font-size: 24rpx;
		font-weight: 400;
	}
	.Talk {
		width: 259rpx;
		height: 100rpx;
		background: #ffffff;
		box-shadow: 0rpx 3rpx 10rpx rgba(0, 0, 0, 0.16);
		opacity: 1;
		border-radius: 50rpx;
		position: absolute;
		left: 50%;
		margin-left: -130rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		font-weight: 500;
		color: #c1b394;
		image {
			margin-right: 19rpx;
		}
	}
	.gjjmask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: #00000050;
		z-index: 999999;
		.gjjpwd {
			position: fixed;
			background-color: #fff;
			border-radius: 20rpx;
			top: 450rpx;
			left: 100rpx;
			padding: 25rpx 25rpx 80rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
			.close {
				position: absolute;
				right: 20rpx;
				top: 20rpx;
			}
			.title {
				color: #333;
				font-size: 34rpx;
				padding: 15rpx 0;
			}
			.tips {
				color: #999;
				font-size: 24rpx;
				margin-bottom: 30rpx;
			}
		}
	}

	.SerTitle {
		font-size: 33rpx;
		font-weight: bold;
		color: #000000;
	}
	.HisList {
		padding: 32rpx 0;
		border-bottom: 2rpx solid #f2f2f2;
		color: #000000;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		.Item {
			font-size: 28rpx;
			font-weight: 400;
			color: #000000;
			margin-bottom: 18rpx;
		}
		.Item2 {
			display: flex;
			align-items: center;
			.O {
				color: #e16e37;
				font-size: 22rpx;
				padding: 5rpx 13rpx;
				background: #fcece8;
				border-radius: 5rpx;
			}
			.B {
				color: #7564cbff;
				font-size: 22rpx;
				padding: 5rpx 13rpx;
				background: #edebf7;
				border-radius: 5rpx;
				margin-left: 17rpx;
			}
		}
	}
	.look-more-button {
		background: #fcfaf5;
		padding: 25rpx 0;
		font-size: 34rpx;
		color: #cab385;
		text-align: center;
		margin-top: 54rpx;
	}
	.SerTitle2 {
		font-size: 33rpx;
		font-weight: bold;
		padding-bottom: 23rpx;
		border-bottom: 1rpx solid #e5e5e5;
		color: #000000;
	}
	.HisList2 {
		padding: 32rpx 0;
		border-bottom: 2rpx solid #f2f2f2;
		font-size: 28rpx;
		color: #000000;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.left {
			.Item {
				font-size: 28rpx;
				font-weight: 400;
				color: #000000;
				margin-bottom: 18rpx;
			}
			.Item2 {
				display: flex;
				align-items: center;
				.O {
					color: #e16e37;
					font-size: 22rpx;
					padding: 5rpx 13rpx;
					background: #fcece8;
					border-radius: 5rpx;
				}
				.B {
					color: #7564cbff;
					font-size: 22rpx;
					padding: 5rpx 13rpx;
					background: #edebf7;
					border-radius: 5rpx;
					margin-left: 17rpx;
				}
			}
		}
		.right {
		}
	}
}
</style>
