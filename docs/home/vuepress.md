# vuepress博客搭建及自动化部署
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
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs",
    "deploy": "bash deploy.sh"
  }
}

```
### 1.3 运行调试
使用yarn docs:dev

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
<img :src="$withBase('/git-pages.png')" alt="foo">
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

### 2.3  项目下的action
新建一个workflow


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
