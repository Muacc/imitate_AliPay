<template>
	<view class="main">
		<navBar Title="征信授权"></navBar>
		<view v-if="!search">
			<view class="tab">
				<view class="tab-item" @click="changePage(1)">
					<view class="tab-block">
						<view class="tab-text" :class="[page == 1 ? 'blue' : '']">授权办理</view>
						<view class="border-bottom" :class="[page == 1 ? 'borderActive' : '']"></view>
					</view>
				</view>
				<view class="tab-item" @click="changePage(0)">
					<view class="tab-block">
						<view class="tab-text" :class="[page == 0 ? 'blue' : '']">授权记录</view>
						<view class="border-bottom" :class="[page == 0 ? 'borderActive' : '']"></view>
					</view>
				</view>
			</view>
			<view v-if="page == 1">
				<view class="post-block"></view>
				<view class="content">
					<view class="form">
						<view class="form-cell" @click="openSearch">
							<view class="label">机构名称</view>
							<view class="key1" :style="[institutionName !== '请选择被授权机构' ? { color: '#000' } : {}]">{{ institutionName }}</view>
							<image src="/static/img/my-img/hotyjt.png" mode=""></image>
						</view>
						<view class="form-cell" @click="business">
							<view class="label">业务类型</view>
							<view class="key1" :style="[businessType !== '请选择业务类型' ? { color: '#000' } : {}]">{{ businessType }}</view>
							<image src="/static/img/my-img/hotyjt.png" mode=""></image>
						</view>
						<view class="form-cell" @click="openTime">
							<view class="label">授权日期</view>
							<view class="key1" :style="[authorizationDate !== '请选择授权起始日期' ? { color: '#000' } : {}]">{{ authorizationDate }}</view>
							<image src="/static/img/my-img/hotyjt.png" mode=""></image>
						</view>
						<view class="form-cell">
							<view class="label">电话号码</view>
							<input class="key" placeholder-class="input-key" type="text" placeholder="请输入联系电话" v-model="mobile" />
							<image style="opacity: 0" src="/static/img/my-img/hotyjt.png" mode=""></image>
						</view>
					</view>
					<view class="xy">
						<view class="img">
							<image src="/static/img/zhengxin/ty.png" @click="noXY = false" v-if="noXY"></image>
							<image src="/static/img/zhengxin/845.png" @click="noXY = true" v-else></image>
						</view>
						<view class="xy-contonet">同意被授权机构在您的授权期限内将已查询到的住 房公积金信息纳入您本人的征信报告</view>
					</view>
					<view class="no-xy-tips">不同意纳入征信报告并不影响本次业务办理</view>
					<view class="sub-button" :style="{ color: mobile ? '#fff' : '' }" @click="subButton">提交</view>
				</view>
				<view class="bottom-tips">授权相关机构查询本人住房公积金信息，是指贷款办 理机构或其他相关机构，根据您本人的授权，在授权 期限内直接查询您的住房公积金信息。</view>
			</view>
			<view v-else>
				<view class="type">
					<view class="bg"></view>
					<view class="type-left">授权类型</view>
					<view class="type-right">
						<view class="type-before" :class="[before ? 'blue' : '']" @click="upBefore(1)">
							<image src="/static/img/zhengxin/816.png" v-if="before"></image>
							<image src="/static/img/zhengxin/817.png" v-else></image>
							贷前授权
						</view>
						<view class="type-after" :class="[!before ? 'blue' : '']" @click="upBefore(0)">
							<image src="/static/img/zhengxin/816.png" v-if="!before"></image>
							<image src="/static/img/zhengxin/817.png" v-else></image>
							贷后授权
						</view>
					</view>
				</view>
				<view class="loan-box" v-for="(A, B) in recordList" :key="B">
					<view class="title">{{ A.yw_name }}</view>
					<view class="loan-info">
						<view class="loan-info-item">
							<view class="left">授权编码</view>
							<view class="right" @touchend="copy(A.code)">{{ A.code }}</view>
						</view>
						<view class="loan-info-item">
							<view class="left">创建时间</view>
							<view class="right">{{ A.ctime }}</view>
						</view>
						<view class="loan-info-item">
							<view class="left">被授权机构</view>
							<view class="right">{{ A.jg_id }}</view>
						</view>
						<view class="loan-info-item">
							<view class="left">姓名</view>
							<view class="right">{{ A.username }}</view>
						</view>
						<view class="loan-info-item">
							<view class="left">证件类型</view>
							<view class="right">身份证</view>
						</view>
						<view class="loan-info-item">
							<view class="left">证件号码</view>
							<view class="right">{{ A.idcard }}</view>
						</view>
						<view class="loan-info-item">
							<view class="left">电话号码</view>
							<view class="right">{{ A.mobile }}</view>
						</view>
						<view class="loan-info-item">
							<view class="left">授权起始日期</view>
							<view class="right">{{ A.sq_time }}</view>
						</view>
						<view class="loan-info-item">
							<view class="left">是否纳入征信报告</view>
							<view class="right">{{ A.zx_status }}</view>
						</view>
						<view class="loan-info-item">
							<view class="left">授权机构是否已查询数据</view>
							<view class="right">已取消</view>
						</view>
						<view class="loan-info-item">
							<view class="left">查询时间</view>
							<view class="right">{{ A.cx_time }}</view>
						</view>
					</view>
					<view class="btns">
						<view class="btn btn1" @click="openEWM">二维码</view>
						<view class="btn btn2">取消写征信</view>
						<view class="btn btn3" @click="upMask(A.id)">取消授权</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="search">
				<input placeholder-class="search-placeholder" class="search-input" type="text" placeholder="请输入机构名称" v-model="keyWord" @input="upSearchRes" />
			</view>
			<view v-if="searchRes.length > 0" class="res">
				<view class="res-item" :class="{ noBorder: index == searchRes.length - 1 }" v-for="(item, index) in searchRes" :key="index" @click="changeInstitutionName(item)">
					{{ item }}
				</view>
			</view>
		</view>
		<view class="mask" v-if="mask">
			<view class="clear-empower">
				<view class="top">确认取消该笔授权？</view>
				<view class="bottom">
					<view class="left" @click="reserve">保留授权</view>
					<view class="right" @click="cancellation">仍然取消</view>
				</view>
			</view>
		</view>
		<view class="no-more-data" v-if="page == 0 && recordList.length == 0">没有更多数据</view>
		<u-picker :show="businessPicker" ref="uPicker" :columns="businessList" @confirm="confirm" @change="changeHandler" @cancel="hidePicker"></u-picker>
		<u-datetime-picker :show="showDate" :minDate="minDate" :maxDate="maxDate" v-model="value1" @confirm="timeOK" mode="date" @cancel="hidePicker"></u-datetime-picker>
		<u-overlay :show="EWM" @click="EWM = false">
			<view class="warp" @tap.stop>
				<view class="title">授权二维码</view>
				<image class="ewm" src="/static/ewm.png" mode=""></image>
				<view class="close" @tap.stop="EWM = false">关闭</view>
			</view>
		</u-overlay>
		<u-overlay :show="authorization" @click="authorization = false">
			<view class="warp2" @tap.stop>
				<view class="title">温馨提示</view>
				<view class="text">授权成功</view>
				<view class="close" @tap.stop="closeAuthorization">确定</view>
			</view>
		</u-overlay>
	</view>
</template>

<script>
import navBar from '@/components/gjj-navbar/gjj-navbar.vue';
export default {
	components: {
		navBar
	},
	data() {
		return {
			//二维码的遮罩层 false为隐藏
			EWM: false,
			//授权成功提示框
			authorization: false,
			//业务类型选择器 false为隐藏
			businessPicker: false,
			//业务类型选择数据
			businessList: [
				['贷款', '信用卡', '融资租赁', '融资担保'],
				['个人住房商业贷款', '个人商用房（含商住两用）贷款', '个人汽车消费贷款', '个人经营性贷款', '个人创业担保贷款', '其他个人消费贷款', '其他贷款']
			],
			columnData: [
				['个人住房商业贷款', '个人商用房（含商住两用）贷款', '个人汽车消费贷款', '个人经营性贷款', '个人创业担保贷款', '其他个人消费贷款', '其他贷款'],
				['贷记卡', '大额专项分期卡（专指仅用于大）'],
				['融资租赁业务'],
				['贷款担保', '票据承兑担保', '贸易融资担保', '项目融资担保', '信用证担保', '其他融资担保', '债券发行担保']
			],
			//遮罩层显示与隐藏 true显示
			mask: false,
			//授权记录-授权类型 true为贷前 false为贷后
			before: true,
			//是否同意协议 true为不同意 反之
			noXY: true,
			//控制当前是授权办理还是授权记录夜面 1为办理 0为记录
			page: 1,
			maxDate: Number(new Date()),
			minDate: new Date() - 2592000000,
			//时间选择器
			showDate: false,
			//默认选择为当前时间
			value1: Number(new Date()),
			institutionName: '请选择被授权机构',
			businessType: '请选择业务类型',
			authorizationDate: '请选择授权起始日期',
			//日期时间戳
			authTimeNumber: '',
			//手机号码
			mobile: '',
			//选择机构 false隐藏 true弹出选择
			search: false,
			//输入内容
			keyWord: '',
			//银行数据
			res: [
				'中国工商银行股份有限公司',
				'中国农业银行股份有限公司',
				'中国银行股份有限公司',
				'中国建设银行股份有限公司',
				'交通银行股份有限公司',
				'中信银行股份有限公司',
				'中国光大银行股份有限公司',
				'华夏银行股份有限公司',
				'中国民生银行股份有限公司',
				'招商银行股份有限公司',
				'兴业银行股份有限公司',
				'广发银行股份有限公司',
				'平安银行股份有限公司',
				'上海浦东发展银行股份有限公司',
				'恒丰银行股份有限公司',
				'浙商银行股份有限公司',
				'渤海银行股份有限公司',
				'中国邮政储蓄银行股份有限公司',
				'北京银行股份有限公司',
				'天津银行股份有限公司',
				'河北银行股份有限公司',
				'保定银行股份有限公司',
				'沧州银行股份有限公司',
				'承德银行股份有限公司',
				'邯郸银行股份有限公司',
				'衡水银行股份有限公司',
				'廊坊银行股份有限公司',
				'秦皇岛银行股份有限公司',
				'唐山银行股份有限公司',
				'邢台银行股份有限公司',
				'张家口银行股份有限公司',
				'晋商银行股份有限公司',
				'内蒙古银行股份有限公司',
				'鄂尔多斯银行股份有限公司',
				'乌海银行股份有限公司',
				'盛京银行股份有限公司',
				'锦州银行股份有限公司',
				'鞍山银行股份有限公司',
				'本溪银行股份有限公司',
				'朝阳银行股份有限公司',
				'丹东银行股份有限公司',
				'抚顺银行股份有限公司',
				'阜新银行股份有限公司',
				'葫芦岛银行股份有限公司',
				'盘锦银行股份有限公司',
				'铁岭银行股份有限公司',
				'营口银行股份有限公司',
				'吉林银行股份有限公司',
				'哈尔滨银行股份有限公司',
				'龙江银行股份有限公司',
				'上海银行股份有限公司',
				'江苏银行股份有限公司',
				'南京银行股份有限公司',
				'苏州银行股份有限公司',
				'江苏长江商业银行股份有限公司',
				'杭州银行股份有限公司',
				'湖州银行股份有限公司',
				'嘉兴银行股份有限公司',
				'金华银行股份有限公司',
				'绍兴银行股份有限公司',
				'台州银行股份有限公司',
				'温州银行股份有限公司',
				'浙江稠州商业银行股份有限公司',
				'浙江民泰商业银行股份有限公司',
				'浙江泰隆商业银行股份有限公司',
				'徽商银行股份有限公司',
				'平安银行股份有限公司',
				'福建海峡银行股份有限公司',
				'泉州银行股份有限公司',
				'江西银行股份有限公司',
				'赣州银行股份有限公司',
				'九江银行股份有限公司',
				'上饶银行股份有限公司',
				'齐鲁银行股份有限公司',
				'德州银行股份有限公司',
				'东营银行股份有限公司',
				'济宁银行股份有限公司',
				'莱商银行股份有限公司',
				'临商银行股份有限公司',
				'齐商银行股份有限公司',
				'日照银行股份有限公司',
				'泰安银行股份有限公司',
				'威海市商业银行股份有限公司',
				'潍坊银行股份有限公司',
				'烟台银行股份有限公司',
				'枣庄银行股份有限公司',
				'中原银行股份有限公司',
				'郑州银行股份有限公司',
				'华融湘江银行股份有限公司',
				'长沙银行股份有限公司',
				'汉口银行股份有限公司',
				'湖北银行股份有限公司',
				'广州银行股份有限公司',
				'东莞银行股份有限公司',
				'广东华兴银行股份有限公司',
				'东南粤银行股份有限公司',
				'珠海华润银行股份有限公司',
				'广西北部湾银行股份有限公司',
				'桂林银行股份有限公司',
				'柳州银行股份有限公司',
				'海南银行股份有限公司',
				'重庆三峡银行股份有限公司',
				'重庆银行股份有限公司',
				'成都银行股份有限公司',
				'达州银行股份有限公司',
				'长城华西银行股份有限公司',
				'乐山市商业银行股份有限公司',
				'泸州银行股份有限公司',
				'绵阳市商业银行股份有限公司',
				'四川天府银行股份有限公司',
				'遂宁银行股份有限公司',
				'雅安市商业银行股份有限公司',
				'宜宾市商业银行股份有限公',
				'自贡银行股份有限公司',
				'贵阳银行股份有限公司',
				'贵州银行股份有限公司',
				'富滇银行股份有限公司',
				'曲靖市商业银行股份有限公司',
				'云南红塔银行股份有限公司',
				'西藏银行股份有限公司',
				'西安银行股份有限公司',
				'长安银行股份有限公司',
				'甘肃银行股份有限公司',
				'兰州银行股份有限公司',
				'青海银行股份有限公司',
				'宁夏银行股份有限公司',
				'石嘴山银行股份有限公司',
				'乌鲁木齐银行股份有限公司',
				'昆仑银行股份有限公司',
				'哈密市商业银行股份有限公司',
				'库尔勒银行股份有限公司',
				'新疆汇和银行股份有限公司',
				'大连银行股份有限公司',
				'宁波银行股份有限公司',
				'宁波东海银行股份有限公司',
				'宁波通商银行股份有限公司',
				'厦门银行股份有限公司',
				'厦门国际银行股份有限公司',
				'青岛银行股份有限公司',
				'新疆银行股份有限公司',
				'蒙商银行股份有限公司',
				'四川银行股份有限公司',
				'辽沈银行股份有限公司',
				'山西银行股份有限公司',
				'四川兴文石海农村商业银行股份有限公司',
				'湖北襄阳农村商业银行股份有限公司',
				'山东高青农村商业银行股份有限公司',
				'四川叙永农村商业银行股份有限公司',
				'陕西白河农村商业银行股份有限公司',
				'陕西镇安农村商业银行股份有限公司',
				'山西清徐农村商业银行股份有限公司',
				'江西石城农村商业银行股份有限公司',
				'浙江温州鹿城农村商业银行股份有限公司',
				'湖北崇阳农村商业银行股份有限公司',
				'中山农村商业银行股份有限公司',
				'辽宁东港农村商业银行股份有限公司',
				'江西大余农村商业银行股份有限公司',
				'湖北石首农村商业银行股份有限公司',
				'湖北云梦农村商业银行股份有限公司',
				'鞍山农村商业银行股份有限公司',
				'三亚农村商业银行股份有限公司',
				'黄山徽州农村商业银行股份有限公司',
				'安徽和县农村商业银行股份有限公司',
				'北京农村商业银行股份有限公司',
				'上海农村商业银行股份有限公司',
				'江苏江阴农村商业银行股份有限公司',
				'无锡农村商业银行股份有限',
				'江苏张家港农村商业银行股份有限公司',
				'江苏常熟农村商业银行股份有限公司',
				'江苏苏州农村商业银行股份有限公司',
				'江苏昆山农村商业银行股份有限公司',
				'江苏太仓农村商业银行股份有限公司',
				'芜湖扬子农村商业银行股份有限公司',
				'深圳农村商业银行股份有限公司',
				'黄山太平农村商业银行股份有限公司',
				'安徽休宁农村商业银行股份有限公司',
				'陕西米脂农村商业银行股份有限公司',
				'陕西子洲农村商业银行股份有限公司',
				'陕西绥德农村商业银行股份有限公司',
				'四川江安农村商业银行股份有限公司',
				'辽阳辽东农村商业银行股份有限公司',
				'湖北洪湖农村商业银行股份有限公司',
				'安徽蒙城农村商业银行股份有限公司',
				'安徽广德农村商业银行股份有限公司',
				'安徽灵璧农村商业银行股份有限公司',
				'阜阳颖准农村商业银行股份有限公司',
				'吉林环城农村商业银行股份有限公司',
				'江西赣昌农村商业银行股份有限公司',
				'辽宁兴城农村商业银行股份有限公司',
				'湖南末阳农村商业银行股份有限公司',
				'新疆天山农村商业银行股份有限公司',
				'合肥科技农村商业银行股份有限公司',
				'湖北荆州农村商业银行股份有限公司',
				'江西上高农村商业银行股份有限公司',
				'鄂尔多斯农村商业银行股份有限公司',
				'池州九华农村商业银行股份有限公司',
				'天津滨海农村商业银行股份有限公司',
				'江西樟树农村商业银行股份有限公司',
				'贵州毕节农村商业银行股份有限公司',
				'张家界农村商业银行股份有限公司',
				'山东博兴农村商业银行股份有限公司',
				'湖南华容农村商业银行股份有限公司',
				'河北沧州农村商业银行股份有限公司',
				'重庆农村商业银行股份有限公司',
				'湖南吉首农村商业银行股份有限公司',
				'江苏射阳农村商业银行股份有限公司',
				'湖南常宁农村商业银行股份有限公司',
				'宁夏黄河农村商业银行股份有限公司',
				'益阳农村商业银行股份有限公司',
				'四川筠连农村商业银行股份有限公司',
				'湖北咸宁农村商业银行股份有限公司',
				'河北唐山农村商业银行股份有限公司',
				'浙江杭州余杭农村商业银行股份有限公司',
				'新疆沙湾农村商业银行股份有限公司',
				'新疆博湖农村商业银行股份有限公司',
				'新疆博乐农村商业银行股份有限公司',
				'青海玉树农村商业银行股份有限公司',
				'浙江舟山普陀农村商业银行股份有限公司',
				'河南汴京农村商业银行股份有限公司',
				'四川古蔺农村商业银行股份有限公司',
				'四川合江农村商业银行股份有限公司',
				'宁波奉化农村商业银行股份有限公司',
				'浙江新昌农村商业银行股份有限公司',
				'浙江嘉善农村商业银行股份有限公司',
				'河南汝州农村商业银行股份有限公司',
				'贵州瓮安农村商业银行股份有限公司',
				'广东惠东农村商业银行股份有限公司',
				'陕西旬阳农村商业银行股份有限公司',
				'内蒙古陕坝农村商业银行股份有限公司',
				'内蒙古五原农村商业银行股份有限公司',
				'吉林敦化农村商业银行股份有限公司',
				'吉林挥春农村商业银行股份有限公司',
				'河南许昌许都农村商业银行股份有限公司',
				'湖北恩施农村商业银行股份有限公司',
				'福建沙县农村商业银行股份有限公司',
				'湖南古丈农村商业银行股份有限公司',
				'安徽祁门农村商业银行股份',
				'安顺农村商业银行股份有限公司',
				'山西长治黎都农村商业银行股份有限公司',
				'贵州独山农村商业银行股份有限公司',
				'湖南蓝山农村商业银行股份有限公司',
				'湖南凤凰农村商业银行股份有限公司',
				'宁夏灵武农村商业银行股份有限公司',
				'湖南韶山农村商业银行股份有限公司',
				'安徽东至农村商业银行股份有限公司',
				'宁夏石嘴山农村商业银行股份有限公司',
				'山西长子农村商业银行股份有限公司',
				'山东禹城农村商业银行股份有限公司',
				'河南汝阳农村商业银行股份有限公司',
				'山东齐河农村商业银行股份有限公司',
				'广东博罗农村商业银行股份有限公司',
				'河南西峡农村商业银行股份有限公司',
				'河南登封农村商业银行股份有限公司',
				'浙江安吉农村商业银行股份有限公司',
				'湖北赤壁农村商业银行股份有限公司',
				'贵州仁怀茅台农村商业银行股份有限公司',
				'河南正阳农村商业银行股份有限公司',
				'聊城农村商业银行股份有限公司',
				'山东宁阳农村商业银行股份有限公司',
				'山东五莲农村商业银行股份有限公司',
				'安徽凤阳农村商业银行股份有限公司',
				'山东沂水农村商业银行股份有限公司',
				'浙江乐清农村商业银行股份有限公司',
				'山东郸城农村商业银行股份有限公司',
				'山东邹城农村商业银行股份有限公司',
				'浙江衢州柯城农村商业银行股份有限公司',
				'贵州花溪农村商业银行股份有限公司',
				'吉林德惠农村商业银行股份有限公司',
				'广东东源农村商业银行股份有限公司',
				'安徽郎溪农村商业银行股份有限公司',
				'安徽宁国农村商业银行股份有限公司',
				'贵州凯里农村商业银行股份有限公司',
				'白城农村商业银行股份有限公司',
				'吉林警石农村商业银行股份有限公司',
				'长春发展农村商业银行股份有限公司',
				'广东揭东农村商业银行股份有限公司',
				'浙江丽水莲都农村商业银行股份有限公司',
				'汕尾农村商业银行股份有限公司',
				'河南安阳商都农村商业银行股份有限公司',
				'山西忻州农村商业银行股份有限公司',
				'内蒙古呼和浩特金谷农村商业银行股份有限公司',
				'贵州兴仁农村商业银行股份有限公司',
				'贵州安龙农村商业银行股份有限公司',
				'贵州贞丰农村商业银行股份有限公司',
				'辽宁清原农村商业银行股份有限公司',
				'山西平遥农村商业银行股份有限公司',
				'湖北薪春农村商业银行股份有限公司',
				'浙江永嘉农村商业银行股份有限公司',
				'山东莘县农村商业银行股份有限公司',
				'江西丰城农村商业银行股份有限公司',
				'山东营县农村商业银行股份有限公司',
				'上饶农村商业银行股份有限公司',
				'江西遂川农村商业银行股份有限公司',
				'安徽怀远农村商业银行股份有限公司',
				'浙江温州瓯海农村商业银行股份有限公司',
				'浙江瑞安农村商业银行股份有限公司',
				'浙江苍南农村商业银行股份有限公司',
				'丹东农村商业银行股份有限公司',
				'山东成武农村商业银行股份有限公司',
				'安徽含山农村商业银行股份有限公司',
				'山东长岛农村商业银行股份有限公司',
				'武嫌威农村商业银行股份有限公司',
				'辽宁宽农村商业银行股份有限公司',
				'河北正定农村商业银行股份有限公司',
				'安徽机阳农村商业银行股份有限公司',
				'包头农村商业银行股份有限公司',
				'山东高唐农村商业银行股份有限公司',
				'贵州紫云农村商业银行股份有限公司',
				'安徽利辛农村商业银行股份有限公司',
				'安徽固镇农村商业银行股份有限公司',
				'湖北枣阳农村商业银行股份有限公司',
				'内蒙古宁城农村商业银行股份有限公司',
				'四川仪陇农村商业银行股份有.哂匮噬处罔臀公司',
				'雅安农村商业银行股份有限公司',
				'山西襄垣农村商业银行股份有限公司',
				'黑龙江绥芬河农村商业银行股份有限公司',
				'湖北红安农村商业银行股份有限公司',
				'河北献县农村商业银行股份有限公司',
				'山东郯城农村商业银行股份有限公司',
				'山东蒙阴农村商业银行股份有限公司',
				'安徽潍溪农村商业银行股份有限公司',
				'六安农村商业银行股份有限公司',
				'安徽凤台农村商业银行股份有限公司',
				'安徽宿州农村商业银行股份有限公司',
				'安徽五河农村商业银行股份有限公司',
				'湖北来凤农村商业银行股份有限公司',
				'江苏洪泽农村商业银行股份有限公司',
				'江西会昌农村商业银行股份有限公司',
				'湖北孝昌农村商业银行股份有限公司',
				'河南中牟农村商业银行股份有限公司',
				'湖北黄梅农村商业银行股份有限公司',
				'浙江金华成泰农村商业银行股份有限公司',
				'湖北罗田农村商业银行股份有限公司',
				'湖南邵东农村商业银行股份有限公司',
				'湖北孝感农村商业银行股份有限公司',
				'广西临桂农村商业银行股份有限公司',
				'湖南津市农村商业银行股份有限公司',
				'湖南双峰农村商业银行股份有限公司',
				'四川武胜农村商业银行股份有限公司',
				'陕西彬州农村商业银行股份有限公司',
				'陕西祚水农村商业银行股份有限公司',
				'河北唐山曹妃甸农村商业银行股份有限公司',
				'陕西平利农村商业银行股份有限公司',
				'陕西商南农村商业银行股份有限公司',
				'新疆喀什农村商业银行股份有限公司',
				'陕西靖边农村商业银行股份有限公司',
				'山西夏县农村商业银行股份有限公司',
				'葫芦岛农村商业银行股份有限公司',
				'湖南麻阳农村商业银行股份有限公司',
				'贵州都匀农村商业银行股份有限公司',
				'郴州农村商业银行股份有限公司',
				'内蒙古西乌珠穆沁农村商业银行股份有限公司',
				'江西万载农村商业银行股份有限公司',
				'广西鹿寨农村商业银行股份有限公司',
				'四川大英农村商业银行股份有限公司',
				'山东东阿农村商业银行股份有限公司',
				'辽宁桓仁农村商业银行股份有限公司',
				'湖北黄冈农村商业银行股份有限公司',
				'贵州平塘农村商业银行股份有限公司',
				'贵州思南农村商业银行股份有限公司',
				'广西岑溪农村商业银行股份有限公司',
				'湖北神农架农村商业银行股份有限公司',
				'新疆伊犁农村商业银行股份有限公司',
				'四川高县农村商业银行股份有限公司',
				'贵州荔波农村商业银行股份有限公司',
				'湖北建始农村商业银行股份有限公司',
				'四川屏山农村商业银行股份有限公司',
				'安徽涡阳农村商业银行股份有限公司',
				'广东龙门农村商业银行股份有限公司',
				'日照岚山农村商业银行股份有限公司',
				'湖北天门农村商业银行股份有限公司',
				'枣庄农村商业银行股份有限公司',
				'嘉峪关农村商业银行股份有限公司',
				'四川宣汉农村商业银行股份有限公司',
				'四川罗江农村商业银行股份有限公司',
				'湖南祁阳农村商业银行股份有限公司',
				'贵州三穗农村商业银行股份有限公司',
				'湖北宜城农村商业银行股份有限公司',
				'贵州清镇农村商业银行股份有限公司',
				'贵州织金农村商业银行股份有限公司',
				'乌兰察布农村商业银行股份有限公司',
				'内蒙古察哈尔右翼前旗农村商业银行股份有限公司',
				'湖南江永农村商业银行股份有限公司',
				'贵州黔西农村商业银行股份有限公司',
				'安徽颖上农村商业银行股份有限公司',
				'菏泽农村商业银行股份有限公司',
				'陕西宝鸡渭滨农村商业银行股份有限公司',
				'青海互助农村商业银行股份有限公司',
				'青海大通农村商业银行股份有限公司',
				'陕西陇县农村商业银行股份有限公司',
				'贵州黎平农村商业银行股份有限公司',
				'湖北汉川农村商业银行股份',
				'有限公司湖北鹤峰农村商业银行股份有限公司',
				'贵州麻江农村商业银行股份有限公司',
				'贵州天柱农村商业银行股份有限公司',
				'四川威远农村商业银行股份有限公司',
				'江西高安农村商业银行股份有限公司',
				'鹤壁农村商业银行股份有限公司',
				'贵州从江农村商业银行股份有限公司',
				'贵州黄平农村商业银行股份有限公司',
				'河北衡水农村商业银行股份有限公司',
				'河北阜城农村商业银行股份有限公司',
				'吉林靖宇农村商业银行股份有限公司',
				'安徽阜南农村商业银行股份有限公司',
				'湖南汝城农村商业银行股份有限公司',
				'湖南疆陵农村商业银行股份有限公司',
				'湖北通城农村商业银行股份有限公司',
				'浙江萧山农村商业银行股份有限公司',
				'河南宜阳农村商业银行股份有限公司',
				'湖北监利农村商业银行股份有限公司',
				'甘肃临泌农村商业银行股份有限公司',
				'陕西汉阴农村商业银行股份有限公司',
				'陕西紫阳农村商业银行股份有限公司',
				'陕西吴堡农村商业银行股份有限公司',
				'陕西佳县农村商业银行股份有限公司',
				'吉林汪清农村商业银行股份有限公司',
				'陕西清涧农村商业银行股份有限公司',
				'吉林安图农村商业银行股份有限公司',
				'湖北广水农村商业银行股份有限公司',
				'浙江上虞农村商业银行股份有限公司',
				'河南蒙阳农村商业银行股份有限公司',
				'山东庆云农村商业银行股份有限公司',
				'通化农村商业银行股份有限公司',
				'广东平远农村商业银行股份有限公司',
				'广西崇左农村商业银行股份有限公司',
				'浙江海宁农村商业银行股份有限公司',
				'安徽萧县农村商业银行股份有限公司',
				'陕西石泉农村商业银行股份有限公司',
				'安徽岳西农村商业银行股份有限公司',
				'营口农村商业银行股份有限公司',
				'黑龙江孙吴农村商业银行股份有限公司',
				'阜新农村商业银行股份有限公司',
				'山西泽州农村商业银行股份有限公司',
				'山西壶关农村商业银行股份有限公司',
				'浙江天台农村商业银行股份有限公司',
				'湖南攸县农村商业银行股份有限公司',
				'四川梓潼农村商业银行股份有限公司',
				'山西临绮农村商业银行股份有限公司',
				'山西浮山农村商业银行股份有限公司',
				'湖南南岳农村商业银行股份有限公司',
				'吉林永吉农村商业银行股份有限公司',
				'大庆农村商业银行股份有限公司',
				'江西宜丰农村商业银行股份有限公司',
				'萍多农村商业银行股份有限公司',
				'宁波慈溪农村商业银行股份有限公司',
				'浙江青田农村商业银行股份有限公司',
				'山东阳谷农村商业银行股份有限公司',
				'安徽临泉农村商业银行股份有限公司',
				'安徽太和农村商业银行股份有限公司',
				'江西金溪农村商业银行股份有限公司',
				'广西大新农村商业银行股份有限公司',
				'河北宁晋农村商业银行股份有限公司',
				'安徽肥东农村商业银行股份有限公司',
				'浙江江山农村商业银行股份有限公司',
				'浙江永康农村商业银行股份有限公司',
				'安徽宿松农村商业银行股份有限公司',
				'湖南邵阳昭阳农村商业银行股份有限公司',
				'山西介休农村商业银行股份有限公司',
				'江苏东海农村商业银行股份有限公司',
				'浙江东阳农村商业银行股份有限公司',
				'四川琪县农村商业银行股份有限公司',
				'安徽场山农村商业银行股份有限公司',
				'湖北嘉鱼农村商业银行股份有限公司',
				'安徽明光农村商业银行股份有限公司'
			],
			//模糊搜索的银行列表
			searchRes: [],
			//授权记录
			recordList: [],
			//取消授权暂存ID
			clearId: '',
			//判断双击/单击
			clickNum: 0
		};
	},
	onHide() {
		// this.authorization = true;
	},
	methods: {
		copy(e) {
			this.clickNum++;
			setTimeout(() => {
				if (this.clickNum == 1) {
				}
				if (this.clickNum >= 2) {
					uni.setClipboardData({
						data: e,
						success(res) {
							uni.showToast({
								title: '复制成功',
								icon: 'none'
							});
						}
					});
				}
				this.clickNum = 0;
			}, 250);
		},
		upMask(e) {
			this.mask = true;
			this.clearId = e;
		},
		upBefore(e) {
			if (e == 1) {
				this.before = 1;
			} else {
				this.before = 0;
			}
			this.getRecord();
		},
		changePage(e) {
			if (e !== this.page) {
				this.page = e;
				if (e == 0) {
					this.getRecord();
				}
			}
		},
		getRecord() {
			let type = null;
			if (this.before) {
				type = 1;
			} else {
				type = 2;
			}
			this.$api.empowerGetDetail({ type }, (res) => {
				this.recordList = [];
				this.recordList.push(...res.data);
			});
		},
		subButton() {
			if (!this.noXY) {
				if (this.institutionName == '请选择被授权机构') {
					uni.showToast({
						title: '请选择被授权机构',
						icon: 'none'
					});
					return;
				}
				if (this.businessType == '请选择业务类型') {
					uni.showToast({
						title: '请选择业务类型',
						icon: 'none'
					});
					return;
				}
				if (this.authorizationDate == '请选择授权起始日期') {
					uni.showToast({
						title: '请选择授权起始日期',
						icon: 'none'
					});
					return;
				}
				if (!this.mobile) {
					uni.showToast({
						title: '请输入联系电话',
						icon: 'none'
					});
					return;
				}
				this.$api.empowerAdd(
					{
						jg_id: this.institutionName,
						yw_name: this.businessType,
						sq_time: this.authTimeNumber,
						mobile: this.mobile
					},
					(res) => {
						if (res.status) {
							uni.navigateTo({
								url: '/pages/Face/zhengxinFace'
							});
							setTimeout(() => {
								this.authorization = true;
							}, 2000);
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					}
				);
			} else {
				uni.showToast({
					title: '请先同意协议',
					icon: 'none'
				});
			}
		},
		openEWM() {
			this.EWM = true;
		},
		closeAuthorization() {
			this.authorization = false;
			this.institutionName = '请选择被授权机构';
			this.businessType = '请选择业务类型';
			this.authorizationDate = '请选择授权起始日期';
			this.mobile = '';
			this.authTimeNumber = '';
		},
		hidePicker() {
			this.businessPicker = false;
			this.showDate = false;
		},
		timeOK(e) {
			var date = new Date(e.value);
			var year = date.getFullYear(); // 获取年份
			var month = date.getMonth() + 1; // 获取月份（注意月份范围是0-11）
			var day = date.getDate(); // 获取日期
			var formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
			this.authorizationDate = formattedDate;
			this.authTimeNumber = formattedDate;
			// this.authTimeNumber = e.value;

			this.showDate = false;
		},

		changeHandler(e) {
			const {
				columnIndex,
				value,
				values, // values为当前变化列的数组内容
				index,
				// 微信小程序无法将picker实例传出来，只能通过ref操作
				picker = this.$refs.uPicker
			} = e;
			// 当第一列值发生变化时，变化第二列(后一列)对应的选项
			if (columnIndex === 0) {
				// picker为选择器this实例，变化第二列对应的选项
				picker.setColumnValues(1, this.columnData[index]);
			}
		},
		// 回调参数为包含columnIndex、value、values
		confirm(e) {
			this.businessType = e.value[0] + '-' + e.value[1];
			this.businessPicker = false;
		},
		business() {
			this.businessPicker = true;
		},
		openSearch() {
			this.search = true;
		},
		openTime() {
			this.showDate = true;
		},
		upSearchRes() {
			if (this.keyWord.trim() === '') {
				this.searchRes = []; // 清空搜索结果数组
			} else {
				const searchRes = this.res.filter((item) => item.includes(this.keyWord));
				this.searchRes = searchRes;
			}
		},
		changeInstitutionName(e) {
			this.institutionName = e;
			this.keyWord = '';
			this.search = !this.search;
		},
		reserve() {
			this.mask = !this.mask;
		},
		cancellation() {
			this.$api.setZxStatus(
				{
					status: 2,
					id: this.clearId
				},
				(res) => {
					if (res.status) {
						this.getRecord();
					}
				}
			);
			this.mask = !this.mask;
		}
	}
};
</script>

<style lang="scss">
.main {
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
		background: #0000006b;
		display: flex;
		justify-content: center;
		align-items: center;
		.clear-empower {
			background-color: #fff;
			border-radius: 15rpx;
			.top {
				padding: 35rpx 125rpx;
				font-size: 26rpx;
				font-weight: bold;
				color: #666666;
			}
			.bottom {
				display: flex;
				padding: 17rpx 0 21rpx;
				font-size: 32rpx;
				font-weight: 400;
				color: #3874f6;
				border-top: 1rpx solid #f5f5f5;
				.left {
					text-align: center;
					flex: 1;
					border-right: 1rpx solid #f5f5f5;
				}
				.right {
					text-align: center;
					flex: 1;
				}
			}
		}
	}
	.no-more-data {
		text-align: center;
		padding: 20rpx 0;
		font-size: 30rpx;
		font-weight: 400;
		color: #000000;
	}
	.tab {
		background-color: #fff;
		display: flex;
		align-items: center;
		padding-top: 20rpx;
		.tab-item {
			width: 50%;
			padding: 0 20rpx;
			text-align: center;
			.tab-block {
				display: inline-block;
				.tab-text {
					padding: 0 20rpx;
				}
				.blue {
					color: #2251d3;
				}
				.border-bottom {
					margin-top: 20rpx;
					height: 4rpx;
				}
				.borderActive {
					background: #2251d3;
				}
			}
		}
	}
	.post-block {
		height: 20rpx;
		background: #f7f8f9;
	}
	.content {
		.form {
			.form-cell {
				padding: 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.label {
					font-size: 30rpx;
					font-weight: 400;
					color: #000000;
					margin-right: 124rpx;
				}
				.key {
					font-size: 30rpx;
					font-weight: 400;
					color: #000;
					flex: 1;
				}
				.key1 {
					font-size: 30rpx;
					font-weight: 400;
					color: #999;
					flex: 1;
				}
				.input-key {
					color: #cacaca;
					font-weight: 400;
					font-size: 30rpx;
				}
				image {
					width: 15rpx;
					height: 28rpx;
				}
			}
		}
		.xy {
			display: flex;
			margin: 38rpx 28rpx 13rpx 20rpx;
			.img {
				margin-right: 7rpx;
				margin-top: 7rpx;
				image {
					width: 44rpx;
					height: 39rpx;
				}
			}
			.xy-contonet {
				font-size: 30rpx;
				font-weight: 400;
				color: #999999;
			}
		}
		.no-xy-tips {
			margin-left: 71rpx;
			font-size: 30rpx;
			font-weight: 400;
			color: #000000;
		}
		.sub-button {
			margin: 78rpx 100rpx 55rpx;
			background: #2251d3;
			border-radius: 41rpx;
			font-size: 36rpx;
			font-weight: 400;
			color: #b0c1ee;
			text-align: center;
			padding: 16rpx 0;
		}
	}
	.bottom-tips {
		margin: 0 47rpx 0 20rpx;
		font-size: 30rpx;
		color: #a4a4a4;
		font-weight: 400;
	}
	.search {
		padding: 18rpx 52rpx 20rpx;
		margin: 27rpx 25rpx 29rpx;
		border: 1rpx solid #d6d4d7;
		.search-placeholder {
			font-size: 28rpx;
			font-weight: 400;
			color: #cacaca;
		}
		.search-input {
			font-size: 28rpx;
			font-weight: bold;
			color: #333333;
		}
	}
	.res {
		background: #eceef4;
		.res-item {
			padding: 30rpx;
			font-size: 28rpx;
			color: #999999;
			font-weight: 400;
			border-bottom: 1rpx solid #cacaca;
		}
		.noBorder {
			border: none;
		}
	}
	.type {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 22rpx 40rpx;
		background-color: #fff;
		.bg {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: #f7f8f9;
			z-index: -1;
		}
		.type-left {
			font-size: 30rpx;
			color: #999999;
			font-weight: 400;
		}
		.type-right {
			display: flex;
			align-items: center;
			font-size: 30rpx;
			color: #999999;
			font-weight: 400;
			.type-before {
				display: flex;
				align-items: center;
				margin-right: 20rpx;
			}
			.type-after {
				display: flex;
				align-items: center;
			}
			.blue {
				color: #2251d3;
			}
			image {
				width: 35rpx;
				height: 35rpx;
				margin-right: 20rpx;
			}
		}
	}
	.loan-box {
		margin: 30rpx;
		background-color: #fff;
		border-radius: 30rpx;
		.title {
			font-size: 30rpx;
			font-weight: 400;
			color: #000000;
			padding: 19rpx 40rpx;
		}

		.loan-info {
			border-top: 1rpx solid #666666;
			border-bottom: 1rpx solid #666666;
			padding: 0 30rpx 0 40rpx;
			.loan-info-item {
				display: flex;
				margin: 15rpx;
				.left {
					font-size: 30rpx;
					color: #999999;
					font-weight: 400;
					flex: 1;
				}

				.right {
					max-width: 440rpx;
					font-size: 30rpx;
					font-weight: 400;
					color: #000000;
					word-wrap: break-word;
				}
			}
		}
		.btns {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding: 40rpx 30rpx;
			.btn {
				width: 180rpx;
				height: 60rpx;
				background: #c8c9cc;
				font-weight: bold;
				color: #ffffff;
				font-size: 30rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 10rpx;
				margin-left: 20rpx;
			}
			.btn1 {
				background: #2251d3;
			}
		}
	}
}
.warp {
	background-color: #fff;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	padding: 36rpx 145rpx 0 145rpx;
	border-radius: 20rpx;
	.title {
		font-size: 38rpx;
		font-weight: bold;
		color: #000000;
	}
	.ewm {
		width: 309rpx;
		height: 309rpx;
		margin: 106rpx 0 103rpx;
	}

	.close {
		font-size: 38rpx;
		font-weight: bold;
		color: #3874f6;
		padding: 22rpx 0 26rpx;
		border-top: 1rpx solid #f5f5f5;
	}
}
.warp2 {
	background-color: #fff;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	border-radius: 20rpx;
	padding: 44rpx 0 0;
	width: 565rpx;
	.title {
		font-size: 38rpx;
		font-weight: bold;
		color: #000000;
	}

	.text {
		margin: 15rpx 0 43rpx;
	}
	.close {
		font-size: 38rpx;
		font-weight: bold;
		color: #3874f6;
		padding: 22rpx 0 26rpx;
		border-top: 1rpx solid #f5f5f5;
	}
}
</style>
