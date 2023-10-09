# ifun-tree-picker

树级结构数据选择组件。

* 树级机构化数据，可自定义键值属性。
* 绑定默认值。
* 可清除。
* 可选择父级节点。

## 使用

通过uni_modules直接导入项目中。

```vue
<template>
	<view class="tree-select">
		<view class="component-item">
			<text  class="component-item-label">ifun-tree-picker</text>
			<view class="component-item-content">
				<ifun-tree-picker :data="treeData"></ifun-tree-picker>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"tree-select",
		data() {
			return {
				treeData:[
					{
						value:'节点1',
						label:'节点1',
						children:[]
					},
					{
						value:'节点2',
						label:'节点2',
						children:[
							{
								value:'节点21',
								label:'节点21',
							},
							{
								value:'节点22',
								label:'节点22',
								children:[
									{
										value:'节点221',
										label:'节点221',
									},
									{
										value:'节点222',
										label:'节点222',
									}
								]
							}
						]
					}
				]
			};
		},
		methods:{
			
		}
	}
</script>
```

## `props` 说明

|props|说明|备注|
|-----|-----|-----|
|data|树结构数据|<Array>[]|
|treeOptions|定义节点数据如何取值|<Object> ,默认值：`{label: 'label',value: 'value',key: 'label',children: 'children'}`|
|disabled|禁用选择|Boolean|
|value|绑定值，和data中元素结构一致|Object|
|clearable|是否可以清除选择，可清除时，第一条数据则是填充的控对象，选择后则值为空|Boolean|
|checkStrictly|是否严格遵循父子节点不关联|Boolean|
|placeholder|占位说明文字|String|

### `checkStrictly` 说明

默认的选择当有`children`时，回默认选择子级的第一条数据，一直到节点没有子级。如果想要选到某一节点，则需要设置这个属性。

所有的下一级数据节点都会被填充空对象。在确认选择返回时，则只返回除这一层级外的其他层级数据。

### `treeOptions`说明

|attr|说明|备注|
|-----|-----|-----|
|label|String|描述文本|
|value|String|值|
|key|String|picker组件下拉时，展示的选项，默认`label`|
|children|Array|及联选择，子元素|

## 事件

|事件名|说明|备注|
|-----|-----|-----|
|ok|点击保存|参数为当前选择的节点对象、选择的所有层级数据（数组）|

## slot

默认`slot` - default. 自定义触发picker的内容。

默认的slot是一个`input`输入框,可以展示当前确定选择的最后一列对象的值。如果自定义则需要自己监听事件`ok`处理文本展示