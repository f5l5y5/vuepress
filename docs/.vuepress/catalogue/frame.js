const frameNav = {
	text: '框架',
	items: [
		{ text: 'Vue', link: '/frame/vue/' },
		{ text: 'React', link: '/frame/react/' }
	]
}

const frameSidebar = {
	'/frame/vue/': [
		{
			title: 'Vue',
			collapsable: true,
			sidebarDepth: 2,
			children: [['', 'vue笔记']]
		}
	],
	'/frame/react/': [
		{
			title: 'React',
			collapsable: true,
			sidebarDepth: 2,
			children: [['', 'react笔记']]
		}
	]
}
module.exports = { frameNav, frameSidebar }
