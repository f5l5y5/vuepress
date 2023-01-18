const engineerNav = {
	text: '工程化',
	items: [
		{
			text: '部署',
			items: [
				{ text: 'CICD', link: '/engineer/deploy/' },
				{ text: 'vuepress', link: '/engineer/vuepress/' },
				{ text: 'vitepress', link: '/engineer/vitepress/' }
			]
		},
		{
			text: '构建工具',
			items: [
				{ text: 'webpack', link: '/engineer/build/webpack/base/' },
				{ text: 'rollup', link: '/engineer/build/rollup/' },
				{ text: 'vite', link: '/engineer/build/vite/' }
			]
		},
		{
			text: 'git',
			items: [
				{ text: '常用命令', link: '/engineer/git/cmd/' },
				{ text: '工作流', link: '/engineer/git/gitflow/' }
			]
		}
	]
}

const engineerSidebar = {
	'/engineer/build/webpack/': [
		{
			title: '基础配置',
			collapsable: true,
			sidebarDepth: 5,
			children: [
				'base/',
				'base/base.md',
				'base/config.md',
				'base/development.md',
				'base/css.md',
				'base/image.md',
				'base/output.md',
				'base/clean.md',
				'base/font.md',
				'base/other.md',
				'base/javascript.md',
				'base/html.md',
				'base/server.md',
				'base/production.md',
				'base/optimizeCss.md',
				'base/minifyHtml.md',
				'base/summary.md'
			]
		},
		{
			title: '高级优化',
			collapsable: true,
			sidebarDepth: 5,
			children: [
				'senior/',
				'senior/enhanceExperience.md',
				'senior/liftingSpeed.md',
				'senior/reduceVolume.md',
				'senior/optimizePerformance.md',
				'senior/summary.md'
			]
		},
		{
			title: '项目配置',
			collapsable: true,
			sidebarDepth: 5,
			children: ['project/', 'project/react-cli.md', 'project/vue-cli.md', 'project/summary.md']
		},
		{
			title: '原理分析',
			collapsable: true,
			sidebarDepth: 5,
			children: ['origin/', 'origin/loader.md', 'origin/plugin.md', 'origin/summary.md']
		}
	],
	'/engineer/build/rollup/': [
		{
			title: 'rollup',
			collapsable: true,
			sidebarDepth: 2,
			children: [['', 'rollup笔记']]
		}
	],
	'/engineer/build/vite/': [
		{
			title: 'vite',
			collapsable: true,
			sidebarDepth: 2,
			children: [['', 'vite笔记']]
		}
	],
	'/engineer/deploy/': [
		{
			title: '部署',
			collapsable: true,
			sidebarDepth: 2,
			children: ['']
		}
	],
	'/engineer/git/': [
		{
			title: 'Git命令',
			collapsable: true,
			sidebarDepth: 2,
			children: [
				['cmd/', '常用命令说明'],
				['gitflow/', 'gitflow说明']
			]
		}
	],
	'/engineer/vuepress/': [
		{
			title: 'vuepress',
			collapsable: true,
			sidebarDepth: 2,
			children: ['']
		}
	],
	'/engineer/vitepress/': [
		{
			title: 'vitepress',
			collapsable: true,
			sidebarDepth: 2,
			children: [['', 'vitepress笔记']]
		}
	]
}

module.exports = { engineerNav, engineerSidebar }
