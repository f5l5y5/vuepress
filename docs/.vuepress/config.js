

module.exports = {
    base: '/',
    title: '一诺滚雪球',
    themeConfig: {
        //头部logo
        // logo: '/logo.jpeg',
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
                text: '工程化',
                items: [
                    {
                        text: '部署',
                        items: [
                            { text: 'CICD', link: '/engineer/deploy/' },
                            { text: 'vuepress', link: '/engineer/vuepress/' },
                        ]
                    },
                    {
                        text: '构建工具',
                        items: [
                            { text: 'webpack', link: '/engineer/build/module/webpack/' },
                            { text: 'rollup', link: '/engineer/build/module/rollup/' },
                            { text: 'vite', link: '/engineer/build/module/vite/' }
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
                text: '书籍',
                items: [
                    { text: '书籍清单', link: '/books/' },
                ]
            },
            {
                text: 'Github',
                link: 'https://github.com/f5l5y5/vuepress'
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
                {
                    title: 'webpack',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['/engineer/build/module/webpack/', 'webpack笔记'],
                    ]
                },
                {
                    title: 'rollup',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['/engineer/build/module/rollup/', 'rollup笔记'],
                    ]
                },
                {
                    title: 'vite',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['/engineer/build/module/vite/', 'vite笔记'],
                    ]
                },
                {
                    title: 'Git命令',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['/engineer/git/cmd/', '常用命令说明'],
                    ]
                },
                {
                    title: 'gitflow',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['/engineer/git/gitflow/', '说明'],
                    ]
                },
            ],
            '/project/': [
                {
                    title: '移动端开发基础',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['/project/mobile/', '知识点'],
                    ]
                },
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
            ],
            '/books/': [
                {
                    title: '前端书籍',
                    collapsable: true,
                    sidebarDepth: 2,
                    children: [
                        ['/books/', '清单'],
                        ['/books/js-pattern-excise', 'js设计模式'],
                    ]
                },
            ]
        }
    },
    plugins: ['@vuepress/back-to-top']

}
