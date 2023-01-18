const bookNav = {
	text: '书籍',
	items: [{ text: '书籍清单', link: '/books/' }]
}

const bookSidebar = {
	'/books/': [
		{
			title: '前端书籍',
			collapsable: true,
			sidebarDepth: 2,
			children: ['', 'js-pattern-excise.md']
		}
	]
}

module.exports = { bookNav, bookSidebar }
