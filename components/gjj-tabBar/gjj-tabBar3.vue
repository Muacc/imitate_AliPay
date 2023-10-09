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
					img: '/static/5915.png',
					simg: '/static/home.png'
				},
				{
					name: '办事',
					img: '/static/5916.png',
					simg: '/static/a19.png'
				},
				{
					name: '发现',
					img: '/static/5917.png',
					simg: '/static/a2.png'
				},
				{
					name: '互动',
					img: '/static/5918.png',
					simg: '/static/a30.png'
				},
				{
					name: '我的',
					img: '/static/5919.png',
					simg: '/static/a31.png'
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
			width: 50rpx;
			height: 50rpx;
		}
		.simg {
			width: 50rpx;
			height: 50rpx;
		}
		.sname {
			color: #333;
			font-weight: bold;
			font-size: 24rpx;
		}
		.name {
			font-size: 24rpx;
			font-weight: 400;
			color: #c2c2c2;
		}
	}
}
</style>
