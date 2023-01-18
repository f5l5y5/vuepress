const baseNav = {
	text: '前端三件套',
	items: [
		{ text: 'HTML', link: '/base/html/' },
		{ text: 'CSS', link: '/base/css/' },
		{ text: 'JS', link: '/base/js/' }
	]
}

const baseSidebar = {
	'/base/html/': [
		{
			title: 'HTML',
			collapsable: true,
			sidebarDepth: 2,
			children: [['', 'html介绍']]
		}
	],
	'/base/css/': [
		{
			title: 'CSS',
			collapsable: true,
			sidebarDepth: 2,
			children: [
				['', 'CSS介绍'],
				['/base/css/flex', 'flex']
			]
		}
	],
	'/base/js/': [
		{
			title: 'JS',
			collapsable: true,
			sidebarDepth: 2,
			children: [
				['', '介绍'],
				['/base/js/es6', 'ES6']
			]
		}
	]
}

module.exports = { baseNav, baseSidebar }
