## mocha
[官网地址](https://mochajs.org/)
[文章](https://developer.aliyun.com/article/979925)
### 快速上手
1. 安装

```js
npm install --save-dev mocha
```
2. 写入测试文件
```js
// $ mkdir test
// test.js
var assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

```

3. 配置命令
```js
package.json
"scripts": {
  "test": "mocha"
}

```
4. 运行
npm test

### 出现Cannot use import statement outside a module
  - 使用babel进行转 node不支持esModule
  - 项目安装 npm install --save babel-core & npm install --save babel-preset-env 或者 npm install --save babel-preset-es2015 
  - 根目录下新建.babelrc 写入 
```js
{
    "presets": [
      "es2015"/"env"
    ],
    "plugins": []
}
```
  - 命令配置
    - "test": "mocha test --compilers js:babel-core/register"

## jest
[官网地址](https://jestjs.io/zh-Hans/docs/getting-started)