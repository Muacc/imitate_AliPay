<template>
	<view class="Main">
		<navbar Title="住房公积金账户明细信息"></navbar>
		<view class="top">
			<view class="start-time" @click="Show1">
				{{ startTime | formatDate }}
			</view>
			至
			<view class="end-time" @click="Show2">
				{{ endTime | formatDate }}
			</view>
			<view class="search" @click="AccountDetail">查询</view>
		</view>
		<view class="list">
			<view class="items" v-for="(A, B) in Data" :key="B">
				<view class="noShow" @click="upShowIndex(B)">
					<view class="top-item">
						<view class="top-left">
							{{ A.type_name }}
							<view class="top-left-bottom">
								{{ A.d_time }}
							</view>
						</view>
						<view class="top-item-right">
							{{ A.data.money }}
						</view>
					</view>
				</view>
				<view :class="[showIndex === B ? 'show-active' : 'show']">
					<view class="MoreItem" v-if="A.type == 1">
						<view class="MoreName">汇缴月份</view>
						<view class="MoreInfo">
							{{ A.ctime }}
						</view>
					</view>
					<view class="MoreItem" v-if="A.type == 3">
						<view class="MoreName">业务发生原因</view>
						<view class="MoreInfo">
							{{ A.remarks }}
						</view>
					</view>
					<view class="MoreItem">
						<view class="MoreName">当前余额</view>
						<view class="MoreInfo">{{ A.data.balance }} 元</view>
					</view>
					<view class="MoreItem" v-if="A.type == 2">
						<view class="MoreName">银行利息</view>
						<view class="MoreInfo">{{ A.data.interest }} 元</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tips">
			<view class="line"></view>
			<view class="text">您最多可查询近三年的账户明细</view>
			<view class="line"></view>
		</view>
		<u-datetime-picker :show="show1" mode="date" :formatter="formatter" @cancel="ShowHidden" :minDate="TimeMin()" :maxDate="TimeMax()" @confirm="BeginOK"></u-datetime-picker>
		<u-datetime-picker
			:show="show2"
			v-model="value"
			mode="date"
			:formatter="formatter"
			@cancel="ShowHidden"
			visibleItemCount="6"
			:minDate="TimeMin()"
			:maxDate="TimeMax()"
			@confirm="EndOK"
		></u-datetime-picker>
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
			value: Number(new Date()),
			showIndex: [],
			startTime: 0,
			endTime: 1,
			show1: false,
			show2: false,
			user_id: '',
			Data: []
		};
	},
	onLoad() {
		this.GetGold();
	},
	onReachBottom() {
		this.page++;
		this.AccountDetail2(this.user_id);
	},
	methods: {
		LT() {
			uni.navigateBack();
		},
		TimeMin() {
			let date = new Date().getTime();
			let dates = date - 31536000000 * 3;
			return dates;
		},
		TimeMax() {
			let date = new Date().getTime();
			return date;
		},
		GetGold() {
			this.$api.UserGold({}, (res) => {
				this.user_id = res.data.id;
				// this.AccountDetail2(res.data.id);
			});
		},
		AccountDetail() {
			this.Data = [];
			this.page = 1;
			this.AccountDetail2(this.user_id);
		},
		AccountDetail2(e) {
			if (this.startTime !== '' && this.endTime !== '') {
				let start_time = this.Date(this.startTime);
				let end_time = this.Date(this.endTime);
				this.$api.AccountDetail(
					{
						start_time,
						end_time,
						limit: 20,
						page: this.page,
						user_id: e
					},
					(res) => {
						if (res.status) {
							this.Data.push(...res.data);
						} else {
							uni.showToast({
								title: '没有更多数据',
								icon: 'none'
							});
						}
					}
				);
			} else {
				let start_time = '';
				let end_time = '';
				this.$api.AccountDetail(
					{
						start_time: start_time,
						end_time: end_time,
						limit: 20,
						page: this.page,
						user_id: e
					},
					(res) => {
						this.Data.push(...res.data);
					}
				);
			}
		},
		upShowIndex(index) {
			if (this.showIndex === index) {
				this.showIndex = null; // 点击已展示的项，则隐藏对应的show
			} else {
				this.showIndex = index; // 点击未展示的项，则显示对应的show
			}
		},
		Show1() {
			this.show1 = true;
		},
		Show2() {
			this.show2 = true;
		},
		BeginOK(e) {
			this.startTime = e.value;
			this.show1 = false;
			this.show2 = false;
			console.log();
		},
		EndOK(e) {
			this.endTime = e.value;
			this.show1 = false;
			this.show2 = false;
		},
		ShowHidden() {
			this.show1 = false;
			this.show2 = false;
		},
		formatter(type, value) {
			if (type === 'year') {
				return `${value}`;
			}
			if (type === 'month') {
				return `${value}`;
			}
			if (type === 'day') {
				return `${value}`;
			}
			return value;
		},
		Date(value) {
			let date = new Date(value);
			//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			let y = date.getFullYear();
			let MM = date.getMonth() + 1;
			MM = MM < 10 ? '0' + MM : MM; //月补0
			let d = date.getDate();
			d = d < 10 ? '0' + d : d; //天补0
			let h = date.getHours();
			h = h < 10 ? '0' + h : h; //小时补0
			let m = date.getMinutes();
			m = m < 10 ? '0' + m : m; //分钟补0
			let s = date.getSeconds();
			s = s < 10 ? '0' + s : s; //秒补0
			return y + '-' + MM + '-' + d; //年月日
		},
		formatter(type, value) {
			if (type === 'year') {
				return `${value}`;
			}
			if (type === 'month') {
				return `${value}`;
			}
			if (type === 'day') {
				return `${value}`;
			}
			return value;
		},
		TimeMin() {
			let date = new Date().getTime();
			let dates = date - 31536000000 * 3;
			return dates;
		},
		TimeMax() {
			let date = new Date().getTime();
			return date;
		},
		Show1() {
			this.show1 = true;
		},
		Show2() {
			this.show2 = true;
		},
		ShowHidden() {
			this.show1 = false;
			this.show2 = false;
		}
	},
	filters: {
		formatDate(value) {
			if (value == 0) {
				return '请选择开始时间';
			} else if (value == 1) {
				return '请选择结束时间';
			}
			let date = new Date(value);
			//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			let y = date.getFullYear();
			let MM = date.getMonth() + 1;
			MM = MM < 10 ? '0' + MM : MM; //月补0
			let d = date.getDate();
			d = d < 10 ? '0' + d : d; //天补0
			let h = date.getHours();
			h = h < 10 ? '0' + h : h; //小时补0
			let m = date.getMinutes();
			m = m < 10 ? '0' + m : m; //分钟补0
			let s = date.getSeconds();
			s = s < 10 ? '0' + s : s; //秒补0
			return y + '-' + MM + '-' + d; //年月日
		}
	}
};
</script>

<style lang="scss">
::v-deep .u-picker__view__column__item {
	font-size: 36rpx !important;
	font-weight: 400 !important;
}

::v-deep .u-toolbar__wrapper__confirm {
	color: #c7b68b !important;
}

::v-deep .u-navbar__content {
	height: 100rpx !important;
}

::v-deep .u-toolbar__wrapper__cancel {
	color: #c7b68b !important;
}

::v-deep .u-toolbar {
	justify-content: space-around;
}

::v-deep .u-collapse-item {
	margin: 0 30rpx !important;
	border-bottom: 1rpx solid rgba(170, 170, 170, 0.1);
	// border-bottom: 1px solid #000;
	// align-items: flex-start;
}

::v-deep .u-cell__body {
	padding: 25rpx 0 !important;
	align-items: flex-start;
}

::v-deep .u-cell__right-icon-wrap--up {
	height: 32rpx !important;
}

::v-deep .u-collapse-item__content__text {
	padding: 0 0 24rpx 0 !important;
}
.top {
	margin: 40rpx 32rpx 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.start-time {
		width: 235rpx;
		height: 59rpx;
		border: 1px solid #e5e5e5;
		opacity: 1;
		border-radius: 4rpx;
		color: #cccccc;
		font-weight: 400;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.end-time {
		width: 235rpx;
		height: 59rpx;
		border: 1px solid #e5e5e5;
		opacity: 1;
		border-radius: 4rpx;
		color: #cccccc;
		font-weight: 400;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.search {
		padding: 8rpx 24rpx;
		background: #c7b58b;
		border-radius: 4rpx;
		font-weight: 400;
		font-size: 24rpx;
		color: #ffffff;
	}
}
.list {
	.items {
		padding: 35rpx 33rpx 18rpx 31rpx;
		.noShow {
			.top-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.top-left {
					font-size: 33rpx;
					font-weight: 400;
					color: #000000;
					.top-left-bottom {
						font-size: 28rpx;
						font-weight: 400;
						color: #999999;
					}
				}
				.top-item-right {
				}
			}

			.bottom {
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
			}
		}

		.show {
			display: none;
			.MoreItem {
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.MoreName {
				}
				.MoreInfo {
				}
			}
		}
		.show-active {
			display: block;
			.MoreItem {
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.MoreName {
				}
				.MoreInfo {
				}
			}
		}
	}
}

.tips {
	display: flex;
	align-items: center;
	margin: 76rpx 33rpx 0;
	.line {
		border-bottom: 1rpx solid #bcbec0;
		flex: 1;
	}
	.text {
		font-weight: 400;
		color: #cccccc;
		font-size: 26rpx;
		margin: 0 8rpx;
	}
}
</style>
