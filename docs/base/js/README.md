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

### 简单 promise 实现

执行过程 new Promise((resolve,reject)=>{}) ----> 执行 fn(resolve,reject) 内部实现 ----> 收集 then 中的成功或失败回调 ----> 返回修改状态值 执行 then 收集的回调，传入外部的值

```js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(fn) {
	// 保存初始化状态
	var self = this

	// 初始化状态
	this.state = PENDING

	// 用于保存 resolve 或者 rejected 传入的值
	this.value = null

	// 用于保存 resolve 的回调函数
	this.onFulfilledCallbacks = []

	// 用于保存 reject 的回调函数
	this.onRejectedCallbacks = []

	// 状态转变为 resolved 方法
	function resolve(value) {
		// 判断传入元素是否为 Promise 值，如果是，则状态改变必须等待前一个状态改变后再进行改变
		if (value instanceof MyPromise) {
			return value.then(resolve, reject)
		}

		// 保证代码的执行顺序为本轮事件循环的末尾
		setTimeout(() => {
			// 只有状态为 pending 时才能转变，
			if (self.state === PENDING) {
				// 修改状态
				self.state = FULFILLED

				// 设置传入的值
				self.value = value

				// 执行回调函数
				self.onFulfilledCallbacks.forEach(callback => {
					callback(value)
				})
			}
		}, 0)
	}

	// 状态转变为 rejected 方法
	function reject(value) {
		// 保证代码的执行顺序为本轮事件循环的末尾
		setTimeout(() => {
			// 只有状态为 pending 时才能转变
			if (self.state === PENDING) {
				// 修改状态
				self.state = REJECTED

				// 设置传入的值
				self.value = value

				// 执行回调函数
				self.onRejectedCallbacks.forEach(callback => {
					callback(value)
				})
			}
		}, 0)
	}

	// 将两个方法传入函数执行
	try {
		fn(resolve, reject)
	} catch (e) {
		// 遇到错误时，捕获错误，执行 reject 函数
		reject(e)
	}
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
	// 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
	onFulfilled =
		typeof onFulfilled === 'function'
			? onFulfilled
			: function (value) {
					return value
			  }

	onRejected =
		typeof onRejected === 'function'
			? onRejected
			: function (error) {
					throw error
			  }

	// 如果是等待状态，则将函数加入对应列表中
	if (this.state === PENDING) {
		this.onFulfilledCallbacks.push(onFulfilled)
		this.onRejectedCallbacks.push(onRejected)
	}

	// 如果状态已经凝固，则直接执行对应状态的函数

	if (this.state === FULFILLED) {
		onFulfilled(this.value)
	}

	if (this.state === REJECTED) {
		onRejected(this.value)
	}
}
```

### 简单 promise then 方法实现

配合上面 需要修改如下

```js
MyPromise.then = function (onFulfilled, onRejected) {
	// 保存前一个promise的this
	const self = this
	return new MyPromise((resolve, reject) => {
		// 封装前一个promise成功时执行的函数
		let fulfilled = () => {
			try {
				const result = onFulfilled(self.value) // 承前
				return result instanceof MyPromise ? result.then(resolve, reject) : resolve(result) //启后
			} catch (err) {
				reject(err)
			}
		}
		// 封装前一个promise失败时执行的函数
		let rejected = () => {
			try {
				const result = onRejected(self.reason)
				return result instanceof MyPromise ? result.then(resolve, reject) : reject(result)
			} catch (err) {
				reject(err)
			}
		}
		switch (self.status) {
			case PENDING:
				self.onFulfilledCallbacks.push(fulfilled)
				self.onRejectedCallbacks.push(rejected)
				break
			case FULFILLED:
				fulfilled()
				break
			case REJECT:
				rejected()
				break
		}
	})
}
```

### Promise.race 方法实现

该方法的参数是 Promise 实例数组, 然后其 then 注册的回调方法是数组中的某一个 Promise 的状态变为 fulfilled 的时候就执行. 因为 Promise 的状态只能改变一次, 那么我们只需要把 Promise.race 中产生的 Promise 对象的 resolve 方法, 注入到数组中的每一个 Promise 实例中的回调函数中即可.

静态方法

```js
Promise.race = function (args) {
	return new Promise((resolve, reject) => {
		for (let i = 0, len = args.length; i < len; i++) {
			args[i].then(resolve, reject)
		}
	})
}
```

### Promise.all 方法实现

1. 核心思路

1) 接收一个 Promise 实例的数组或具有 Iterator 接口的对象作为参数
2) 这个方法返回一个新的 promise 对象，
3) 遍历传入的参数，用 Promise.resolve()将参数"包一层"，使其变成一个 promise 对象
4) 参数所有回调成功才是成功，返回值数组与参数顺序一致
5) 参数数组其中一个失败，则触发失败状态，第一个触发失败的 Promise 错误信息作为 Promise.all 的错误信息。

2. 实现代码
   一般来说，Promise.all 用来处理多个并发请求，也是为了页面数据构造的方便，将一个页面所用到的在不同接口的数据一起请求过来，不过，如果其中一个接口失败了，多个请求也就失败了，页面可能啥也出不来，这就看当前页面的耦合程度了

```js
MyPromise.all = function (promises) {
	return new MyPromise((resolve, reject) => {
		if (!Array.isArray(promises)) {
			throw new TypeError('arguments must be a array')
		}
		// 计算处理的promise实例数量
		let resolvedCounter = 0
		const promisesNum = promises.length
		// 保存每个promise的结果
		const resolvedResult = []
		for (let i = 0; i < promisesNum; i++) {
			// 使用Promise.resolve对返回的结果进行包装， 可以触发成功或者失败回调
			Promise.resolve(promises[i]).then(
				value => {
					resolvedCounter++
					resolvedResult[i] = value
					if (resolvedCounter === promisesNum) {
						return resolve(resolvedResult)
					}
				},
				error => {
					return reject(error)
				}
			)
		}
	})
}
```

### 简单防抖 debounce 实现

函数防抖是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。正常需要加第三个参数，控制触发的时机。
<br/>

<img :src="$withBase('/base/js/debounce.jpg')" alt="debounce">

```js
function debounce(fn, wait) {
	let timer = null

	return function () {
		let context = this,
			args = arguments

		// 如果此时存在定时器的话，则取消之前的定时器重新记时
		if (timer) {
			clearTimeout(timer)
			timer = null
		}

		// 设置定时器，使事件间隔指定事件后执行
		timer = setTimeout(() => {
			// 避免this丢失
			fn.apply(context, args)
		}, wait)
	}
}
```

### 简单节流 throttle 实现

函数节流是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。一般是窗口变化使用

```js
function throttle(fn, delay) {
	// 记录时间 初始化会立即执行
	let curTime = Date.now()

	return function () {
		let context = this,
			args = arguments,
			nowTime = Date.now()

		// 事件调用时，如果当前时间减去记录时间没有超过delay时间，立即执行一次
		if (nowTime - curTime >= delay) {
			// 闭包保存当前的时间，每次执行重新记录
			curTime = Date.now()
			return fn.apply(context, args)
		}
	}
}
```

### 判断类型函数

```js
function getType(value) {
	// 判断数据是 null 的情况
	if (value === null) {
		return value + ''
	}
	// 判断数据是引用类型的情况
	if (typeof value === 'object') {
		let valueClass = Object.prototype.toString.call(value),
			type = valueClass.split(' ')[1].split('')
		type.pop()
		return type.join('').toLowerCase()
	} else {
		// 判断数据是基本数据类型的情况和函数的情况
		return typeof value
	}
}
```

### 函数柯里化

是指把接收多个参数的函数变换成接收单一参数的函数，嵌套返回直到所有参数都被使用并返回最终结果。更简单地说，柯里化是一个函数变换的过程，是将函数从调用方式：f(a,b,c)变换成调用方式：f(a)(b)(c)的过程。

---

定义一个函数 sum，则 sum.length 的长度是形参的个数

---

用处：

1. 延迟计算
2. 参数复用
3. 动态生成函数

```js
// 简单例子
function addThreeNum(a, b, c) {
	return a + b + c
}

function addThreeNumCurry(a) {
	return function (b) {
		return function (c) {
			return a + b + c
		}
	}
}
```

柯里化实现

```js
function curry(fn) {
	return function nest(...args) {
		if (args.length >= fn.length) {
			return fn(...args)
		} else {
			return function (arg) {
				return nest(...args, arg)
			}
		}
	}
}
//使用
const addCurry = curry(addThreeNum)
const sum = addCurry(1)(2)(3)
```
