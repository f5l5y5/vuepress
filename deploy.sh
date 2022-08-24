#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

echo 'blog.yinuosnowball.top' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:f5l5y5/vuepress.git master:gh-page

cd -