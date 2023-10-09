<template>
	<view style="height: 112rpx">
		<view class="tab-bar-components">
			<view class="item" v-for="(A, B) in tabBarList" :key="B" @click="toTab(A, B)">
				<image class="img" :class="[index == 0 ? 'yes0' : 'no0']" v-if="B == index" :src="A.img" mode=""></image>
				<image class="simg" v-else :src="A.simg" mode=""></image>
				<view class="name" v-if="B !== index">
					{{ A.name }}
				</view>
				<view class="name" :class="[B == index ? 'sname' : '']" v-else-if="index !== 0">
					{{ A.name }}
				</view>
				<view class="name" v-else></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'gjj-tabBar',
	props: {
		index: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			tabBarList: [
				{
					name: '首页',
					img: '/static/img/tabbar/1.png',
					simg: '/static/img/tabbar/n1.png',
					url: '/pages/index/index'
				},
				{
					name: '理财',
					img: '/static/img/tabbar/2.png',
					simg: '/static/img/tabbar/n2.png'
				},
				{
					name: '生活',
					img: '/static/img/tabbar/3.png',
					simg: '/static/img/tabbar/n3.png'
				},
				{
					name: '消息',
					img: '/static/img/tabbar/4.png',
					simg: '/static/img/tabbar/n4.png'
				},
				{
					name: '我的',
					img: '/static/img/tabbar/5.png',
					simg: '/static/img/tabbar/n5.png',
					url: '/pages/my/my'
				}
			]
		};
	},
	methods: {
		toTab(a, e) {
			if (a.url) {
				if (e !== this.index) {
					uni.redirectTo({
						url: a.url
					});
				}
			}
		}
	}
};
</script>

<style lang="scss">
.tab-bar-components {
	display: flex;
	align-items: center;
	width: 100vw;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 999;
	background-color: #fff;
	padding: 10rpx 0 35rpx 0;
	.item {
		width: 20vw;
		text-align: center;
		.img {
			width: 65rpx;
			height: 65rpx;
		}
		.simg {
			width: 40rpx;
			height: 40rpx;
		}
		.no0 {
			width: 40rpx;
			height: 40rpx;
		}
		.name {
			font-size: 18rpx;
			font-weight: 400;
			color: #666666;
		}
		.sname {
			font-size: 18rpx;
			font-weight: 400;
			color: #3874f6;
		}
	}
}
</style>
