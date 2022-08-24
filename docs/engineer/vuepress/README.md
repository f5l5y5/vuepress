<!-- # vuepress博客搭建及自动化部署 -->
## 1.博客搭建
### 1.1初始化项目
```
# 初始化项目
cd ~/Desktop
mkdir my-vuepress
cd my-vuepress
npm init -y

# 将 VuePress 作为一个本地依赖安装
yarn add -D vuepress # 或者：npm install -D vuepress

# 新建一个 docs 文件夹
mkdir docs

# 新建一个 markdown 文件
echo '# Hello VuePress!' > docs/README.md

```
### 1.2 添加脚本
```
{
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs",
    "deploy": "bash deploy.sh"
  }
}

```
### 1.3 运行调试
使用yarn docs

### 1.4 设置博客基本内容
- 添加标题 在config.js中title 
- 添加nav themeConfig中配置
- 添加sidebar 
- 此处的base设置为/ 设置为其他域名进行CNAME解析不成功
```javascript
module.exports = {
    title: '一诺滚雪球', //标题
    description: '前端知识',
    theme: 'reco',
    base: '/',
    themeConfig: {
        sidebar: [
            {
                title: 'home',   // 必要的
                path: '/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    { title: '介绍', path: '/home/intro' },
                    { title: 'vuepress搭建过程', path: '/home/vuepress' }
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
                    { text: 'Github', link: 'https://github.com/f5l5y5/vuepress' },
                ]
            }
        ]
    }
}
```
图片使用
```
<img :src="$withBase('/engineer/vuepress/git-pages.png')" alt="git-page">
```
### 1.5 配置sh脚本文件进行部署
```sh
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

echo 'blog.yinuosnowball.top' > CNAME

git init
git add -A
git commit -m 'deploy'
# 将编译生成的文件推送到gh-page分支
git push -f git@github.com:f5l5y5/vuepress.git master:gh-page

cd -

```
运行命令 vs-code命令终端切换到git bash 使用sh deploy.sh  或者配置的脚本 yarn deploy

添加自定义域名
echo 'blog.yinuosnowball.top' > CNAME 添加这条记录 否则每次deploy自定义域名重置

### 1.6 github-page配置

<img :src="$withBase('/git-pages.png')" alt="foo">
每次推送到远程，本地需要手动进行构建推送

## 2.git-action自动化部署
避免上述手动推送,现在配置自动化构建

### 2.1 生成personal token
Settings -> Developer settings -> Personal access tokens，对应地址就是 Token 生成。然后点击右上方的 Generate new token，

### 2.2 找到项目的setting 
secrets Actions 下添加刚生成的token
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


### 2.3  项目下的action
新建一个workflow 新增main.yml
配置添加，保留默认配置
```
name: CI
on:
  push:
    branches: [ "master" ]
  pull_request:
    branches: [ "master" ]

  workflow_dispatch:
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

```
新增配置
```
 # 生成静态文件
      - name: Build
        run: npm install && npm run build

      # 部署到 GitHub Pages
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }} # 也就是我们刚才生成的 secret
          BRANCH: gh-page # 部署到 gh-pages 分支，因为 main 分支存放的一般是源码，而 gh-pages 分支则用来存放生成的静态文件
          FOLDER: docs/.vuepress/dist # vuepress 生成的静态文件存放的地方
```

如果直接时doc的整个文件git中设置为/root

<img :src="$withBase('/engineer/vuepress/define-page.png')" alt="define-page">

## 3.具体配置


### 3.1 首页配置

docs/README.md 

```jsx
---
home: true
heroImage: /logo.png
heroText: 一诺滚雪球
tagline: 前端知识体系
actionText: 开始前端体系之旅 →
actionLink: /guide
features:
- title: 全栈
  details: 见其广，知其深
- title: 每日一题
  details: 勤学如春起之苗，不见其增，日有所长
- title: 积累,
  details: 不积跬步，无以至千里
footer: 暮从碧山下，山月随人归。却顾所来径，苍苍横翠微。
---
```

### 3.2 顶部名称和图片

```jsx
module.exports = {
    base: '/',
    title: '一诺滚雪球',
    themeConfig: {
        //头部logo
        logo: '/logo.jpeg',
		}
}
```

### 3.3 顶部nav

```jsx
nav: [
            { text: '首页', link: '/', target: '_blank' },
            {
                text: '前端三件套',
                items: [
                    { text: 'HTML', link: '/base/html/' },
                    { text: 'CSS', link: '/base/css/' },
                    { text: 'JS', link: '/base/js/' },
                ]
            },
            {
                text: '博客地址',
                items: [
                    { text: 'Github', link: 'https://github.com/f5l5y5/vuepress' },
                    { text: '关于我', link: '/about/' },
                ]
            },
            {
                text: 'Languages',
                //可以进行分组 在导航栏
                items: [
                    { text: '', items: [{ text: '导航', link: '/guide/' }] },
                    { text: '', items: [{ text: '英文导航', link: '/guide/' }] }
                ]
            }
        ],
```

### 3.4 侧边导航栏
#### 3.4.1 数组形式

```jsx
sidebar: {
            '/base/': [
                '', //对应下面的readme.md
								'input',//md文件中如果设置了一级标题，默认取里面的
								'form'
            ]
        }
```

<img :src="$withBase('/engineer/vuepress/nav-array.png')" alt="define-page">

#### 3.4.2 混合使用  
如果md文件有一级标题，还是取这个
```jsx
'/base/html/': [
                '',
                'form',
                {
                    title: '表单',   // 必要的 
                    path: 'input',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                },
            ],
```

<img :src="$withBase('/engineer/vuepress/nav-mix.png')" alt="define-page">

#### 3.4.3 正确配置

```jsx
sidebar: {
            '/base/html/': [
                {
                    title: 'HTML',   
                    collapsable: true, 
                    sidebarDepth: 2,    // 可选的, 默认值是 1      此时生效上述写法不会生效
                    children: [
                        ['/base/html/form', 'form1'], //form1为左侧菜单的名称 
                        ['/base/html/input', 'input']
                    ]
                },
            ]
        }
```

完整的配置  

::: tip
⚠️ 注意 children中路径不加/默认是找algorithm的sort.md ,加末尾加/ 说明是sort文件夹里面的README.md文件  ['/advanced/algorithm/sort', '排序算法'],
:::

```jsx

{
    text: '进阶',
    //可以进行分组 在导航栏
    items: [
        { text: '数据结构算法', items: [{ text: '算法', link: '/advanced/algorithm/' }] },
        { text: '设计模式', items: [{ text: 'js设计模式', link: '/advanced/design/' }] }
    ]
},
'/advanced/algorithm/': [
  {
      title: '算法',
      collapsable: true,
      sidebarDepth: 2,
      children: [
          ['', 'js实现算法'],
          ['/advanced/algorithm/sort', '排序算法'],
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
]

```

<img :src="$withBase('/engineer/vuepress/nav-siderbar.png')" alt="define-page">



