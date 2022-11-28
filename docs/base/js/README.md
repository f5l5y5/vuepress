## 常用函数的实现

### call 实现

call 函数的实现步骤：

1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
2. 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
3. 处理传入的参数，截取第一个参数后的所有参数。
4. 将函数作为上下文对象的一个属性。
5. 使用上下文对象来调用这个方法，并保存返回结果。
6. 删除刚才新增的属性。
7. 返回结果。

```js
// call函数实现
Function.prototype.myCall = function (context) {
	// 判断调用对象
	if (typeof this !== 'function') {
		console.error('type error')
	}
	// 获取参数
	let args = [...arguments].slice(1),
		result = null
	// 判断 context 是否传入，如果未传入则设置为 window
	context = context || window
	// 将调用函数设为对象的方法
	context.fn = this
	// 调用函数
	result = context.fn(...args)
	// 将属性删除
	delete context.fn
	return result
}
```

### apply 实现

apply 函数的实现步骤：

1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
2. 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
3. 将函数作为上下文对象的一个属性。
4. 判断参数值是否传入
5. 使用上下文对象来调用这个方法，并保存返回结果。
6. 删除刚才新增的属性
7. 返回结果

```js
// apply 函数实现
Function.prototype.myApply = function (context) {
	// 判断调用对象是否为函数
	if (typeof this !== 'function') {
		throw new TypeError('Error')
	}
	let result = null
	// 判断 context 是否存在，如果未传入则为 window
	context = context || window
	// 将函数设为对象的方法
	context.fn = this
	// 调用方法
	if (arguments[1]) {
		result = context.fn(...arguments[1])
	} else {
		result = context.fn()
	}
	// 将属性删除
	delete context.fn
	return result
}
```

### bind 函数实现

bind 函数的实现步骤：

1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
2. 保存当前函数的引用，获取其余传入参数值。
3. 创建一个函数返回
4. 函数内部使用 apply 来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的 this 给 apply 调用，其余情况都传入指定的上下文对象。

```js
function person() {
	return console.log('打印***this instanceof person', this instanceof person)
}
person() //false 普通函数

new person() //true 构造函数 原型上存在构造函数 使用window进行条用
content 是传入的对象 外部this是函数 内部this默认是Fn
```

```js
// bind 函数实现
Function.prototype.myBind = function (context) {
	// 判断调用对象是否为函数
	if (typeof this !== 'function') {
		throw new TypeError('Error')
	}
	// 获取参数
	var args = [...arguments].slice(1),
		fn = this
	return function Fn() {
		// 根据调用方式，传入不同绑定值 如果是作为构造函数调用 传入Fn的this 外部调用传入context
		return fn.apply(this instanceof Fn ? this : context, args.concat(...arguments))
	}
}
```

### Object.create 方法

思路： 传入的对象作为原型

```js
function create(obj) {
	function F() {}
	F.prototype = ojb
	return new F()
}
```

### instanceof 方法

用法：instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。

```js
function myInstanceof(left, right) {
	// 获取对象的原型
	let proto = Object.getPrototypeOf(left)
	// 获取构造函数的 prototype 对象
	let prototype = right.prototype
	// 判断构造函数的 prototype 对象是否在对象的原型链上
	while (true) {
		if (!proto) return false
		if (proto === prototype) return true
		// 不存在继续寻找原型链的原型
		proto = Object.getPrototypeOf(proto)
	}
}
```

### new 方法实现

实现：在调用 new 的过程中会发生以上四件事情：
（1）首先创建了一个新的空对象
（2）设置原型，将对象的原型设置为函数的 prototype 对象。
（3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
（4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

```js
function objectFactory() {
	// 1. 创建一个新对象
	let newObject = null
	// 获取需要new的函数
	let constructor = Array.prototype.shift.call(arguments)
	console.log('打印***constructor', constructor)
	let result = null
	// 判断是不是一个函数 不是则返回
	if (typeof constructor !== 'function') {
		console.log('type error', typeof constructor)
		return
	}
	// 2.设置原型 将函数的原型赋值给新对象 create将传入的作为原型对象
	newObject = Object.create(constructor.prototype)
	console.log('打印***newObject', newObject)
	// 3. 将 this 指向新建对象，并执行函数
	result = constructor.apply(newObject, arguments)
	console.log('打印***result', result)
	// 4.判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。
	let flag = result && (typeof result === 'object' || typeof result === 'function')
	return flag ? result : newObject
}
```
