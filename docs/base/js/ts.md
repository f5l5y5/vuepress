## ts 笔记

# Typescript

TS 在线运行网站

[TS Playground - An online editor for exploring TypeScript and JavaScript](https://www.typescriptlang.org/play)

## 1.搭建 ts 坏境

npm i -g typescript 会有 tsc 命令进行编译。 tsc xx.ts —watch 监视变化 运行使用 node xxx.js

省去编译加运行 安装 ts-node

npm i ts-node

ts-node xxx.ts 即可执行

## 2.基本类型

### 2.1 number string boolean symbol unknow any never void

```tsx
// let n:number = 123
let num:number   num=123
    // 类型断言
    let a= 123
    // a  = '123'
    // string
    let s:string = '123'
    // s=123

    // boolean
    let b:boolean = false
```

特殊类型 undefined null any unkown void never

any :可以被任何赋值，也可以赋值给任何值（never 除外）

unknow:使用配合类型断言。不能赋值给 any 之外的类型 可以被所有赋值

void: 可以把 undefined 值或类型是 undefined 的变量赋值给 void，类型是 void 但值是 undefined 变量不能赋值给 undefined 类型 undefined null 赋值

never：永远不会发生值 抛出错误 ，是所有类型的字类型 可以给所有类型赋值

```jsx
    // null undefined void never unkown
    let u:undefined = undefined


    let n:null = null

    // 指定了--strictNullChecks 不能给number赋值  只能给void和他们自己赋值(不可以)
    // let v:void = void

    // any 任何值
    let notSure:any = 123
    notSure = 'abv'

    // unknown
    // 使用any 没有将风险暴露 如果不是number 怎么办
    function divide(params:any) {
        return params/2
    }
    console.log('打印***divide',divide('abc'))

    // 使用unknown 配合类型断言
    function div(params:unknown) {
        // 进行处理
        return params as number /2
    }
    console.log('打印***divide',div('abc'))//NaN
    console.log('打印***divide',div(10))//5

    // void

    function wel():void {
        console.log(123);
        // return 1
    }

    console.log('打印***wel()',wel())//undefined

    //never 永不存在 是任何类型的子类型
    function fn(msg:string):never {
        while(true){
            console.log('打印***msg',msg)//undefined
        }
        // throw new Error(msg)
    }
    console.log('打印***fn',fn('xxx'))

```

any 和 unkown 区别

```tsx
let e: any //let e 隐式any
let s: string
s = e //any类型可以赋值给别人
let d: unknown
s = d //这种赋值不允许
// unknown 不能赋值给确定的变量  如果要赋值 必须作判断
if (typeof e === 'string') {
	s = e
}
// 类型断言  告诉浏览器e就是string
s = e as string
s = <string>e
```

### symbol 类型

```tsx
let _s: symbol = Symbol('1')
let r: symbol = Symbol('1')
// symbol 不会被遍历
let obj = {
	[_s]: 's',
	r: 'r'
}
// for...in  Object.keys得不到
for (const key in obj) {
	console.log('打印***key', key)
}
console.log(JSON.stringify(obj))
// 可以得到
console.log(Object.getOwnPropertySymbols(obj))

// 得到全部
console.log(Reflect.ownKeys(obj))
```

迭代器 都有 S**ymbol(Symbol.iterator)**

```jsx
const arr: number[] = [1, 2, 3]

let it: Iterator<number> = arr[Symbol.iterator]()
console.log('打印***it', it.next())

type mapKeys = string | number
let set: Set<number> = new Set([1, 2, 3])
let map: Map<mapKeys, mapKeys> = new Map()
map.set('1', '网')
map.set('2', '网2')

function gen(arg: any) {
	let it: Iterator<any> = arg[Symbol.iterator]()
	let next: any = { done: false }
	while (!next.done) {
		next = it.next()
		if (!next.done) {
			console.log(next)
		}
	}
}

// 可以使用for of 是值
// for  in 是键
```

### Reflect proxy

Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）

target 要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。

handler 一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

handler.get() 本次使用的 get : 属性读取操作的捕捉器。

handler.set() 本次使用的 set :属性设置操作的捕捉器。

Reflect
与大多数全局对象不同 Reflect 并非一个构造函数，所以不能通过 new 运算符对其进行调用，或者将 Reflect 对象作为一个函数来调用。Reflect 的所有属性和方法都是静态的（就像 Math 对象）

Reflect.get(target, name, receiver)
Reflect.get 方法查找并返回 target 对象的 name 属性，如果没有该属性返回 undefined

Reflect.set(target, name,value, receiver)
Reflect.set 方法设置 target 对象的 name 属性等于 value。

```jsx
type Person = {
	name: string
	age: number
	text: string
}

const proxy = (object: any, key: any) => {
	return new Proxy(object, {
		get(target, prop, receiver) {
			console.log('打印***===========get')

			return Reflect.get(target, prop, receiver)
		},
		set(target, prop, value, receiver) {
			console.log('打印***===========set')
			return Reflect.set(target, prop, value, receiver)
		}
	})
}

const logAcess = <T>(object: T, key: keyof T): T => {
	return proxy(object, key)
}

let man = logAcess<Person>(
	{
		name: 'fu',
		age: 30,
		text: '10s'
	},
	'name'
)

man.age = 40
console.log('打印***man', man, man.name)
```

### 2.2 Object object {}区别

Object 是所有的类型，object 是引用类型 {} 定义过后无法进行赋值修改

```tsx
let a: object
a = {}
a = function () {}
//指定必须一致
let b: {
	name: string
	//    ?:可选属性
	age?: number
}
b = {
	name: 'abc'
}

// 可以添加多个属性 但必须有name属性
let c: {
	name: string
	[propName: string]: any //表示随便的名称  js中的属性就是字符串  类型为any
}

c = {
	name: '234',
	age: 12
}
```

### 2.3 interface 接口

定义对象,

-   同名重合
-   任意 key [x:string]:any 索引签名，一般写 any,如果写成 number 或者其他，那么其他属性都是 number
-   ?可选操作符 readonly
-   接口继承 extends 合成一个
-   定义一个函数类型

```tsx
// 接口
interface Person {
	name: string
	age: number
	readonly cardNum: string
	gender?: 'male' | 'female'
}

const per: Person = {
	name: 'zh',
	age: 18,
	cardNum: '1234455'
}

per.name = '123'
// per.cardNum = '1234423'

// 不确定属性
interface NotSure {
	[propName: string]: string
}
const obj: NotSure = {
	a: '23423'
}

interface LikeArr {
	[propName: number]: string
}
const objArr: LikeArr = {
	0: '0'
}
const likeArr: LikeArr = ['1', '2']

// 使用type定义函数类型
type Func = (name: string) => number

let func: Func = name => {
	console.log('打印***name', name)
	return 1
}

interface Fun {
	(x: number, y: number): number
}
// 箭头函数式定义
const fn: Fun = (x, y) => {
	return x + y
}

fn('a'.length, 'b'.length)

// 使用定义的就自己定义类型
function fn1(x: number, y: number): number {
	return x + y
}

// 索引签名 number作为键必须为数字 string作为键可以是数字和字符串
interface INumObj {
	[name: number]: string
}
// 可以添加readonly 进行只读提示，并不会阻止赋值
interface IStrObj {
	[name: string]: string
	//age:number // 不可以设置
}

let obj1: INumObj = {
	1: '2',
	2: '2'
}

let obj2: IStrObj = {
	str1: 'str1',
	2: '2'
}
```

### 2.4 数组 2 种方式

-   普通数组
-   对象数组
-   二维数组 什么都有 any[]
-   类数组 IArguments

```tsx
let e: string[] //字符串数组
e = ['1', '2']

let g: Array<number>
g = [1, 2, 3]

// 对象数组

interface X {
	name: string
	age?: number
}

let arr: X[] = [{ name: '1' }]

// 二维数组
let arr: number[][] = [[1], [2]]

let arr1: Array<Array<string>> = [['1']]
// 函数中的数组使用
function a(...args: number[]) {
	let a: IArguments = arguments
}
```

### 2.5 函数

### 函数

```tsx
//定义函数
let d: (a: number, b: number) => number
d = function (a, b) {
	return a + b
}
```

函数重载 定义多次

方法名字相同，参数不同，返回类型可以相同可以不同。如果参数类型不同，则操作参数类型应设置为 any，参数数量不同可以将不同的参数设置为可选。

```tsx
// 两套规则
function add3(x: number): number
function add3(x: number, y: number): number
// 执行操作的实现函数
function add3(x: any, y?: any): any {
	//类型判断
	return x + y
}
//如果是第一个 第一个规则
add3(1)
// 传两个 第二套规则
add3(1, 2)
```

### 2.6 类型断言 联合类型 交叉类型

联合类型：同时可以赋值多个，比如先定义成 null/undefined 后面不可能为空值，就可以进行类型断言

### 联合类型

```tsx
// 定义常量
let a: 10
a = 10

let b: 'male' | 'false' //(联合类型)

b = 'male'
b = 'false'
// b='female'

// let j:string|number;  表示对象都要有
let j: { name: string } & { age: number }
j = { name: '123', age: 12 }
```

### 交叉类型

```tsx
interface Person {
	name: string
	age: number
}

type Student = Person & { grader: number }

const stu: Student = {
	name: '1',
	age: 12,
	grader: 100
}

// const s1:Student
// s1.name = 'zs'
// s1.age=12
// s1.grader=100
```

### 类型断言

```ts
interface A {
	name: string
}

interface B {
	age: number
}

function fn(type: A | B) {
	// 此处无法分别A还是B 所以进行断言 常用as
	console.log((<A>type).name)
	console.log((type as A).name)
}
```

```ts
//数字不能有长度 使用类型断言  两种方式
const getLength = (target: string | number) => {
	if ((<string>target).length || (target as string).length === 0) {
		return (target as string).length
	} else {
		return target.toString().length
	}
}

console.log(getLength(123556))
console.log(getLength('abc'))
```

使用 as 作类型断言

```jsx
const arr: number[] = [1, 2, 3, 4]
const than: number = arr.find(num => num > 2) as number

const than: number = <number>arr.find(num => num > 2)
```

常量断言

```jsx
let str = 'str' as const
```

非空断言 建议使用类型守卫，就是先判断类型

```jsx
xxx!.toString（）
```

```tsx
// 常用的类型守卫
	1. switch
	2. 字面量恒等
	3 typeof
	4 instanceof
	5 in
	6 自定义类型守卫
```

### 2.7 内置对象

Array、Boolean、String、RegExp、Date…

DOM BOM

```jsx
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
//读取div 这种需要类型断言 或者加个判断应为读不到返回null
let div:HTMLElement = document.querySelector('div') as HTMLDivElement
document.addEventListener('click', function (e: MouseEvent) {

});
//dom元素的映射表
interface HTMLElementTagNameMap {
    "a": HTMLAnchorElement;
    "abbr": HTMLElement;
    "address": HTMLElement;
    "applet": HTMLAppletElement;
    "area": HTMLAreaElement;
    "article": HTMLElement;
    "aside": HTMLElement;
    "audio": HTMLAudioElement;
    "b": HTMLElement;
    "base": HTMLBaseElement;
    "bdi": HTMLElement;
    "bdo": HTMLElement;
    "blockquote": HTMLQuoteElement;
    "body": HTMLBodyElement;
    "br": HTMLBRElement;
    "button": HTMLButtonElement;
    "canvas": HTMLCanvasElement;
    "caption": HTMLTableCaptionElement;
    "cite": HTMLElement;
    "code": HTMLElement;
    "col": HTMLTableColElement;
    "colgroup": HTMLTableColElement;
    "data": HTMLDataElement;
    "datalist": HTMLDataListElement;
    "dd": HTMLElement;
    "del": HTMLModElement;
    "details": HTMLDetailsElement;
    "dfn": HTMLElement;
    "dialog": HTMLDialogElement;
    "dir": HTMLDirectoryElement;
    "div": HTMLDivElement;
    "dl": HTMLDListElement;
    "dt": HTMLElement;
    "em": HTMLElement;
    "embed": HTMLEmbedElement;
    "fieldset": HTMLFieldSetElement;
    "figcaption": HTMLElement;
    "figure": HTMLElement;
    "font": HTMLFontElement;
    "footer": HTMLElement;
    "form": HTMLFormElement;
    "frame": HTMLFrameElement;
    "frameset": HTMLFrameSetElement;
    "h1": HTMLHeadingElement;
    "h2": HTMLHeadingElement;
    "h3": HTMLHeadingElement;
    "h4": HTMLHeadingElement;
    "h5": HTMLHeadingElement;
    "h6": HTMLHeadingElement;
    "head": HTMLHeadElement;
    "header": HTMLElement;
    "hgroup": HTMLElement;
    "hr": HTMLHRElement;
    "html": HTMLHtmlElement;
    "i": HTMLElement;
    "iframe": HTMLIFrameElement;
    "img": HTMLImageElement;
    "input": HTMLInputElement;
    "ins": HTMLModElement;
    "kbd": HTMLElement;
    "label": HTMLLabelElement;
    "legend": HTMLLegendElement;
    "li": HTMLLIElement;
    "link": HTMLLinkElement;
    "main": HTMLElement;
    "map": HTMLMapElement;
    "mark": HTMLElement;
    "marquee": HTMLMarqueeElement;
    "menu": HTMLMenuElement;
    "meta": HTMLMetaElement;
    "meter": HTMLMeterElement;
    "nav": HTMLElement;
    "noscript": HTMLElement;
    "object": HTMLObjectElement;
    "ol": HTMLOListElement;
    "optgroup": HTMLOptGroupElement;
    "option": HTMLOptionElement;
    "output": HTMLOutputElement;
    "p": HTMLParagraphElement;
    "param": HTMLParamElement;
    "picture": HTMLPictureElement;
    "pre": HTMLPreElement;
    "progress": HTMLProgressElement;
    "q": HTMLQuoteElement;
    "rp": HTMLElement;
    "rt": HTMLElement;
    "ruby": HTMLElement;
    "s": HTMLElement;
    "samp": HTMLElement;
    "script": HTMLScriptElement;
    "section": HTMLElement;
    "select": HTMLSelectElement;
    "slot": HTMLSlotElement;
    "small": HTMLElement;
    "source": HTMLSourceElement;
    "span": HTMLSpanElement;
    "strong": HTMLElement;
    "style": HTMLStyleElement;
    "sub": HTMLElement;
    "summary": HTMLElement;
    "sup": HTMLElement;
    "table": HTMLTableElement;
    "tbody": HTMLTableSectionElement;
    "td": HTMLTableDataCellElement;
    "template": HTMLTemplateElement;
    "textarea": HTMLTextAreaElement;
    "tfoot": HTMLTableSectionElement;
    "th": HTMLTableHeaderCellElement;
    "thead": HTMLTableSectionElement;
    "time": HTMLTimeElement;
    "title": HTMLTitleElement;
    "tr": HTMLTableRowElement;
    "track": HTMLTrackElement;
    "u": HTMLElement;
    "ul": HTMLUListElement;
    "var": HTMLElement;
    "video": HTMLVideoElement;
    "wbr": HTMLElement;
}

// promise
function promise(): Promise<number> {
	return new Promise<number>((resolve, reject) => {
		resolve(1)
	})
}

promise().then(res => {
	console.log('打印***res', res)
})
```

### 2.8 类 class

属性必须先声明。

-   public 公共的 内外都可以访问 -
-   private 当前内部可以访问
-   protected 外部不能访问内部和子类可以访问即继承的可以访问
-   static 静态属性/函数 不需要 new 静态
-   static 静态方法 不能访问非静态属性 内部不能进行调用，静态方法之间可以相互调用

```ts
class Person {
	name: string
	age?: number // 不用就可选
	constructor(name: string) {
		this.name = name
	}
}

class Person {
	public name: string
	private age: number
  public type?: number // 不用就可选
	protected gender: string
	static readonly c: 'man' | 'woman' = 'man' // 静态只读
	constructor(name: string, age: number, gender: string) {
		this.name = name
		this.age = age
		this.gender = gender
	}
	static run() {
		// 只能访问静态属性c  其他的访问不到
		console.log('打印***this.', this.c)
	}
	static dev() {
		this.run()
		return 'dev'
	}
  bark(){
      // this 指向实例化
      console.log(this.name);
	}

class Man extends Person {
	constructor() {
		super('name', 20, '女')
		// protected 子类可以访问 private 只能内部可以访问
		console.log('打印***this.gender', this.gender)
	}
}
```

使用接口去定义类

```ts
interface P {
	run(x: boolean): boolean
}

interface H {
	dev(): void
}

class A {
	params: string
	constructor(params: string) {
		this.params = params
	}
}
// 类定义多个接口
class Person extends A implements P, H {
	run(x: boolean): boolean {
		return x
	}
	dev(): void {}
}

let p = new Person('jack')
console.log('打印***p', p)
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/833abe6f-c005-493b-a515-d6e9643af436/Untitled.png)

### 2.9 抽象类 abstract

```tsx
// 抽象类  animal 创建对象  父类禁止创建对象

abstract class Animal {
	name: string
	constructor(name: string) {
		this.name = name
	}
	// 可以在抽象中实现
	setName(name: string) {
		this.name = name
	}
	// 抽象方法 结构定义好 具体让子类定义 只能在抽象类中 子类必须重写
	abstract sayHello(): void
}

class Dog extends Animal {
	constructor(name: string) {
		super(name)
	}
	sayHello(): void {
		// super 表示父类
		console.log('汪汪')
	}
}

let d = new Dog('小花')
d.setName('xiao gou')
console.log('打印***d.name', d.name)
```

继承

```tsx
// 出现大量重复的代码  父类
class Animal {
	name: string
	age: number
	constructor(name: string, age: number) {
		this.name = name
		this.age = age
	}
	sayHello() {
		console.log('动物在叫')
	}
}
// 子类  拥有父类所有的属性方法
// 子类对父类有相同的方法  叫做方法重写
class Dog extends Animal {
	// 自定义属性
	run() {
		console.log(`${this.name}在跑～～～`)
	}
	sayHello(): void {
		console.log('汪汪汪')
	}
}
class Cat extends Animal {
	sayHello(): void {
		console.log('喵喵喵')
	}
}
```

### super 关键字

```tsx
class Animal {
	name: string
	constructor(name: string) {
		this.name = name
	}
	sayHello() {
		console.log('动物在叫···')
	}
}
//如果子类没有自己的constructor就不需要调用super
class Dog extends Animal {
	age: number
	constructor(name: string, age: number) {
		// 调用父类的constructor
		super(name)
		this.age = age
	}
	sayHello(): void {
		// super 表示父类
		super.sayHello()
	}
}
```

### 链式调用

```tsx
// 基本链式调用
class StudyStep {
	step1() {
		console.log('listen')
		console.log(this)

		return this
	}
	step2() {
		console.log('read')
		return this
	}
}

const study = new StudyStep()
study.step1().step2()

// 调用子类父类方法
class MyStudyStep extends StudyStep {
	next() {
		console.log('next')
		return this
	}
}

const myStudy = new MyStudyStep()
myStudy.step1().next().step2().next()
```

### 2.10 元组 长度固定的数组 tuple

```tsx
let h: [string, string]
h = ['daf', 'dfa']

let arr: [string, number] = ['a', 1]
// 越界报错，string number 不会报错
arr.push('dfad', 1, false)
```

### 2.11 枚举 enum

1. 数字枚举 以 0 开始递增 可以定义第一个开始的索引

```jsx
// 常量：数字
enum Day {
SUNDAY,
MONDAY,
}
```

1. 字符串枚举 字符串：字符串
2. 异构枚举 同时拥有字符串和数字
3. 常量成员和计算成员 编译后变成常量 不用编译成对象
4. 枚举成员
5. 反向映射 字符串不可以

```tsx
enum Gender {
	Male = 1,
	Female = 0
}

//默认使用 0 1 往后递增  可以设定一个 后面一个递增
// let i:{name:string,gender:string}
let i: { name: string; gender: 0 | 1 }
i = {
	name: '1',
	gender: Gender.Male
}

console.log(i.gender === Gender.Male)

//使用常量枚举 编译后简洁

const enum Direction {
	UP = 'UP',
	DOWN = 'DOWN',
	LEFT = 'LEFT',
	RIGHT = 'RIGHT'
}
// 编译后变成常量
const value = 'UP'
if (value === Direction['UP']) {
}
if (value === Direction.UP) {
}
// 反向映射
enum Type {
	success
}

const n: number = Type.success

let key = Type[n]

console.log('打印*** n ,key', n, key)
```

### 2.12 类型别名 | 类型推论

```ts
// string 比较长 使用 s代替
type s = string
let str: s = 1

//名字解析
type Name = string
type NameResolve = () => string
type NameOrResolve = Name | NameResolve
function getName(n: NameOrResolve): Name {
	if (typeof n === 'string') {
		return n
	} else {
		return n()
	}
}
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eda26a77-81c0-410b-be93-57ea3a2387db/Untitled.png)

```ts
**//extends 包含的意思 左边的值作为右边类型的子类型
// 类型层级
// 顶级类型 any unknow
// ==========
// Object
// ============
// Number String Boolean
// number string boolean
//  1      't'     false
// ============
// never

type num = Number extends number ? 1 : 0 // 0**
```

### 泛型

-   类型自动推导
-   泛型约束

函数式泛型

```tsx
/**
 * 比如一个函数的参数类型不明确 返回值也需要依靠参数确定  写any失去意义
 * 泛型  不确定类型
 */
function fn(a: number): number {
	return a
}
function func<T>(a: T): T {
	return a
}

//使用  //1. TS类型推断 自动推导出类型
func(10)

// 2.指定泛型
func<string>('123')

console.log(func<string>('123'))

// 多个泛型
function fn2<T, K>(a: T, b: K): Arry<T | U> {
	console.log(b)
	return [a]
}

fn2(123, 89)
console.log(fn2(12345, 89))
console.log(fn2<string, number>('123', 189))

// 泛型约束 必须要有属性length
interface Inter {
	length: number
}
// 必须的实现接口
function fn3<T extends Inter>(a: T): number {
	return a.length
}
console.log(fn3('123'))
console.log(
	fn3({
		length: 1
	})
)
// ==========================================================================================

function prop<T, K extends keyof T>(obj: T, key: K) {
	return obj[key]
}

let obj = { a: 1, b: 2, c: 3 }

prop(obj, 'b')

class Sub<T> {
	attr: T[] = []
	add(a: T): T[] {
		return [a]
	}
}

let sub = new Sub<number>()

sub.add(2)
sub.attr = [1, 2, 3]

console.log(sub.add(2), (sub.attr = [1, 2, 3]))
```

```ts
// 泛型定义type
type Printt = <T>(arg: T) => T

const ptt: Printt = function (arg) {
	return arg
}

// 泛型定义interface 可以添加默认参数
interface Printi<T = number> {
	(arg: T): T
}

const pti: Printi<string> = function (arg) {
	return arg
}

// 函数赋值
function prinI<T>(arg: T): T {
	return arg
}

const myPrint: Printi = prinI //不用制定类型了
// const myPrint:Printi<number> = prinI

// 多个参数的变化
// function swap(tuple:any){
//     return [tuple[1],tuple[0]]
// }

function swap<T, U>(tuple: [T, U]): [U, T] {
	return [tuple[1], tuple[0]]
}
const res = swap([1, 2])

// 约束接口返回
function request(url: string) {
	return fetch(url).then(res => res.json())
}
request('/user/info').then(res => {
	console.log(res)
})

interface UserInfo {
	name: string
	age: number
}

function request1<T>(url: string): Promise<T> {
	return fetch(url).then(res => res.json())
}
request1<UserInfo>('user/info').then(res => {
	console.log(res)
})
```

### 泛型的一些应用

```ts
// 泛型 Generics 就像一个占位符 或者一个变量
class Stack<T> {
	private data: T[] = []
	// 1.泛型无法约束static关键字
	push(item: T) {
		return this.data.push(item)
	}
	pop(): T | undefined {
		return this.data.pop()
	}
}
const s1 = new Stack<number>()
s1.push(2)
console.log('打印***s1', s1)
// s1.push('a')

// 2.泛型约束接口

interface IKeyValue<T, U> {
	key: T
	value: U
}
const k1: IKeyValue<number, string> = { key: 1, value: '1' }
const k2: IKeyValue<string, number> = { key: '1', value: 2 }

// 3.泛型定义数组

const arr: number[] = [1, 3, 4]

const arr1: Array<number> = [1, 2, 3]
```

### tsconfig.js 解析

这个文件是通过`tsc --init`命令生成的. 多个文件新增一个 tsconfig.json 文件

tsc 会编译所有的 ts 文件 tsc -w 实时编译

介绍几个常用的

1.include
指定编译文件默认是编译当前目录下所有的 ts 文件

2.exclude
指定排除的文件

3.target
指定编译 js 的版本例如 es5 es6

4.allowJS
是否允许编译 js 文件

5.removeComments
是否在编译过程中删除文件中的注释

6.rootDir
编译文件的目录

7.outDir
输出的目录

8.sourceMap
代码源文件

9.strict
严格模式

10.module
默认 common.js 可选 es6 模式 amd umd 等

```jsx
"compilerOptions": {
  "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
  "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
  "diagnostics": true, // 打印诊断信息
  "target": "ES5", // 目标语言的版本
  "module": "CommonJS", // 生成代码的模板标准
  "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD/system模块中，即开启时应设置"module": "AMD",
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
  "allowJS": true, // 允许编译器编译JS，JSX文件
  "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
  "outDir": "./dist", // 指定输出目录
  "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
  "declaration": true, // 生成声明文件，开启后会自动生成声明文件
  "declarationDir": "./file", // 指定生成声明文件存放目录
  "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
  "sourceMap": true, // 生成目标文件的sourceMap文件
  "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
  "declarationMap": true, // 为声明文件生成sourceMap
  "typeRoots": [], // 声明文件目录，默认时node_modules/@types. 如果指定了此项，则只有在这里列出的声明文件才会被加载.
  "types": [], // 加载的声明文件包. 用于指定需要包含的模块，只有在这里列出的模块的声明文件才会被加载
  "removeComments":true, // 删除注释
  "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
  "noEmitOnError": true, // 发送错误时不输出任何文件
  "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
  "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
  "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
  "strict": true, // 开启所有严格的类型检查
  "alwaysStrict": true, // 在代码中注入'use strict'
  "noImplicitAny": true, // 不允许隐式的any类型
  "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
  "strictFunctionTypes": true, // 不允许函数参数双向协变
  "strictPropertyInitialization": true, // 类的实例属性必须初始化
  "strictBindCallApply": true, // 严格的bind/call/apply检查
  "noImplicitThis": true, // 不允许this有隐式的any类型
  "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
  "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
  "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
  "noImplicitReturns": true, //每个分支都会有返回值
  "esModuleInterop": true, // 允许export=导出，由import from 导入.  通过导入内容创建命名空间，实现CommonJS和ES模块之间的互操作性
  "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
  "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
  "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
  "paths": { // 路径映射，相对于baseUrl
    // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
  "listEmittedFiles": true, // 打印输出文件
  "listFiles": true// 打印编译的文件(包括引用的声明文件)
}

// 指定一个匹配列表（属于自动指定该路径下的所有ts相关文件）
"include": [
   "src/**/*"
],
// 指定一个排除列表（include的反向操作）
 "exclude": [
   "demo.ts"
],
// 指定哪些文件使用该配置（属于手动一个个指定文件）
 "files": [
   "demo.ts"
]
// extends可以通过指定一个其他的tsconfig.json文件路径，来继承这个配置文件里的配置，继承来的文件的配置会覆盖当前文件定义的配置
"extends":""
```

### namespace 命名空间

我们在工作中无法避免全局变量造成的污染，TypeScript 提供了 namespace 避免这个问题出现

-   内部模块，主要用于组织代码，避免命名冲突。
-   命名空间内的类默认私有
-   通过 export 暴露
-   通过 namespace 关键字定义

TypeScript 与 ECMAScript 2015 一样，任何包含顶级 import 或者 export 的文件都被当成一个模块。相反地，如果一个文件不带有顶级的 import 或者 export 声明，那么它的内容被视为全局可见的（因此对模块也是可见的）

-   不同文件可以声明相同的 namespace
-   同一个文件的命名空间会合并
-   嵌套的命名空间引入时可以 import alias = A.B.C

```jsx
// index.ts
export namespace A {
	export const b = 1

	export const a = 1
}

// index2.ts 需要重命名
import { A as B } from './index'
namespace A {
	export const a = 2
	export namespace B {
		export const d = 3
	}
}

console.log(A.a, B.b, B.a)
```

```jsx
// index.ts
import { A } from './index2'
export namespace C {
	export const b = 1
}

import E = A.B
console.log('打印***', E.d)
// index2.ts
export namespace A {
	export const a = 2
	export namespace B {
		export const d = 3
	}
}
// 编译后的文件
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6b77ee14-c65d-49f1-b721-f51032182619/Untitled.png)

### 三斜线指令 ///

-   `/// <reference path="..." />`指令是三斜线指令中最常见的一种。 它用于声明文件间的  *依赖*。三斜线引用告诉编译器在编译过程中要引入的额外的文件。

-   声明文件引入

例如，把 /// <reference types="node" />引入到声明文件，表明这个文件使用了 @types/node/index.d.ts 里面声明的名字； 并且，这个包需要在编译阶段与声明文件一起被包含进来。

仅当在你需要写一个 d.ts 文件时才使用这个指令。

```jsx
///<reference types="node" />
```

注意事项：如果你在配置文件 配置了 noResolve 或者自身调用自身文件会报错

### 声明文件 declare

当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。如果没有则需要声明

```jsx
declare var 声明全局变量
declare function 声明全局方法
declare class 声明全局类
declare enum 声明全局枚举类型
declare namespace 声明（含有子属性的）全局对象
interface 和 type 声明全局类型
/// <reference /> 三斜线指令
```

### 混入 Mixin

-   对象混入

    ```jsx
    interface Name {
    	name: string;
    }
    interface Age {
    	age: number;
    }
    interface Sex {
    	sex: number;
    }

    let people1: Name = { name: '小满' }
    let people2: Age = { age: 20 }
    let people3: Sex = { sex: 1 }

    const people = Object.assign(people1, people2, people3) // 拥有三个属性
    ```

-   类的混入

    ```jsx
    class A {
    	type: boolean = false
    	changeType() {
    		this.type = !this.type
    	}
    }

    class B {
    	name: string = '张三'
    	getName(): string {
    		return this.name
    	}
    }

    class C implements A, B {
    	type: boolean = false
    	name: string = 'fu'
    	changeType!: () => void
    	getName!: () => string
    }

    mixins(C, [A, B]) // 将A.B的属性方法 放到C上

    function mixins(curClass: any, itemClass: any[]) {
    	itemClass.forEach(item => {
    		// console.log(item) // class A  / class B
    		Object.getOwnPropertyNames(item.prototype).forEach(name => {
    			console.log(name) //constructor  changeType  constructor  getName
    			curClass.prototype[name] = item.prototype[name]
    		})
    	})
    }

    let c = new C()

    console.log(c) //{ type: false, name: 'fu', changeType: undefined, getName: undefined }
    ```

### 装饰器 Decorator

-   类装饰器 ClassDecorator
-   属性装饰器 PropertyDecorator
-   方法装饰器 MethodDecorator
-   参数装饰器 ParameterDecorator

```ts
// ======================= 可以给每个类添加方法或属性  =================
const watcher: ClassDecorator = (target: Function) => {
	console.log('打印***target', target) //打印***target [class A]
	target.prototype.getName = <T>(name: T): T => {
		return name
	}
}

@watcher // 可以添加方法属性进行装饰
class A {}
@watcher // 可以添加方法属性进行装饰
class B {}

let a = new A()
let b = new B()

console.log((<any>a).getName('A - 666'))
console.log((<any>a).getName('B - 666'))

// ======================= 修改成高阶函数  =================

// 改变成高阶函数 可以支持传递参数
const watcher = (name: string): ClassDecorator => {
	return function (target: Function) {
		console.log('打印***target', target) //打印***target [class A]
		target.prototype.getName = () => {
			return name
		}
	}
}

@watcher('A') // 可以添加方法属性进行装饰
class A {}

let a = new A()

console.log((<any>a).getName())

// ======================= 组合式添加多个装饰器  =================
const watcher = (name: string): ClassDecorator => {
	return function (target: Function) {
		console.log('打印***target', target) //打印***target [class A]
		target.prototype.getName = () => {
			return name
		}
	}
}

const log: ClassDecorator = (target: Function) => {
	target.prototype.a = 'log - a'
}

@log
@watcher('A')
class A {}

let a = new A()

console.log((<any>a).getName(), (a as any).a)

// ======================= 属性装饰器  =================

const log: PropertyDecorator = (...args) => {
	console.log('打印***', args) //[ {}, 'age', undefined ]
}

class A {
	name: string = 'jack'
	@log // 放在哪个上面就是哪个
	age: number = 18
}

let a = new A()

console.log((a as any).age)

// ======================= 方法装饰器  =================
const log: PropertyDecorator = (...args) => {
	console.log('打印***', args)
}

class A {
	age: number = 18

	@log /* [
					  {},
					  'getAge',
					  {
					    value: [Function: getAge],
					    writable: true,
					    enumerable: false,
					    configurable: true
					  }
					]*/
	getAge() {
		return 18
	}
}

let a = new A()

console.log((a as any).age)

// ======================= 参数装饰器  =================

const log: ParameterDecorator = (...args) => {
	console.log('打印***', args)
}

class A {
	age: number = 18
	/*
打印*** [ {}, 'getAge', 1 ]
打印*** [ {}, 'getAge', 0 ]
*/
	getAge(@log name: string, @log age: number) {
		return name
	}
}

let a = new A()

console.log((a as any).getAge('2839', 20))
```

### Ts 编写发布订阅

首先 需要定义三个角色 发布者 订阅者 调度者

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/31fa236b-1f0f-4396-bf70-e09642d72ed8/Untitled.png)

---

-   on 订阅/监听
-   emit 发布/注册
-   once 只执行一次
-   off 解除绑定

```ts
interface EventFace {
	on: (name: string, callback: Function) => void
	emit: (name: string, ...args: Array<any>) => void
	off: (name: string, fn: Function) => void
	once: (name: string, fn: Function) => void
}

interface List {
	[key: string]: Array<Function>
}

class Dispatch implements EventFace {
	list: List
	constructor() {
		this.list = {}
	}

	on(name: string, fn: Function) {
		const callback = this.list[name] || []
		callback.push(fn)
		this.list[name] = callback
		console.log(this.list)
	}
	emit(name: string, ...args: Array<any>) {
		let callbackList = this.list[name]
		if (callbackList) {
			callbackList.forEach(fn => {
				fn.apply(this, args)
			})
		} else {
			console.error(`名称错误${name}`)
		}
	}
	off(name: string, fn: Function) {
		let callbackList = this.list[name]
		if (fn && callbackList) {
			let index = callbackList.findIndex(fns => fns === fn)
			callbackList.splice(index, 1)
		} else {
			console.error('事件未监听')
		}
	}
	once(name: string, fn: Function) {
		// 临时函数只接受一次 调用后删除
		let decor = (...args: Array<any>) => {
			fn.apply(this, args)
			this.off(name, decor)
		}
		this.on(name, decor)
	}
}

const o = new Dispatch()

o.on('post', d => {
	console.log('打印**222d', d)
})

o.off('post', () => {})
o.emit('post', '666')

// o.once('post', 'once')
```

### TS 进阶 协变 逆变 双向协变

鸭子类型

什么是鸭子类型？ 一只鸟 走路像鸭子 ，游泳也像，做什么都像，那么这只鸟就可以成为鸭子类型。

-   协变

```ts
// 主类型
interface A {
	name: string
	age: number
}
// 子类型
interface B {
	name: string
	age: number
	sex: string
}

let a: A = {
	name: '老墨我想吃鱼了',
	age: 33
}

let b: B = {
	name: '老墨我不想吃鱼',
	age: 33,
	sex: '女'
}
// 协变
//b的类型比a的多 可以赋值
a = b
//a不可以被b赋值
b = a
```

-   逆变

```ts
// 主类型
interface A {
	name: string
	age: number
}
// 子类型
interface B {
	name: string
	age: number
	sex: string
}
let fna = (params: A) => {}
let fnb = (params: B) => {}
// 可以 因为最终执行fna 参数不会缺少
fnb = fna
```

-   双向协变 "strictFunctionTypes": true,

```ts
可以将上面的fna = fnb 不安全
```

### **_TS 进阶用法 Partial & Pick_**

**_Partial 可选_**

```jsx
/**
 * Make all properties in T optional
  将T中的所有属性设置为可选
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

-   keyof 是干什么的？
    -   keyof 我们讲过很多遍了 将一个接口对象的全部属性取出来变成联合类型
-   in 是干什么的？
    -   in 我们可以理解成 for in P 就是 key 遍历 keyof T 就是联合类型的每一项
-   ? 是将该属性变为可选属性
    -   ？这个操作就是将每一个属性变成可选项
-   T[P] 是干什么的？
    -   T[P] 索引访问操作符，与 JavaScript 种访问属性值的操作类似

**Pick**

从类型定义 T 的属性中，选取指定一组属性，返回一个新的类型定义

```ts
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
	[P in K]: T[P]
}
```

```jsx
type TPerson = {
	name: string
	age: number
	gender: string
}

type Part<T> = {
	[P in keyof T]?: T[P]
}

let p: Part<TPerson> = {
	name: 'jack'
}

type Pck<T, K extends keyof T> = {
	[P in K]: T[K]
}

let p1: Pck<TPerson, 'name' | 'age'> = { name: 'j', age: 18 }
```

**_TS 进阶用法 Record & Readonly_**

\***_Readonly:将所有属性变成只读_**

```jsx
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

```jsx
type Ro<T> = {
	readonly [P in keyof T]: T[P]
}

let p2: Ro<TPerson> = {
	name: 'j',
	age: 18,
	gender: '男'
}
p2.name = 1
```

Record
做到了约束 对象的 key 同时约束了 value

```jsx
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

1 keyof any 返回 string number symbol 的联合类型
2 in 我们可以理解成for in P 就是key 遍历 keyof any 就是string number symbol类型的每一项
3 extends来约束我们的类型
4 T 直接返回类型
```

```jsx
type TPerson = {
	name: string
	age: number
	gender: string
}
// string | number | symbol
type Recd<K extends keyof any, T> = {
	[P in K]: T
}
type K = 'name' | 'age' | 'gender'
// K 约束Key K 约束value
let p2: Recd<K, TPerson> = {
	name: { name: 'j', age: 18, gender: '男' },
	age: { name: 'j', age: 18, gender: '男' },
	gender: { name: 'j', age: 18, gender: '男' }
}
```

### Infer

infer 是[TypeScript](https://so.csdn.net/so/search?q=TypeScript&spm=1001.2101.3001.7020) 新增到的关键字 充当占位符

```jsx
// 定义一个类型 如果是数组类型 就返回 数组元素的类型 否则 就传入什么类型 就返回什么类型
// 正常写法
type TYPE<T> = T extends Array<any> ? T[number] : T
type A = TYPE<(string | number)[]>
// infer写法
// 就是将每一项类型进行占位
type TYPE<T> = T extends Array<infer U> ? U : T

// ========================================
// 例子2配合tuple 转换 union 联合类型
type TYPE<T> = T extends Array<infer U> ? U : never
type uni = [string, number]
type A = TYPE<uni>

type Arr = ['a', 'b', 'c']

// type First<T extends Array<any>> = T extends [infer one, infer two, infer last] ? one : []
type First<T extends Array<any>> = T extends [infer one, infer two, infer last] ? one : []
type Last<T extends Array<any>> = T extends [...any[], infer last] ? last : []
type Pop<T extends Array<any>> = T extends [...infer Rest, infer last] ? Rest : []
type Shift<T extends Array<any>> = T extends [infer one, ...infer Rest] ? Rest : []

type A = First<Arr> // 'a'
type B = Last<Arr> // 'c'
type C = Pop<Arr> // ['a','b']
type D = Shift<Arr> // ['b','c']
// ======================== 数组反转 递归
type Arr = [1, 2, 3, 4]

type Reverse<T extends any[]> = T extends [infer first, ...infer rest] ? [...Reverse<rest>, first] : T

type A = Reverse<Arr> // [4,3,2,1]
```

泛型的知识点

```tsx
const userInfo = {
	name: 'lin',
	age: '18'
}

function getValues(userInfo: any, keys: string[]) {
	return keys.map(key => userInfo[key])
}

console.log('打印***getVlaue', getValues(userInfo, ['name', 'age']))
console.log('打印***getVlaue', getValues(userInfo, ['sex', 'age'])) //[undefined,'18'] 不报错

//  4.  检查动态属性  K是联合类型 name|age  数组中不能定义其他值
function getVal<T, K extends keyof T>(userInfo: T, keys: K[]): T[K][] {
	return keys.map(key => userInfo[key])
}

console.log('打印***getVal', getVal(userInfo, ['name', 'age']))
console.log('打印***getVal', getVal(userInfo, ['sex', 'age'])) //[undefined,'18'] 不报错

//    type tx = 'name'|'age'
//    const arr:tx[]=['name','age','name','age']

interface IPerson {
	name: string
	age: number
}
// 1.keyof（索引查询）  获取所有的键 返回联合类型 变成字符串字面量
type Test = keyof IPerson
//    console.log('打印***Test',Test)
let a: Test = 'name'
a = 'age'
//    2.T[K] 索引访问  定义类型
let type1: IPerson['name']

// 3.extends 约束泛型 T extends U
interface ILength {
	length: number
}

function printLength<T extends ILength>(arg: T) {
	console.log(arg.length)
	return arg
}

// 5.映射类型 in 用来对联合类型的遍历
type P = 'name' | 'age' | 'major'
type Obj = {
	[x in P]: string //=== name:string age:string major:string
}
const obj: Obj = {
	name: '2',
	age: '2',
	major: 'x'
}

// 6.partial  所有属性映射为可选的
interface Part1 {
	name: string
	age: number
}
let p1: Part1 = {
	name: '1',
	age: 12
}
type IPart = Partial<Part1>

let p3: IPart = {
	age: 12
}
// 简写
let p2: Partial<Part1> = {
	name: '1'
}

// 底层
// type Partial<T> = {
//     [p in keyof T]?:T[p]
// }

// 7.readonly a将所有属性变成只读
type IReadOnly = Readonly<IPerson>

let p4: IReadOnly = {
	name: '12',
	age: 2
}
// p4.name = '12'

// 底层
// type Readonly<T> = {
//     readonly [p in keyof T]:T[p]
// }

// 8.Pick 抽取对象子集 成为新的类型

interface PPerson {
	name: string
	age: number
	sex: string
}
type IPick = Pick<PPerson, 'name' | 'age'>

let p8: IPick = {
	name: '1',
	age: 12
}

// 底层
// type Pick<T,K extends keyof T> ={
//     [p in K]:T[p]
// }

// 9. Record 创建同态的类型
type IRecord = Record<string, IPerson>

let p9: IRecord = {
	a1: {
		name: 'a',
		age: 12
	},
	a2: {
		name: 'b',
		age: 1
	}
}
// 底层
// type Record<K extends keyof any,T> = {
//     [p in K]: T
// }

// 10.条件类型 T extends U ? X : Y    Exclude 和 Extract
// 11. Exclude<T,U> 返回联合类型T中不包含U的部分
type ETest = Exclude<'a' | 'b' | 'c', 'a'>

let a11: ETest = 'b'
// type Exclude<T,U> = T extends U ? never:T

// 12.Extract Extract<T,U> 提取交集
type EXTest = Extract<'a' | 'b', 'a' | 'c'>
let a12: EXTest = 'a'

//  type Extract<T,U> = T extends U ? T:never

//12 Required 与partial相反
```

### 工具类型 Utility Types

```tsx
interface IPerson {
	name: string
	age: number
}
// 1.Omit<T,U> 剔除T 中所有U的属性
type IOmit = Omit<IPerson, 'age'>

let p1: IOmit = {
	name: '1'
}
//   type Omit<T,K extends keyof any> = {
//     Pick<T, Exclude<keyof T, K>>
// }

// 2.NonNullable 过滤类型中null和undefined类型
type T0 = NonNullable<string | number | null | undefined>
let a2: T0 = null
// type NonNullable<T> = T extends null | undefined ? never : T

// 3. Parameters 获取函数的参数类型 将每个参数类型放入元组中
type T1 = Parameters<() => string> // []
type T2 = Parameters<(arg: string) => void> // [arg:string]
type T3 = Parameters<(arg1: string, arg2: number) => void> //[arg1:string,arg2:number]

let x1: T1 = []
let x2: T2 = ['arg']
let x3: T3 = ['arg1', 123]

// 4. ReturnType 获取函数的返回值类型
type F0 = ReturnType<() => string> //string

// 类型体操

// 1文件声明 declare 相当于先声明 其他地方存在直接用

// 2 .d.ts 声明文件
declare var val1: string
declare function func(x: number): string
declare class Person {
	public name: string
	private age: number
	constructor(name, age)
	getAge(): number
}
// 使用
class Person {
	public name
	private age
	constructor(name, age) {
		this.name = name
		this.age = age
	}
	getAge() {
		return this.age
	}
}
let p = new Person('jack', 23)
console.log('打印***p.name', p.name)
console.log('打印***p.age', p.getAge())

// 3 namespace?
declare namespace $ {
	let version: number
	function ajax(set?: any): void
}

// 使用
$.version = 123
```

### 接口 interface

```tsx
// 描述一个对象的类型 不能重复声明
type myType = {
	name: string
	age: number
	[propName: string]: any
}

const obj: myType = {
	name: 'xxx',
	age: 12,
	x: 12
}
/**
 * 接口用来定义一个类结构  用来定义类中包含哪些属性方法   限制类的结构
 * 接口也可以当作类型声明使用
 * 可以重复声明  相当于合并
 */
interface myInterface {
	name: string
	age: number
}
interface myInterface {
	gender: string
}
const obj1: myInterface = {
	name: 'xxx',
	age: 12,
	gender: 'nan'
}
/**
 * 定义类时 可以使用类实现一个接口
 *
 */
interface myInter {
	name: string
	sayHello(): void
}
class MyClass implements myInter {
	name: string
	constructor(name: string) {
		this.name = name
	}
	sayHello(): void {
		console.log(123)
	}
}
//接口可以实现类型的含义
```

```tsx
//接口约定class
interface Music {
	playMusic(): void
}

// 都有Music功能
class Car implements Music {
	playMusic() {}
}

class CellPhone implements Music {
	playMusic() {}
}
// 约束静态函数 和构造函数
interface CircleStatic {
	new (radius: number): void
	pi: number
}
const Circle: CircleStatic = class Circle {
	static pi: 3.14
	public radius: number
	public constructor(radius: number) {
		this.radius = radius
	}
}
```

### 属性的封装

```tsx
// 属性封装
class Person {
	/**
	 * 属性修饰符 public 公共 可以在任意位置修改
	 * private  私有属性 只能在类的内部进行修改  子类也不能读取
	 * protected  只能在当前类和子类中使用
	 */
	private _name: string
	private _age: number
	constructor(name: string, age: number) {
		this._name = name
		this._age = age
	}
	// 获取内部_name的属性  可以间接的通过方法获取
	// 通过这种方式 属性的读写 可控
	/**
	 *
	 * getter setter 存取器
	 */
	getName() {
		return this._name
	}
	setName(value: string) {
		this._name = value
	}

	/**
	 * ts中提供便利方法
	 * per.name 会读取name的属性 会自动调用
	 *
	 */
	get name() {
		console.log('get name调用了')

		return this._name
	}
	set name(value: string) {
		this._name = value
	}

	getAge() {
		return this._age
	}
	setAge(value: number) {
		if (value >= 0) {
			this._age = value
		}
	}
}

const per = new Person('123', 18)
console.log(per)
// per._name='999'
// console.log(per._name);

// per._age=98
// console.log(per._age);

console.log(per.getName())
per.setName('孙悟空')
// console.log(per._name);
per.setAge(123)
console.log(per.getAge())
console.log(per.name)
per.name = '猪八戒'

class A {
	//如果设置成private 子类不能读取
	protected name: string
	constructor(name: string) {
		this.name = name
	}
}
class B extends A {
	getName() {
		return this.name
	}
	setName(value: string) {
		this.name = value
	}
}
const b = new B('xxx')
console.log(b.getName())
b.setName('fu')
console.log(b.getName())
/**
 * 简化方式
 */
class C {
	name: string
	age: number
	constructor(name: string, age: number) {
		this.name = name
		this.age = age
	}
}
class D {
	constructor(public name: string, public age: number) {}
}

const d = new D('fu', 100)
console.log(d)
```

never 定义 如何定义所有字符串类型中 一个是 string 的

类型缩减

```tsx
type A =
	| { age: number }
	| {
			// age: never
			[key: string]: string
	  }

let obj: A = {
	age: 1,
	ff: 'nasfdio'
}
```

```tsx
//返回值
function func(): string | number {
	if (true) {
		return 1
	} else {
		return 'a'
	}
}
// 默认返回空
function func1(): void {
	console.log(123)
}
// 什么都不返回 只报错
function func2(): never {
	throw new Error('报错了')
}
```

## 4.面向对象

接口定义的方式

```tsx
//四不像duck typing
interface FuncWithProps {
	(x: number): number
	foName: string
}

const fun: FuncWithProps = (x: number): number => {
	return x
}
fun.foName = '123'

//类数组
interface likeArray {
	[propName: number]: string
}
const arr: likeArray = ['123', '213123', '3123']
arr.push(12)
console.log('打印***arr', arr)
```

## 高级类型一

### type 和 interface 的区别

```ts
* 相同点
 *      都可以定义一个对象或函数
 *      都允许继承
 * 不同点
 *      接口是对对象描述
 *      type是类型别名可以给各种类型定义
 *      type可以声明基本类型 联合类型 交叉类型 元组 接口不可以
 *      interface可以重复声明 type不行
 */

interface Person {
    name:string
    age:number
}

const per:Person = {
    name:'1',
    age:12
}

type Persont = {
    name:string
    age:number
}

const per2:Persont = {
    name:'tt',
    age:22
}

//定义函数
interface addI {
    (x:number,y:number):number
}

type addT = (x:number,y:number)=>number

// 继承
// type inherit type
type Studentt = Persont & { grader:number }

// interface inherit Type
interface StudentI extends Persont {
    grader:number
}

// type inherit interface
type stt = Person & { grader:number }

// interface inherit interface
interface siI extends Person{
    grader:number
}

const s2:siI={
    name:'123',
    age:12,
    grader:12
}
```

应用 ：使用枚举作为对象的键

[ key in keyof typeof enum]: list
