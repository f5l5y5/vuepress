const advancedNav = {
	text: '进阶',
	//可以进行分组 在导航栏
	items: [
		{ text: '测试', items: [{ text: '单元测试', link: '/advanced/test/' }] },
		{ text: '数据结构算法', items: [{ text: '算法', link: '/advanced/algorithm/' }] },
		{ text: '', items: [{ text: '设计模式', link: '/advanced/design/' }] },
		{ text: '', items: [{ text: '重构', link: '/advanced/refactoring/' }] },
		{ text: '网络', items: [{ text: 'http状态码', link: '/advanced/network/http' }] }
	]
}

const advancedSidebar = {
	'/advanced/test/': [
		{
			title: '测试',
			collapsable: true,
			sidebarDepth: 2,
			children: [['', '单元测试']]
		}
	],
	'/advanced/algorithm/': [
		{
			title: '算法',
			collapsable: true,
			sidebarDepth: 2,
			children: [
				['', 'js实现算法'],
				['/advanced/algorithm/sort/', '排序算法']
			]
		}
	],
	'/advanced/design/': [
		{
			title: '设计模式',
			collapsable: true,
			sidebarDepth: 2,
			children: [['', 'js实现']]
		}
	],
	'/advanced/refactoring/': [
		{
			title: '重构',
			collapsable: true,
			sidebarDepth: 2,
			children: [
				['', '重构原则'],
				['/advanced/refactoring/refactoring-2', '代码重构']
			]
		}
	],
	'/advanced/network/': [
		{
			title: '网络',
			collapsable: true,
			sidebarDepth: 2,
			children: [
				['', '网络简介'],
				['/advanced/network/http', 'http笔记']
			]
		}
	]
}

module.exports = { advancedNav, advancedSidebar }
