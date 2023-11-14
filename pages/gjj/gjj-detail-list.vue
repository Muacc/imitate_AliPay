<template>
	<view class="main">
		<navBar Title="住房公积金账户明细"></navBar>
		<view class="tabs">
			<view class="tab-item" v-for="(A, B) in tabList" :key="B" :class="{ BB6: tabIndex == B }" @click="changeTabIndex(B)">{{ A }}</view>
		</view>
		<view class="search-date-box">
			<view class="search-date">
				<view class="left" @click="openEtime">
					{{ formatTimestamp(etime) }}
				</view>
				<view class="text">至</view>
				<view class="right" @click="openCtime">
					{{ formatTimestamp(ctime) }}
				</view>
			</view>
			<view class="search-button" @click="getList2">查询</view>
			<image class="search-icon" src="/static/img/gjj-img/789.png"></image>
		</view>
		<view class="resList">
			<view class="item" v-for="(A, B) in resList" :key="B">
				<view class="top">
					<view class="left" v-if="A.type == 1">汇缴</view>
					<view class="left" v-else-if="A.type == 3">提取</view>
					<view class="left" v-else>全部</view>
					<view class="right">{{ A.data.money1 }}</view>
				</view>
				<view class="bottom">
					<view class="left">
						{{ A.d_time }}
					</view>
					<view class="right">余额：{{ A.data.balance1 }}</view>
				</view>
			</view>
		</view>
		<!-- 时间查询选择器，默认固定一年 客户需要再打开 -->
		<u-datetime-picker @cancel="clearPop" @confirm="ctimeOK" :min-date="etime" :max-date="Number(new Date())" :show="ctimeShow" v-model="ctime" mode="date"></u-datetime-picker>
		<u-datetime-picker
			@cancel="clearPop"
			@confirm="etimeOK"
			:min-date="Number(new Date()) - 1040688000000"
			:max-date="Number(new Date())"
			:show="etimeShow"
			v-model="etime"
			mode="date"
		></u-datetime-picker>
	</view>
</template>

<script>
import navBar from '@/components/gjj-navbar/gjj-navbar.vue';
export default {
	components: {
		navBar
	},
	onLoad(option) {
		this.$api.userInfo({}, (res) => {
			this.userId = res.data.id;
			this.getList();
		});
		if (option.tabIndex) {
			this.tabIndex = option.tabIndex;
		}
	},
	data() {
		return {
			ctimeShow: false,
			etimeShow: false,
			tabIndex: 0,
			tabList: ['全部', '缴存', '提取'],
			page: 1,
			userId: '',
			ctime: Number(new Date()),
			etime: Number(new Date(new Date().setFullYear(new Date().getFullYear() - 1))),
			resList: [],
			more: true
		};
	},
	onReachBottom() {
		this.page++;
		if (more) {
			this.getList();
		}
	},
	methods: {
		etimeOK(e) {
			this.etime = e.value;
			console.log(e);
			this.etimeShow = false;
		},
		ctimeOK(e) {
			this.ctime = e.value;
			this.ctimeShow = false;
			console.log(e);
		},
		clearPop() {
			this.etimeShow = false;
			this.ctimeShow = false;
		},
		openEtime() {
			this.etimeShow = true;
		},
		openCtime(e) {
			this.ctimeShow = true;
		},
		getList() {
			let t = this;
			t.$api.AccountDetail(
				{
					user_id: t.userId,
					start_time: t.formatTimestamp(t.etime),
					end_time: t.formatTimestamp(t.ctime),
					page: t.page,
					limit: 20,
					type: t.tabIndex
				},
				(res) => {
					if (res.data.length > 0) {
						t.resList.push(...res.data);
					} else {
						t.more = false;
					}
				}
			);
		},
		getList2() {
			let t = this;
			t.page = 1;
			t.resList = [];
			t.$api.AccountDetail(
				{
					user_id: t.userId,
					start_time: t.formatTimestamp(t.etime),
					end_time: t.formatTimestamp(t.ctime),
					page: t.page,
					limit: 20,
					type: t.tabIndex
				},
				(res) => {
					if (res.data.length > 0) {
						t.resList.push(...res.data);
					} else {
						t.more = false;
					}
				}
			);
		},
		formatTimestamp(timestamp) {
			const date = new Date(timestamp);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			return `${year}-${month}-${day}`;
		},
		changeTabIndex(tabIndex) {
			if (this.tabIndex !== tabIndex) {
				this.resList = [];
				this.tabIndex = tabIndex;
				this.ctime = Number(new Date());
				this.etime = Number(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
				this.getList();
			}
		}
	}
};
</script>

<style lang="scss">
.main {
	.tabs {
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 16rpx 0 11rpx;
		.tab-item {
			padding: 6rpx 12rpx;
			border-bottom: 6rpx solid transparent;
		}
		.BB6 {
			border-bottom: 6rpx solid #2251d3;
		}
	}
	.search-date-box {
		display: flex;
		align-items: center;
		padding: 27rpx 21rpx 25rpx 17rpx;

		background: #f5f5f5;
		.search-date {
			display: flex;
			align-items: center;
			border: 1rpx solid #999999;
			padding: 12rpx 22rpx;
			.left {
				font-size: 32rpx;
				font-weight: bold;
				color: #2251d3;
			}
			.right {
				font-size: 32rpx;
				font-weight: bold;
				color: #2251d3;
			}
			.text {
				margin: 0 21rpx;
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
			}
		}
		.search-button {
			padding: 10rpx 21rpx;
			background: #2251d3;
			border-radius: 10rpx;
			font-size: 30rpx;
			color: #ffffff;
			margin: 0 32rpx 0 25rpx;
		}
		.search-icon {
			width: 52rpx;
			height: 44rpx;
		}
	}
	.resList {
		.item {
			margin: 0 25rpx 0 28rpx;
			padding: 30rpx 0;
			.top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 9rpx;
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
			}
			.bottom {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;
				font-weight: bold;
				color: #999999;
			}
		}
	}
}
</style>
