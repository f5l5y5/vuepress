<!-- # rollup 笔记 -->

rollup

# 1. 简介

Rollup 是一个 JavaScript 模块打包工具，可以将多个小的代码片段编译为完整的库和应用。与传统的 CommonJS 和 AMD 这一类非标准化的解决方案不同，Rollup 使用的是 ES6 版本 Javascript 中的模块标准。**小巧，一个 ESM 打包器，不支持 HMR，利用 ESM 特性的高效打包器。**

## 2. 上手

新建文件

```jsx
src / index.js
import { log } from './logger'

import messages from './messages'

const msg = messages.hi

log(msg)

src / messages.js

export default {
	hi: 'I am msg'
}

src / logger.js
export const log = msg => {
	console.log('打印***msg====> info', msg)
}

export const error = msg => {
	console.log('打印***msg====> error', msg)
}
```

安装 rollup yarn add rollup -D 3.14.0

```jsx
yarn rollup 出现帮助信息
yarn rollup ./src/index.js 打印结果
yarn rollup ./src/index.js --format iife 输出立即执行函数到文件 iife esm cjs amd...
yarn rollup ./src/index.js --format iife --file=dist/bundle.js输出到文件
打包结果如下，默认tree-sharking
```

![moren](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9c7ef40d-c8e5-4905-b5c1-6ed408074161/Untitled.png)

## 配置文件

根目录 rollup.config.js 默认是 commonjs ，自身会处理，可以使用 esm 语法导出个默认对象。不会自己处理 需要 type 或者 mjs 结尾。

yarn rollup —config 命令

```jsx
export default {
	input: 'src/index.js',
	output: {
		file: 'dist/bundle.js',
		format: 'iife'
	}
}
```

## 加载资源文件

支持使用插件 是唯一扩展途径，导入 json 文件的。

安装插件 rollup-plugin-json 4.0.0

配置文件

```jsx
import json from 'rollup-plugin-json'
export default {
	input: 'src/index.js',
	output: {
		file: 'dist/bundle.js',
		format: 'iife'
	},
	plugins: [json()]
}
```

在 scr/index.js 中使用

```jsx
import { log } from './logger'
import messages from './messages'
import { version, name } from '../package.json'

const msg = messages.hi
console.log('打印***name,version', name, version)
log(msg)
```

打包后结果：没有用到的属性不会被打包

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3ae1b903-9cda-45d5-804f-d5c75e5100ad/Untitled.png)

## 加载 npm 模块

````markdown
解析 npm 包
默认 rollup 是不解析 npm packages 里面的库的
是只用一个 require 来加载的

```js
var answer = require('the-answer')
```
````

如果想也解析 npm packages 里面的库的话
就需要使用 @rollup/plugin-node-resolve
因为 rollup 是只支持 esm 的，但是有的库是使用的 commonJs 规范，所以 rollup 是理解不了的
需要把 commonJs 转换成 ES2015
使用 @rollup/plugin-commonjs 来处理
请注意，大多数情况下 @rollup/plugin-commonjs 应该在转换模块的其他插件之前 - 这是为了防止其他插件进行破坏 CommonJS 检测的更改。 这个规则的一个例外是 Babel 插件，如果你正在使用它，那么把它放在 commonjs 插件之前。

````

rollup不支持import 引入node_modules下面的模块，需要使用rollup-plugin-node-resolve进行解析。

yarn add rollup-plugin-node-resolve -D  5.2.0

```jsx
import { log } from './logger'
import messages from './messages'
import { version, name } from '../package.json'
import _ from 'lodash-es'

const msg = messages.hi
console.log('打印***name,version', name, version)
log(msg)

console.log('打印***_', _.camelCase('hello'))
````

rollup.config.js

```jsx
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/bundle.js',
		format: 'iife'
	},
	plugins: [json(), resolve()]
}
```

未使用 lodash-es 未打包进去

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/74e67bdc-6a7a-4517-a185-f8db9b2c855b/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e5e48535-4707-4841-a8f8-89c01f241500/Untitled.png)

## 加载 commonJS 模块

兼容 cjs 的导出 rollup-plugin-commonjs 10.1.0

```jsx
// 新建一个cjs-module.js
module.exports = {
	foo: 'foo'
}
// src/index.js
import cjs from './cjs-module'

console.log('打印***cjs', cjs)
```

rollup.config.js

```jsx
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/bundle.js',
		format: 'iife'
	},
	plugins: [json(), resolve(), commonjs()]
}
```

打包后

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d56c99fa-14be-4e65-a3ad-ef832c3b0e73/Untitled.png)

## 代码拆分

动态导入，自动进行分包。

```jsx
// src/index.js

import('./logger').then(({ log }) => {
	log('code,splitting')
})

//rollup.config.js
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
	input: 'src/index.js',
	output: {
		dir: 'dist',
		format: 'amd'
	},
	plugins: [json(), resolve(), commonjs()]
}
```

导出格式不能是 iife，会默认放在一起。amd

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bd6eccb4-2daa-4636-a426-72b61a38b898/Untitled.png)

输出多个文件 dir

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1e8d9063-cc44-4005-b264-62c43c65cef8/Untitled.png)

输出的文件

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0dd59bf2-0d75-45bf-8473-0554badd8467/Untitled.png)

## 多入口打包

公共的模块

```jsx
// src/logger.js
export const log = msg => {
	console.log('打印***msg====> info', msg)
}

export const error = msg => {
	console.log('打印***msg====> error', msg)
}
```

```jsx
// 多入口 src/index.js
import('./logger').then(({ log }) => {
	log('code,splitting')
})

// src/album.js
import fetchApi from './fetch'
import { log } from './logger'

fetchApi('/photo?albumId=1').then(data => {
	data.forEach(item => {
		log(item)
	})
})

// src/fetch.js

export default endpoint => {
	return fetch(`https://jsonplaceholder.typicode.com${endpoint}`).then(response => response.json())
}
```

rollup.config.js

```jsx
export default {
	input: ['src/index.js', 'src/album.js'],
	output: {
		dir: 'dist',
		format: 'amd'
	}
}
// ================================== 打包后文件名称
input: {
		main: 'src/index.js',
		main2: 'src/album.js'
	},
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6c74bbd1-b098-4e55-ab37-4f07b1258ae9/Untitled.png)

dist 文件下使用 index.js 文件,使用 require.js 进行解析，data-main 指定引入文件 ,本地启动服务

```jsx
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body></body>
	<script src="https://cdn.bootcdn.net/ajax/libs/require.js/2.3.6/require.js" data-main="./index.js"></script>

</html>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4cb85fa5-f61c-4d67-91c5-80e44ec8bc75/Untitled.png)

## Peer dependencies

```markdown
把对应的库写到 external 内 ，就不会打包到 bundle

external: ['lodash-es']
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/630a9651-91e6-4e2a-bcd3-cbf1931cafb2/Untitled.png)

## 使用 babel

yarn add @babel/core @babel/preset-env @rollup/plugin-babel -D

Babel 插件，放在 commonjs 插件之前

```jsx
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs
import babel from '@rollup/plugin-babel'

export default {
	input: 'src/index.js',
	output: {
		dir: 'dist',
		format: 'cjs'
	},
	plugins: [
		resolve(),
		babel({
			babelHelpers: 'bundled'
		}),
		commonjs()
	],
}
```

## 压缩文件

@rollup/plugin-terser

```jsx
import terser from '@rollup/plugin-terser'

export default {
	input: 'src/index.ts',
	output: {
		dir: 'dist/',
		format: 'esm'
	},
	plugins: [terser()]
}
```

## 打包 ts 文件

```jsx
import typescript from '@rollup/plugin-typescript'

plugins: [typescript({ tsconfig: './tsconfig.json' })
```

## 选用原则

-   输出结果更加扁平
-   自动移除未引用代码
-   打包结果依然可读

缺点

-   非 esm 加载复杂，
-   无法实现 hmr
-   浏览器开发依赖 requirejs 输出 amd，esm 可以支持

小满实践

## 安装依赖

1.全局安装 rollup npm install rollup-g

2.安装 TypeScript npm install typescript -D

3.安装 TypeScript 转换器 npm install rollup-plugin-typescript2 -D

4 安装代码压缩插件 npm install rollup-plugin-terser -D

5 安装 rollupweb 服务 npm install rollup-plugin-serve -D

6 安装热更新 npm install rollup-plugin-livereload -D

7 引入外部依赖 npm install rollup-plugin-node-resolve -D

8 安装配置环境变量用来区分本地和生产 npm install cross-env -D

9 替换环境变量给浏览器使用 npm install rollup-plugin-replace -D

配置 json 文件 npm init -y

```jsx
{
"name": "rollupTs",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"dev": "cross-env NODE_ENV=development  rollup -c -w",
"build":"cross-env NODE_ENV=produaction  rollup -c"
},
"keywords": [],
"author": "",
"license": "ISC",
"devDependencies": {
"cross-env": "^7.0.3",
"rollup-plugin-livereload": "^2.0.5",
"rollup-plugin-node-resolve": "^5.2.0",
"rollup-plugin-replace": "^2.2.0",
"rollup-plugin-serve": "^1.1.0",
"rollup-plugin-terser": "^7.0.2",
"rollup-plugin-typescript2": "^0.31.1",
"typescript": "^4.5.5"
}
}
```

配置 rollup 文件

```

import ts from 'rollup-plugin-typescript2'
import path from 'path'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import repacle from 'rollup-plugin-replace'

const isDev = () => {
	return process.env.NODE_ENV === 'development'
}
export default {
	input: './src/index.ts',
	output: {
		file: './lib/index.js',
		format: 'esm',
		sourcemap: true
	},

	plugins: [
		ts(),
		terser({
			compress: {
				drop_console: !isDev()
			}
		}),
		repacle({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) // 必须以process.env 开头，可以在任意文件读取
		}),
		resolve(['.js', '.ts']),
		isDev() && livereload(), // 刷新
		isDev() &&
			serve({
				open: true,
				openPage: '/public/index.html'
			})
	]
}
```

配置 tsconfig.json

```jsx
{
	"compilerOptions": {
		"target": "es5", /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
		"module": "ES2015", /* Specify what module code is generated. */
		"sourceMap": true, /* Create source map files for emitted JavaScript files. */
		"esModuleInterop": true, /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility. */
		"forceConsistentCasingInFileNames": true, /* Ensure that casing is correct in imports. */
		"strict": true, /* Enable all strict type-checking options. */
		"skipLibCheck": true /* Skip type checking all .d.ts files. */
	}
}
```

npm run dev 启动就可以尽情的玩耍了
