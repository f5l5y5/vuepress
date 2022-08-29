

module.exports = {
    base: '/',
    title: '一诺滚雪球',
    themeConfig: {
        //头部logo
        logo: '/logo.jpeg',
        lastUpdated: 'Last Updated', // string | boolean
        smoothScroll: true,
        nav: [
            { text: '首页', link: '/' },
            {
                text: '前端三件套',
                items: [
                    { text: 'HTML', link: '/base/html/' },
                    { text: 'CSS', link: '/base/css/' },
                    { text: 'JS', link: '/base/js/' },
                ]
            },
            {
                text: '框架',
                items: [
                    { text: 'Vue', link: '/frame/vue/' },
                    { text: 'React', link: '/frame/react/' }
                ]
            },
            {
                text: '构建工具',
                items: [
                    { text: 'webpack', link: '/build/module/webpack/' },
                    { text: 'rollup', link: '/build/module/rollup/' },
                    { text: 'vite', link: '/build/module/vite/' }
                ]
            },
            {
                text: 'git',
                items: [
                    { text: '常用命令', link: '/git/cmd/' },
                    { text: '工作流', link: '/git/gitflow/' }
                ]
            },
            {
                text: '工程化',
                items: [
                    { text: '部署', link: '/engineer/deploy/' },
                    { text: 'vuepress', link: '/engineer/vuepress/' }
                ]
            },
            {
                text: '项目',
                items: [
                    { text: '后台管理系统', link: '/project/system/' },
                    { text: 'h5', link: '/project/h5/' }
                ]
            },
            {
                text: '进阶',
                //可以进行分组 在导航栏
                items: [
                    { text: '测试', items: [{ text: '单元测试', link: '/advanced/test/' }] },
                    { text: '数据结构算法', items: [{ text: '算法', link: '/advanced/algorithm/' }] },
                    { text: '', items: [{ text: '设计模式', link: '/advanced/design/' }] },
                    { text: '', items: [{ text: '重构', link: '/advanced/refactoring/' }] },
                ]
            },
            {
                text: '博客地址',
                items: [
                    { text: 'Github', link: 'https://github.com/f5l5y5/vuepress' }
                ]
            }
        ],
        sidebar: {
            '/base/html/': [
                {
                    title: 'HTML',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['', 'html介绍']
                    ]
                },
            ],
            '/base/css/': [
                {
                    title: 'CSS',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['', 'CSS介绍'],
                        ['/base/css/flex', 'flex'],
                    ]
                },
            ],
            '/base/js/': [
                {
                    title: 'JS',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['', '介绍'],
                        ['/base/js/es6', 'ES6'],
                    ]
                },
            ],
            '/frame/vue/': [
                {
                    title: 'Vue',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['', 'vue笔记'],
                    ]
                }
            ],
            '/frame/react/': [
                {
                    title: 'React',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['', 'react笔记'],
                    ]
                },
            ],
            '/build/module/': [
                {
                    title: 'webpack',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['/build/module/webpack/', 'webpack笔记'],
                    ]
                },
                {
                    title: 'rollup',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['/build/module/rollup/', 'rollup笔记'],
                    ]
                },
                {
                    title: 'vite',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['/build/module/vite/', 'vite笔记'],
                    ]
                },
            ],
            '/git/': [
                {
                    title: 'Git命令',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['/git/cmd/', '常用命令说明'],
                    ]
                },
                {
                    title: 'gitflow',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['/git/gitflow/', '说明'],
                    ]
                },
            ],
            '/engineer/': [
                {
                    title: '部署',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['/engineer/deploy/', 'docker部署'],
                    ]
                },
                {
                    title: 'vuepress',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['/engineer/vuepress/', 'vuepress笔记'],
                    ]
                },
            ],
            '/project/h5/': [
                {
                    title: 'h5项目',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['/project/h5/', 'h5项目说明'],
                    ]
                }
            ],
            '/project/system/': [
                {
                    title: '后台管理系统项目',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['', '后台管理系统'],
                    ]
                },
            ],
            '/advanced/test/': [
                {
                    title: '测试',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['', '单元测试']
                    ]
                },
            ],
            '/advanced/algorithm/': [
                {
                    title: '算法',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['', 'js实现算法'],
                        ['/advanced/algorithm/sort/', '排序算法'],
                    ]
                },
            ],
            '/advanced/design/': [
                {
                    title: '设计模式',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['', 'js实现'],
                    ]
                },
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
                },
            ]
        }
    },
    plugins: ['@vuepress/back-to-top']

}