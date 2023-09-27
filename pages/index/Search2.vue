<template>
	<view class="Main">
		<navbar Title="搜索"></navbar>
		<view class="Input" :style="{ marginTop: 10 + 'px' }">
			<u--input
				:class="[keyname ? 'uuinput' : 'uinput']"
				placeholderStyle="font-size:24rpx;color: #888888;"
				placeholder="公交到站查询"
				prefixIcon="search"
				prefixIconStyle="font-size: 20px;color: #888888"
				:clearable="true"
				v-model="keyname"
				@confirm="serach(keyname)"
			></u--input>
			<view class="Clear" @click="back">取消</view>
		</view>
		<view v-if="show">
			<view class="History">
				<view class="HisTitle">历史搜索</view>
				<image class="HisDel" src="/static/a66.png" style="width: 40rpx; height: 40rpx" mode=""></image>
			</view>
			<view class="HisBox" @click="Go('bdc')">我的不动产</view>
			<view class="HisBox" style="margin-left: 20rpx" @click="Go('公积金')">公积金</view>
			<view class="SearchTitle">大家都在搜</view>
			<view class="Box">
				<view class="Item" v-for="(A, B) in List" :key="A.name">
					<view class="Name">
						{{ A.name }}
					</view>
					<view class="Hot" v-if="A.Hot == 1">热</view>
					<view class="Rec" v-if="A.recommend == 1">荐</view>
					<view class="New" v-if="A.new == 1">新</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="SerTitle" style="margin-top: 58rpx; margin-bottom: 20rpx">应用服务</view>
			<view class="HisList" v-for="(A, B) in HisList" :key="A" @click="Go(A)">
				{{ A }}
			</view>

			<view class="SerTitle" style="margin-top: 36rpx">办事指南</view>
			<view class="HisList" v-for="(A, B) in HisList2" :key="A.name">
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
		</view>
		<view class="LookMore" v-if="!show">查看更多</view>
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
			List: [
				{
					name: '公交到站查询',
					Hot: 1
				},
				{
					name: '随身码刷码乘车活动',
					recommend: 1
				},
				{
					name: '信用就医',
					new: 1
				},
				{
					name: '我要租房'
				},
				{
					name: '居住证办理'
				},
				{
					name: '三金账单'
				}
			],
			HisList: [],
			HisList2: [
				{ name: '我的小区信息', item1: '上海市房屋管理局', item2: '公共服务' },
				{
					name: '我的商品住宅维修资金查询',
					item1: '上海市房屋管理局',
					item2: '公共服务'
				},
				{
					name: '与不动产权利有关事项的记载-首次登记',
					item1: '上海市规划和自然资源局',
					item2: '行政确认'
				},
				{
					name: '我的商品住宅小区维修资金账目公布',
					item1: '上海市房屋管理局',
					item2: '公共服务'
				},
				{
					name: '我的商品住宅小区公共收益查询',
					item1: '上海市房屋管理局',
					item2: '公共服务'
				}
			],
			keyHeight: 0,
			syshei: this.$store.state.BH + 10,
			show: true
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
		serach(e) {
			if (e == '公积金') {
				this.HisList = ['公积金', '我的不动产查询', '市区房地产交易中心查询', '亮证', '专属'];
			} else {
				this.HisList = ['我的不动产', '我的不动产查询', '市区房地产交易中心查询', '亮证', '专属'];
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

		.uinput {
			border-radius: 50rpx 0rpx 0rpx 50rpx;
			background: #f2f2f2;
			outline: none;
			border: none;
		}
		.uuinput {
			border-radius: 50rpx;
			background: #f2f2f2;
			outline: none;
			border: none;
		}
		.Clear {
			background-color: #fff;
			margin-left: 25rpx;
			color: #000000;
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
		font-size: 26rpx;
		font-weight: 500;
		color: #000000;
		margin-bottom: 34rpx;
	}
	.Box {
		display: flex;
		flex-wrap: wrap;
		.Item {
			width: 50%;
			display: flex;
			align-items: center;
			margin-bottom: 25rpx;
			font-size: 26rpx;
			.Name {
				color: #333333;
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
		font-size: 30rpx;
		font-weight: 500;
		color: #000000;
	}
	.HisList {
		padding: 32rpx 0;
		border-bottom: 2rpx solid #f2f2f2;
		font-size: 26rpx;
		font-weight: 500;
		color: #333333;
		.Item {
			font-size: 26rpx;
			font-weight: 500;
			color: #333333;
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
}
</style>
