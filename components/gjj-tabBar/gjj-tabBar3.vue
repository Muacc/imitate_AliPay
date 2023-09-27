<template>
	<view style="height: 130rpx">
		<view class="tab-bar-components">
			<view class="item" v-for="(A, B) in tabBarList" :key="B" @click="toTab(A, B)">
				<image class="simg" v-if="B == index" :src="A.simg" mode=""></image>
				<image class="img" v-else :src="A.img" mode=""></image>
				<view class="sname" v-if="B == index">
					{{ A.name }}
				</view>
				<view class="name" v-else>
					{{ A.name }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'gjj-tabBar2',
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
					img: '/static/img/tabbar/1i.png',
					simg: '/static/img/tabbar/i1.png',
					url: '/pages/gjj/gjj-details'
				},
				{
					name: '办事',
					img: '/static/img/tabbar/2i.png',
					simg: '/static/img/tabbar/i2.png',
					url: '/pages/gjj/gjj-server'
				},
				{
					name: '发现',
					img: '/static/img/tabbar/3i.png',
					simg: '/static/img/tabbar/i3.png',
					url: '/pages/gjj/gjj-my'
				},
				{
					name: '互动',
					img: '/static/img/tabbar/3i.png',
					simg: '/static/img/tabbar/i3.png',
					url: '/pages/gjj/gjj-my'
				},
				{
					name: '我的',
					img: '/static/img/tabbar/3i.png',
					simg: '/static/img/tabbar/i3.png',
					url: '/pages/gjj/gjj-my'
				}
			]
		};
	},
	methods: {
		toTab(a, e) {
			if (e !== this.index) {
				uni.redirectTo({
					url: a.url
				});
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
	justify-content: space-around;

	.item {
		width: 20vw;
		text-align: center;
		.img {
			width: 42rpx;
			height: 42rpx;
		}
		.simg {
			width: 42rpx;
			height: 42rpx;
		}
		.sname {
			color: #8aa5e5;
			font-size: 17rpx;
			font-weight: 400;
		}
		.name {
			font-size: 17rpx;
			font-weight: 400;
			color: #cacaca;
		}
	}
}
</style>
