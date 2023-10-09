<template>
	<view>
		<view class="main2" v-if="next == 0">
			<!-- #ifdef H5 -->
			<nav style="height: 97rpx"></nav>
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<nav :style="{ height: $store.state.BH + 15 + 'px' }"></nav>
			<!-- #endif -->
			<image class="bg" src="/static/img/bdc-img/165.png" mode=""></image>
			<view class="nav" @click="back">
				<image src="/static/img/index-img/zjtzz.png" mode=""></image>
				搜索
			</view>
			<view class="title">我的不动产</view>
			<view class="box">
				<view class="box-title">便民服务</view>
				<view class="item" @click="Go('/pages-two/my/cx')">
					<view class="left">
						<image src="/static/img/bdc-img/1.png" mode=""></image>
						我的不动产查询
					</view>
					<image class="yjt" src="/static/img/my-img/yjt6.png" mode=""></image>
				</view>
				<view class="line"></view>
				<view class="item">
					<view class="left">
						<image src="/static/img/bdc-img/2.png" mode=""></image>
						开具本市房屋查询结果证明
					</view>
					<image class="yjt" src="/static/img/my-img/yjt6.png" mode=""></image>
				</view>
				<view class="line2"></view>
			</view>
		</view>
		<view class="main" v-else>
			<view class="bgc"></view>
			<view class="fixed">
				<nav :style="{ height: $store.state.BH + 10 + 'px' }"></nav>
				<view class="MP-nav">
					<view class="left">
						<image src="/static/img/gjj-img/home.png"></image>
						我的不动产
					</view>
					<view class="right">
						<image class="sc" src="/static/img/gjj-img/sc.png"></image>
						<image class="jn" src="/static/img/gjj-img/jn.png"></image>
					</view>
				</view>
			</view>
			<view class="block" :style="{ height: $store.state.BH + 10 + 'px' }"></view>
			<view class="MainBox">
				<view class="Title">个人信息</view>
				<view class="Info">
					<view class="name">
						申请查询人姓名：
						<text>{{ encryptName(UserData.true_name) }}</text>
					</view>
					<view class="id">
						身份证号码：
						<text>{{ hideIdNumber(UserData.cert_number) }}</text>
					</view>
				</view>
				<view class="Search">
					<view class="SearchOk" :class="[{ cx: cxs }, { f0: sclass }]" v-if="cx" @touchstart="onTouchStart('cx')" @touchend="chaxun('cx')">查询</view>
					<view class="SearchOk" :class="[{ cx: cxs }, { f0: sclass }]" v-else @touchstart="onTouchStart('cx')" @touchend="chaxun('cx')">再次查询</view>
				</view>
			</view>
			<view class="Line"></view>
			<view class="Time" v-if="!cx">
				上一次查询时点：
				<text>{{ time }}</text>
			</view>
			<view class="List" v-if="!cx">
				<view class="Item" v-for="(A, B) in imgs" :key="B">
					<view class="cell-item">
						所在区：
						<text>{{ A.name }}</text>
					</view>
					<view class="cell-item">
						房屋坐落：
						<text>{{ A.address }}</text>
					</view>
					<view class="cell-item">
						室号部位：
						<text>{{ A.part }}</text>
					</view>
					<view class="Btns">
						<view class="b1" @touchstart="onTouchStart('dz')" @touchend="open(['fade'])" :class="[{ f1: sclass }]">电子证照</view>
						<view class="b2" @touchstart="onTouchStart('dj')" @touchend="showpre(A.djb, true)" :class="[{ f0: sclass }]">登记簿</view>
						<view class="b2" @touchstart="onTouchStart('fw')" @touchend="showpre(A.plan_url)" :class="[{ f0: sclass }]">房屋平面图</view>
						<view class="b2" @touchstart="onTouchStart('zd')" @touchend="showpre(A.zongdi_img_url)" :class="[{ f0: sclass }]">宗地图</view>
					</view>
				</view>
			</view>
			<uni-transition :duration="500" :mode-class="modeClass" :styles="transfromClass" :show="transShow">
				<view
					style="
						padding: 31rpx 42rpx 29rpx 27rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #000000;
						display: flex;
						align-items: center;
						background-color: #fff;
						border: 1rpx solid #99999950;
					"
				>
					<image src="/static/xla.png" style="width: 61rpx; height: 61rpx; margin-right: 18rpx" mode=""></image>
					后台制证中，请5分钟后再次点击查看
				</view>
			</uni-transition>
			<uni-transition :duration="500" :mode-class="modeClass" :styles="transfromClass" :show="transShow2">
				<view
					style="
						padding: 31rpx 42rpx 29rpx 27rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #000000;
						display: flex;
						background-color: #fff;
						border: 1px solid #d7d7d7;
						border-radius: 10rpx;
					"
				>
					<image src="/static/xla.png" style="width: 61rpx; height: 61rpx; margin-right: 18rpx" mode=""></image>
					<view class="P">
						<view class="P1">未查询到您的电子证照，敬请谅解.</view>
						<view class="P2">相关提示：</view>
						<view class="P3">电子证照仅支持2016年10月8日本市实施不动 产统一登记后颁发的不动产权电子证书</view>
					</view>
				</view>
			</uni-transition>
			<view class="PreMask" v-if="pre" :style="{ top: $store.state.BH + 10 + 'px' }">
				<view class="header">
					<view class="left">
						<image src="/static/122.png" mode=""></image>
						<image src="/static/121.png" mode=""></image>
						<view class="page">{{ page }}</view>
						/
						<view class="all-page">{{ sceimg.length }}</view>
					</view>
					<view class="right">
						<image src="/static/123.png" class="jian" mode=""></image>
						<view class="shu"></view>
						<image src="/static/770.png" class="jia" mode=""></image>
					</view>
				</view>
				<scroll-view scroll-y="true" class="scroll" style="width: 100vw; height: 927rpx; text-align: center" @scroll="hei">
					<view v-for="(C, D) in sceimg" :key="C" class="tu" style="display: inline-block; width: 656rpx; height: 927rpx; margin-bottom: 25rpx">
						<image :src="C" style="width: 100%" mode="widthFix"></image>
						<view class="timetime" :class="'time' + D" v-if="bl">
							查询日期:
							<text>{{ time }}</text>
						</view>
						<view class="timetime" v-if="D == 0 && bl" :class="'timell'">
							查询日期:
							<text>{{ time }}</text>
						</view>
					</view>
				</scroll-view>
				<view class="black-line"></view>
				<view class="" style="height: 260rpx; background-color: rgba(0, 0, 0, 0.4)">
					<view class="close" @click="close">返回</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			next: 0,
			transShow: false,
			transShow2: false,
			modeClass: ['fade'],
			transfromClass: {
				position: 'fixed',
				bottom: 0,
				top: 0,
				left: 0,
				right: 0,
				display: 'flex',
				'justify-content': 'center',
				'align-items': 'center',
				'padding-top': '270rpx',
				'border-radius': '10rpx'
			},
			sh: this.$store.state.SysHei / 2,
			UserData: {},
			cx: false,
			time: '',
			pre: false,
			page: 1,
			imgs: [],
			sceimg: [],
			Time: 0,
			imageUrl: '',
			ififurl: '',
			bl: false,
			sclass: false,
			dzzz: false,
			djb: false,
			fwpmt: false,
			zdt: false,
			cxs: false
		};
	},

	onLoad() {
		this.GetInfo();
		this.GetImg();
		this.chaxun();
		// this.getWord();
	},
	onReady() {
		this.cx = true;
	},
	mounted() {},
	methods: {
		encryptName(name) {
			if (name.length === 2) {
				return name.replace(/./, '*');
			} else if (name.length === 3 || name.length === 4) {
				return name.replace(/^(.)(.*)(.)$/, function (match, firstChar, hiddenPart, lastChar) {
					var hiddenStr = hiddenPart.replace(/./g, '*');
					return firstChar + hiddenStr + lastChar;
				});
			} else {
				return name.replace(/^(.)(.*)(.)$/, function (match, firstChar, hiddenPart, lastChar) {
					var hiddenStr = hiddenPart.replace(/./g, '*');
					return firstChar + hiddenStr + lastChar;
				});
			}
		},
		back() {
			uni.navigateBack();
		},
		Go(e) {
			this.next = 1;
		},
		onTouchStart(str) {
			const t = this;
			this.sclass = true;
			if (str == 'dz') {
				t.dzzz = true;
			} else if (str == 'dj') {
				t.djb = true;
			} else if (str == 'fw') {
				t.fwpmt = true;
			} else if (str == 'zd') {
				t.zdt = true;
			} else if (str == 'cx') {
				t.cxs = true;
			}
		},
		onTouchEnd() {
			this.sclass = false;
		},
		getWord() {
			let t = this;
			t.$api.readWord({}, (res) => {
				//获取文档url
				t.sceimg.push(...res.data);
			});
		},
		clickA() {
			const currentTime = Date.now();
			const targetTime = this.Time + 2 * 60 * 1000; // 将当前时间戳加上5分钟

			if (targetTime > currentTime) {
				this.Time = targetTime;
			} else {
				console.log('时间未到');
			}
		},
		clickB() {
			if (this.Time === 0) {
				this.clickA(); // 执行和按钮A相同的逻辑
			} else {
				const currentTime = Date.now();

				if (currentTime < this.Time) {
					console.log('时间未到');
				} else {
					console.log('时间到啦');
				}
			}
		},
		hideIdNumber(idNumber) {
			return idNumber.replace(/^(.{6})(.*)(.{4})$/, function (match, prefix, hiddenPart, suffix) {
				var hiddenStr = hiddenPart.replace(/./g, '*');
				return prefix + hiddenStr + suffix;
			});
		},
		close() {
			this.pre = false;
		},
		back() {
			uni.navigateBack();
		},
		GetImg() {
			let t = this;
			this.$api.entering({}, (res) => {
				t.imgs = res.data;
				if (res.data.code === 2) {
				}
			});
		},
		hei(e) {
			let top = e.detail.scrollTop;
			let t = this;
			if (top > 0 && top < 463) {
				this.page = 1;
			} else if (top >= 463 && top < 463 * 2) {
				this.page = 2;
			} else if (top >= 463 * 2 && top < 463 * 3) {
				this.page = 3;
			} else if (top >= 463 * 3 && top < 463 * 4) {
				this.page = 4;
			} else if (top >= 463 * 4 && top < 463 * 5) {
				this.page = 5;
			} else if (top >= 463 * 5 && top < 463 * 6) {
				this.page = 6;
			}
		},
		GetInfo() {
			this.$api.userInfo({}, (res) => {
				this.UserData = res.data;
			});
		},
		chaxun() {
			this.clearClass();
			this.cx = false;
			this.ctime();
			const currentTime = Date.now();
			const targetTime = currentTime + 2 * 60 * 1000; // 将当前时间戳加上5分钟
			this.Time = targetTime;
		},
		ctime() {
			var date = new Date();
			var year = date.getFullYear();
			var month = ('0' + (date.getMonth() + 1)).slice(-2); // 月份从0开始，需加1，并补零
			var day = ('0' + date.getDate()).slice(-2); // 补零
			var hour = ('0' + date.getHours()).slice(-2); // 补零
			var minute = ('0' + date.getMinutes()).slice(-2); // 补零
			var s = ('0' + date.getSeconds()).slice(-2); // 补零
			this.time = year + '年' + month + '月' + day + '日' + hour + '点' + minute + '分' + s + '秒';
		},
		clearClass() {
			this.dzzz = false;
			this.djb = false;
			this.fwpmt = false;
			this.zdt = false;
			this.cxs = false;
			this.sclass = false;
		},
		open(mode) {
			this.clearClass();
			this.modeClass = mode;
			this.transShow2 = !this.transShow2;
			setTimeout(() => {
				this.transShow2 = false;
			}, 4000);
		},
		showpre(e, blo = false) {
			let t = this;
			t.clearClass();
			t.bl = blo;
			const currentTime = Date.now();

			if (currentTime < t.Time) {
				t.transShow = !t.transShow;
				setTimeout(() => {
					t.transShow = false;
				}, 800);
			} else {
				t.sceimg = e;
				if (!t.pre) {
					t.page = 1;
					t.pre = true;
				}
			}
		},
		showpre(e, blo = false) {
			let t = this;
			t.clearClass();
			t.bl = blo;
			t.sceimg = e;
			t.page = 1;
			t.pre = true;
		}
	}
};
</script>

<style lang="scss">
.main2 {
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 322rpx;
		z-index: -1;
	}
	.nav {
		font-size: 34rpx;
		font-weight: bold;
		color: #000000;
		margin-left: 36rpx;
		display: flex;
		align-items: center;
		image {
			margin-right: 7rpx;
			width: 19rpx;
			height: 33rpx;
		}
	}
	.title {
		margin: 30rpx 0 0 33rpx;
		font-size: 40rpx;
		font-weight: bold;
		color: #ffffff;
	}
	.box {
		margin: 90rpx 24rpx;
		box-shadow: -4rpx 30rpx 20rpx rgba(0, 0, 0, 0.05);
		padding-bottom: 48rpx;
		border-radius: 0 0 9rpx 9rpx;
		.box-title {
			margin: 5rpx 0 61rpx 34rpx;
			font-size: 37rpx;
			font-weight: bold;
			color: #000000;
		}
		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 18rpx 0 25rpx;
			.left {
				display: flex;
				align-items: center;
				font-size: 32rpx;
				font-weight: 400;
				color: #000000;
				image {
					width: 73rpx;
					height: 73rpx;
					margin-right: 32rpx;
				}
			}
			.yjt {
				width: 14rpx;
				height: 25rpx;
			}
		}
		.line {
			height: 1rpx;
			background: #ededed;
			margin: 34rpx 14rpx;
		}
		.line2 {
			height: 1rpx;
			background: #ededed;
			margin: 34rpx 14rpx 0;
		}
	}
}
.Nav {
	width: 100%;
	background: #c6b388;
	display: flex;
	align-items: center;
	padding: 110rpx 46rpx 30rpx;
	position: sticky;
	top: 0;
	left: 0;
	z-index: 999;

	.NavL {
		font-weight: 400;
		color: #ffffff;
		font-size: 30rpx;
		display: flex;
		align-items: center;

		image {
			margin-right: 27rpx;
		}
	}

	.Title {
		margin-left: 110rpx;
		font-size: 40rpx;
		color: #ffffff;
		font-weight: 400;
	}
}

.P {
	display: flex;
	flex-direction: column;
	width: 504rpx;
	font-size: 26rpx;
	font-weight: 400;
	color: #000000;

	.P1 {
		margin: 8rpx 0 40rpx 0;
	}

	.P2 {
	}

	.P3 {
	}
}
.main {
	.bgc {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -5;
		background-color: #f5f5f5;
	}
}
.MainBox {
	padding: 0 15rpx;

	.Title {
		padding-left: 7rpx;
		font-size: 32rpx;
		color: #5976a1;
		font-weight: 500;
		margin: 15rpx 0 40rpx;
		padding-top: 10rpx;
	}

	.Info {
		.name {
			font-size: 27rpx;
			color: #8f8f8f;
			font-weight: 400;
			margin-bottom: 40rpx;
			display: flex;
			align-items: center;

			text {
				color: #3f3f3f;
			}
		}

		.id {
			display: flex;
			align-items: center;
			font-size: 27rpx;
			color: #8f8f8f;
			font-weight: 400;
			margin-bottom: 36rpx;

			text {
				color: #3f3f3f;
			}
		}
	}

	.Search {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 17rpx;

		.SearchOk {
			display: inline-block;
			padding: 8rpx 27rpx;
			font-size: 28rpx;
			font-weight: 500;
			color: #ffffff;
			background: #c7b68b;
			border-radius: 10rpx;
		}
	}
}

.Line {
	width: 100vw;
	height: 1rpx;
	background: #ededed;
	margin-bottom: 18rpx;
}

.Time {
	font-size: 27rpx;
	color: #8f8f8f;
	margin-left: 15rpx;

	text {
		color: #3f3f3f;
		font-weight: 400;
	}
}

.List {
	margin: 0 17rpx;

	.Item {
		margin-top: 18rpx;
		border: 1px solid #eaeaea;
		border-radius: 5rpx;
		padding: 22rpx 22rpx 16rpx 16rpx;
		font-size: 27rpx;

		.cell-item {
			font-weight: 400;
			margin-top: 5rpx;
			color: #8f8f8f;

			text {
				color: #000000;
			}
		}

		.Btns {
			display: flex;
			align-items: center;
			margin-right: 22rpx;
			justify-content: space-between;
			margin-top: 12rpx;

			.b1 {
				background: #515151;
				border-radius: 10rpx;
				color: #ffffff;
				font-weight: 400;
				font-size: 27rpx;
				padding: 8rpx 23rpx;
				margin-left: 45rpx;
			}

			.b2 {
				font-size: 27rpx;
				font-weight: 400;
				border-radius: 10rpx;
				padding: 8rpx 23rpx;
				background: #c7b68b;
				color: #ffffff;
			}
		}
	}
}

.PreMask {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999999;
	height: 838rpx;
	background-color: #373737;

	.header {
		background-color: #434343;
		padding: 15rpx 22rpx 20rpx;
		display: flex;
		align-items: center;

		.left {
			display: flex;
			align-items: center;
			font-size: 20rpx;
			font-weight: 400;
			color: #ffffff;

			image {
				width: 33rpx;
				height: 33rpx;
				margin-right: 26rpx;
			}

			.page {
				border: 2rpx solid #000;
				border-radius: 6rpx;
				background-color: #5b5b5b;
				padding: 6rpx 15rpx 6rpx 68rpx;
				margin-right: 6rpx;
			}

			.all-page {
				margin-left: 6rpx;
			}
		}

		.right {
			display: flex;
			align-items: center;
			margin-left: 220rpx;

			.jian {
				width: 18rpx;
				height: 4rpx;
			}

			.shu {
				background-color: #212121;
				width: 4rpx;
				height: 40rpx;
				margin: 0 17rpx;
			}

			.jia {
				width: 18rpx;
				height: 18rpx;
			}
		}
	}

	.bgbg {
		position: absolute;
		top: 0;
		bottom: 0;
	}
}

.close {
	display: inline-block;
	padding: 10rpx 26rpx;
	background: #c7b68b;
	border-radius: 8rpx;
	font-size: 24rpx;
	color: #ffffff;
	font-weight: bold;
	margin: 14rpx 0 0 6rpx;
}

.tu {
	position: relative;
	background-color: #fff;
}

.zhang {
	position: absolute;
	width: 60px;
	height: 30px;
	top: 40%;
	right: 40%;
}

.timetime {
	position: absolute;
	height: 20px;
	font-size: 1px;
	transform: scale(0.9);
	transform-origin: left;
	font-weight: 500;
	color: #000;
	font-family: 'stst';
}

.timetime text {
	margin-left: 15rpx;
}

.time0 {
	top: 395rpx;
	right: 10rpx;
}

.time1 {
	top: 405rpx;
	right: 10rpx;
}

.time2 {
	top: 390rpx;
	right: 10rpx;
}

.time3 {
	display: none;
}

.timell {
	bottom: 85rpx;
	right: 10rpx;
}

.scroll {
	background-color: #373737;
	padding-top: 20rpx;
}

.black-line {
	height: 4rpx;
	background-color: #fff;
}

.f0 {
	background-color: #f0f0f0 !important;
	color: #959595 !important;
}

.f1 {
	background-color: #797979 !important;
	color: #919191 !important;
}

.black-line {
	height: 4rpx;
	background-color: #fff;
}
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
}
</style>
