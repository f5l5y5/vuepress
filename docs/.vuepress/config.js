const { nav, sidebar } = require('./catalogue/index.js')

module.exports = {
	base: '/vuepress',
	title: '一诺滚雪球',
	themeConfig: {
		//头部logo
		// logo: '/logo.jpeg',
		lastUpdated: 'Last Updated', // string | boolean
		smoothScroll: true,
		nav,
		sidebar
	},
	plugins: [
		'@vuepress/back-to-top',
		[
			'@anyfork/vuepress-plugin-code-copy',
			{
				copyText: '复制代码',
				tip: {
					content: '复制成功!'
				}
			}
		]
	]
}
