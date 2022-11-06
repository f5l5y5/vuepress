// const data = { a: 1 }
// const p = new Proxy(data, {
// 	get(target, key) {
// 		return target[key]
// 	},
// 	set(target, key, newVal) {
// 		target[key] = newVal
// 	}
// })
// data.a = 12

// console.log(p.a)

// const func = x => {
// 	console.log('打印***11', x)
// }

// const pf = new Proxy(func, {
// 	apply(target, thisArg, argArray) {
// 		console.log('打印***target', target)
// 		console.log('打印***thisArg', thisArg)
// 		console.log('打印***argArray', argArray)
// 		target.call(thisArg, ...argArray)
// 	}
// })

// pf(11)

// const obj = {
// 	foo: 1,
// 	get() {
// 		return this.foo + 2
// 	}
// }
// // console.log(obj.foo)
// const outObj = { foo: 2 }
// //指定接收者 receiver，你可以把它理解为函数调用过程中的 this
// console.log(Reflect.get(obj, 'foo', outObj))

// var obj = {
// 	foo: 1,

// 	bar: 2,

// 	get fn() {
// 		return this.foo + this.bar
// 	}
// }

// var outObj = {
// 	foo: 4,

// 	bar: 4
// }

// console.log(Reflect.get(obj, 'foo'))
// console.log(Reflect.get(obj, 'fn'))
// console.log(Reflect.get(obj, 'fn', outObj))

var obj = {
	foo: 1,
	bar: 2
}

const p = new Proxy(obj, {
	deleteProperty(target, key) {
		console.log('打印***target, key', target, key)
		return Reflect.deleteProperty(target, key)
	}
})

console.log('打印***obj', obj)
delete p.foo
console.log('打印***obj', obj)
