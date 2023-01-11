## scoped 原理

scope css 的本质是基于 HTML 和 CSS 属性选择器，分别给 HTML 标签和 CSS 选择器添加 data-v-xxx,具体通过 vue-loader 实现,分三步：

1. 首先 vue-loader 会解析.vue 组件，提取 template、script、style 对应的代码块
2. 然后构造组件实例，在组件实例的选项上绑定 scopedId
3. 最后对 style 的 CSS 代码进行编译转化，应用 scopedId 生成选择器的属性

## 文件夹 vue 组件一次性导入注册

```js
const requireComponents = require.context('@/views/account/accountManage/accountInfo/components/dialog', false, /\.vue/)
const components = {}

requireComponents.keys().forEach(fileName => {
	const reqCom = requireComponents(fileName)
	const reqComName = reqCom.name || fileName.replace(/\.\/(.*)\.vue/, '$1')
	// 组件挂载
	// app.component(reqComName, reqCom.default || reqCom)
	components[reqComName] = reqCom.default || reqCom
})
// commonjs 导出可以使用import导入
module.exports = { ...components }

// 引入 缺点不可以进行跳转
import { LogDialog } from './components'
// ---------------------------------------------------------

// 生成components对象 context 不允许接受变量 必须是字面量
const requireComponents = require.context(directory, false, /.vue$/) // 批量读取模块文件

const components = requireComponents.keys().reduce((modules, fileName) => {
	const module = requireComponents(fileName)
	const name = module.name || fileName.replace(/^\.\/(.*)\.vue$/, '$1')
	modules[name] = module.default
	return modules
}, {})
```

## 统一进行组件导出

```js
// index.js
export { default as Log } from './dialog/LogDialog.vue'

//
import { Log } from './components'
```
