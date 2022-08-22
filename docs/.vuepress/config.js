
module.exports = {
    title: '一诺滚雪球', //标题
    description: '前端知识',
    theme: 'reco',
    base:'/',
    themeConfig: {
        sidebar: [
            {
                title: 'home',   // 必要的
                path: '/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    {title:'介绍',path:'/home/intro'}
                ]
            },
            {
                title: 'about',   // 必要的
                path: '/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 1    // 可选的, 默认值是 1
            }
        ],
        nav: [
            // 单个地址
            { text: '首页', link: '/' },
            // 多个地址
            {
                text: '博客地址',
                items: [
                    { text: 'Github', link: 'https://github.com/f5l5y5/f5l5y5vuepress' },
                ]
            }
        ]
    }
}