const { baseSidebar, baseNav } = require('./base.js')
const { bookSidebar, bookNav } = require('./book.js')
const { engineerSidebar, engineerNav } = require('./engineer.js')
const { frameSidebar, frameNav } = require('./frame')
const { projectSidebar, projectNav } = require('./project')
const { advancedSidebar, advancedNav } = require('./advanced')

const nav = [
	{ text: '首页', link: '/' },
	baseNav,
	frameNav,
	engineerNav,
	projectNav,
	advancedNav,
	bookNav,
	{
		text: 'Github',
		link: 'https://github.com/f5l5y5/vuepress'
	}
]
const sidebar = {
	...baseSidebar,
	...frameSidebar,
	...engineerSidebar,
	...projectSidebar,
	...advancedSidebar,
	...bookSidebar
}

module.exports = {
	nav,
	sidebar
}
