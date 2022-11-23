# es6

## class 用法

```js
class Person {}
// 或者适用赋值方式进行实例化

const Person = class {
	static $age = '18' // 静态属性，实例化无法访问
	$name = 'jack' // 等价于constructor中的this.$name = xxx
	constructor(name) {
		this.name = name
		this.talk = () => {
			console.log('实例化后属性方法talk')
		}
	}
	speak() {
		console.log('实例化后原型上方法speck')
	}
	static $speak() {
		console.log('类静态方法')
	}
}
```

## Decorator 装饰器

装饰器是一种函数，用来增强 JavaScript 类（class）的功能,写成@ + 函数名，可以用来装饰四种类型的值。

1. 类
2. 类的属性
3. 类的方法
4. 属性存取器（accessor）
