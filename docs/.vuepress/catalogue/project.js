const projectNav = {
	text: '项目',
	items: [
		{ text: '后台管理系统', link: '/project/system/' },
		{ text: 'h5', link: '/project/h5/' }
	]
}

const projectSidebar = {
	'/project/': [
		{
			title: '移动端开发基础',
			collapsable: true,
			sidebarDepth: 2,
			children: [['/project/mobile/', '知识点']]
		},
		{
			title: 'h5项目',
			collapsable: true,
			sidebarDepth: 2,
			children: [['/project/h5/', 'h5项目说明']]
		}
	],
	'/project/system/': [
		{
			title: '后台管理系统项目',
			collapsable: true,
			sidebarDepth: 2,
			children: [['', '后台管理系统']]
		}
	]
}
module.exports = { projectNav, projectSidebar }
