// const path = require('path');
// const fs = require('fs');

// const webglFolder = path.join(__dirname, '../webgl');

// const webgl = fs.readdirSync(webglFolder).filter(md => md !== 'README.md');

// console.log('打印***webgl',webgl)

module.exports = {
    title: '一诺滚雪球', //标题
    description: '前端知识',
    base: '/FEBlog/',
    themeConfig: {
        // sidebar: {
        //     '/webgl/': [
        //         'one'
        //     ],
        // },
        sidebar: [
            {
                title: 'webgl',   // 必要的
                path: '/webgl/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    '/'
                ]
            }
        ],
        nav: [
            // 单个地址
            { text: '首页', link: '/' },
            // 多个地址
            {
                text: '博客地址',
                items: [
                    { text: 'Github', link: 'https://github.com/zhangwinwin/FEBlog' },
                ]
            }
        ]
    }
}