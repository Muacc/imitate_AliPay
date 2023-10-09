<template>
	<view class="ifun-tree-picker">
		<picker mode="multiSelector" :value="selectIndex" ref="picker" :range-key="options.key" :range="viewData"
			:disabled="disabled" @columnchange="handleChange" @change="handleConfirm">
			<slot>
				<input :placeholder="placeholder" disabled :value="selectText" />
			</slot>

		</picker>
	</view>
</template>

<script>
	// 节点信息映射
	const DefaultOptions = {
		label: 'label',
		value: 'value',
		key: 'label',
		children: 'children'
	}
	export default {
		name: 'ifun-tree-picker',
		props: {
			disabled: Boolean,
			data: {
				type: Array,
				default: () => ([])
			},
			treeOptions: {
				type: Object,
				defautl: () => ({})
			},
			value: {
				type: Object,
				default: () => ({})
			},
			clearable: Boolean,
			checkStrictly: Boolean,
			placeholder: {
				type: String,
				default: '请选择'
			}
		},
		data() {
			return {
				selectValue: [],
				// picker 的自身属性
				selectIndex: [],
				// 当前的节点数据
				viewData: [],

			};
		},
		watch: {
			data: {
				immediate: true,
				deep: true,
				handler(arr) {
					if(arr.length<1){
						return
					}
					// 默认第一条数据
					this.viewData = [JSON.parse(JSON.stringify(arr))]
					// 是否严格遵循父子节点不关联
					if (this.checkStrictly) {
						this.handleFormatData(this.viewData[0]);
					}
					if (this.clearable) {
						const {
							value,
							label
						} = this.options
						this.viewData[0].unshift({
							[value]: '',
							[label]: ''
						})
					}
					// 处理默认值
					this.handleFormatDefault(this.value);
					// 初始化后续的数据
					this.initViewData();
				}
			},
			value: {
				immediate: true,
				deep: true,
				handler() {
					// 处理默认值
					this.handleFormatDefault(this.value);
				}
			}
		},
		computed: {
			options() {
				return {
					...DefaultOptions,
					...this.treeOptions
				}
			},
			selectText() {
				let len = this.selectValue.length
				if (len < 1) {
					return ''
				}
				return this.selectValue[len - 1][this.options.label]
			},
		},
		methods: {
			/**
			 * 
			 */
			handleFormatData(data) {

				let len = data.length;
				const {
					children,
					value,
					label
				} = this.options
				for (let i = 0; i < len; i++) {
					let item = data[i]
					if (item[children] && item[children].length > 0) {
						this.handleFormatData(item[children])
						item[children].unshift({
							[value]: '',
							[label]: ''
						});
					}
				}
			},
			/**
			 * @param {Object} info
			 */
			handleFormatDefault(info) {
				let $this = this;
				let value = info[this.options.value]
				if(!value){
					return;
				}
				

				function deepFind(obj, arr, key, indexArr, index) {

					const {
						value,
						children
					} = $this.options

					if (obj[value] == key) {
						arr.push(obj);
						indexArr.push(index);
						return true;
					}
					if (obj[children] && obj[children].length > 0) {
						arr.push(obj);
						indexArr.push(index);
						return obj[children].some((item, sindex) => deepFind(item, arr, key, indexArr, sindex))
					}
					return false;
				}
				
				for (let i = 0, len = this.data.length; i < len; i++) {
					let item = this.data[i]
					// 选择的数据对象
					let arr = [];
					// 选择的数据下表
					let indexArr = [];
					let bool = deepFind(item, arr, value, indexArr, i);
					if (bool) {
						// arr.push(info);
						this.selectValue = [...arr]
						this.selectIndex = [...indexArr]
						return
					}
				}
				// 没有找到对应的数据，直接显示给定值
				this.selectValue = [info]

			},
			initViewData() {

				const {
					children
				} = this.options
				let info = this.data[0]
				// 默认值选中
				let index = 0;
				if(this.selectIndex[index]!=undefined){
					info = this.data[this.selectIndex[index]]
				}
				while (info && info[children] && info[children].length > 0) {

					// 默认第一条数据
					this.viewData.push(info[children])
					// 处理默认值
					index++;
					if(this.selectIndex[index]!=undefined){
						// 继续处理下一层级的选择数据
						info = info[children][this.selectIndex[index]]
					}else{
						info = info[children][0];
						this.selectIndex.push(0);
					}
				}

			},
			handleChange({
				detail
			}) {

				let {
					column,
					value
				} = detail
				
				let info = this.viewData[column][value]
				// 修复nvue问题
				// this.selectIndex[column] = value;
				this.selectIndex.splice(column,1,value)
				const {
					children
				} = this.options
				
				// 下一层级
				let nextColumn = column + 1;
				if (!info[children] || info[children].length < 1) {
					// 没有下一层级，则移除viewData 已有的数据；
					this.viewData.length = nextColumn;
					return
				}

				while (info[children] && info[children].length > 0) {
					// 默认第一条数据
					if (this.viewData[nextColumn]) {
						// 修复nvue问题
						// this.viewData[nextColumn] = info[children]
						this.viewData.splice(nextColumn,1,info[children])
					} else {
						this.viewData.push(info[children]);
					}
					// 重置其他column选择值位0
					if(this.selectIndex[nextColumn]){
						this.selectIndex.splice(nextColumn,1,0)
					}
					nextColumn += 1;
					info = info[children][0]
				}
				this.viewData.length = nextColumn;
			},
			handleConfirm({
				detail
			}) {
				let valueArr = detail.value
				// 已选择
				valueArr.length = this.viewData.length;
				this.selectValue = valueArr.map((val, index) => this.viewData[index][val])

				// 选中值
				// 最后一个选中对象
				let suffix = this.selectValue[this.selectValue.length - 1]
				if (this.checkStrictly && suffix.value === '') {
					this.selectValue.pop()
				}

				this.$emit('ok', this.selectValue[this.selectValue.length - 1], this.selectValue);


			}
		}
	};
</script>

<style>
	
</style>