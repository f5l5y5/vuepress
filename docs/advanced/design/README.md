# 设计模式
[git参考地址](https://github.com/fbeline/design-patterns-JS)

## 1.创建型模式(5)
### 1.1 工厂模式(factory)
- 定义一个创建对象的接口，让子类决定具体实例化哪一个对象。
```js
function Bmw(model, price, maxSpeed) {
    this.model = model
    this.price = price
    this.maxSpeed = maxSpeed
}
function bmwFactory(type) {
    if (type === 'x5') {
        return new Bmw(type, 108000, 300)
    }
    if (type === 'x6') {
        return new Bmw(type, 111000, 320)
    }
}
```
测试用例
```js
const expect = require('chai').expect
const bmwFactory = require('../tmp')

describe('工厂模式测试', () => {
  it('宝马', () => {
    var x5 = bmwFactory('x5')
    var x6 = bmwFactory('x6')

    expect(x5.price).to.equal(108000)
    expect(x6.price).to.equal(111000)
    expect(x5.maxSpeed).to.equal(300)
    expect(x6.maxSpeed).to.equal(320)
  })
})
```
es6 写法
```js
class Bmw {
    constructor(model, price, maxSpeed) {
        this.model = model
        this.price = price
        this.maxSpeed = maxSpeed
    }
}

class BmwFactory {
    static create(type) {
        if (type === 'x5') {
            return new Bmw(type, 108000, 300)
        }
        if (type === 'x6') {
            return new Bmw(type, 111000, 320)
        }
    }
}

export default BmwFactory
```
测试用例
```js
import BmwFactory from '../tmp'
const expect = require('chai').expect

describe('工厂模式 es6 测试', () => {
    it('创建X5的实例', () => {
        const x5 = BmwFactory.create('X5')
        expect(x5.model).to.equal('X5')
    })
    it('X5价格设置', () => {
        const x5 = BmwFactory.create('X5')
        expect(x5.price).to.equal(108000)
    })
})
```


### 1.2 抽象工厂(abstract-factory)
- 定义了一个接口用于创建相关或有依赖关系的对象族，而无需明确指定具体类。
  - 解决了工厂方法模式的问题：在抽象工厂中只需要传入参数就可以实例化不同类型的工厂对象。
```js
//机器人工厂
function droidProducer(kind) {
    if (kind === 'battle') return battleDroidFactory
    return pilotDroidFactory
}

function battleDroidFactory() {
    return new B1()
}

function pilotDroidFactory() {
    return new Rx24()
}

function B1() { }
B1.prototype.info = function () {
    return "B1,Battle Droid"
}

function Rx24() { }
Rx24.prototype.info = function () {
    return "Rx24,Pilot Droid"
}

module.exports = droidProducer
```
测试用例
```js
const expect = require('chai').expect;
const droidProducer = require('../tmp');


describe("抽象工厂测试", () => {
    it("战斗机器人", () => {
        const battleDroid = droidProducer('battle')()
        expect(battleDroid.info()).to.equal('B1,Battle Droid')
    })
    it("飞行机器人", () => {
        const pilotDroid = droidProducer('pilot')()
        expect(pilotDroid.info()).to.equal('Rx24,Pilot Droid')
    })
})
```

es6实现
```js
function droidProducer(kind) {
    if (kind === 'battle') return battleDroidFactory;
    return pilotDroidFactory;
}

function battleDroidFactory() {
    return new B1();
}

function pilotDroidFactory() {
    return new Rx24();
}

class B1 {
    info() {
        return "B1, Battle Droid"
    }
}

class Rx24 {
    info() {
        return "Rx24, Pilot Droid";
    }
}

export default droidProducer;
```
```js
const expect = require('chai').expect;
import droidProducer6 from '../tmp';

describe('抽象工厂es6 测试', () => {
    it('战斗机器人 es6', () => {
        const battleDroid = droidProducer6('battle')();
        expect(battleDroid.info()).to.equal('B1, Battle Droid');
    });

    it('飞行机器人 es6', () => {
        const pilotDroid = droidProducer6('pilot')();
        expect(pilotDroid.info()).to.equal('Rx24, Pilot Droid');
    });

});

```

### 1.3 单例模式(singleton)
- 确保一个类最多只有一个实例，并提供一个全局访问点 (预加载 懒加载？)
```js
function Person() {
    if (typeof Person.instance === 'object') return Person.instance

    Person.instance = this
    return this
}

module.exports = Person
```
测试用例
```js
const expect = require('chai').expect;
const Person = require('../tmp');

describe('单例模式测试', () => {
    it('单个实例', () => {
        var john = new Person();
        var john2 = new Person();

        expect(john).to.equal(john2);
    });
});
```

es6实现
```js
class Person {
    constructor() {
        if (typeof Person.instance === 'object') {
            return Person.instance
        }
        Person.instance = this
        return this
    }
}

export default Person
```

```js
const expect = require('chai').expect;
import Person from '../tmp'

describe('单例模式测试 es6', () => {
    it('单个实例 es6', () => {
        var john = new Person();
        var john2 = new Person();

        expect(john).to.equal(john2);
        expect(john===john2).to.be.true
    });
});
```

### 1.4 建造者模式
### 1.5 原型模式


## 2.结构型模式(7)
### 2.1
### 2.2
### 2.3
### 2.4
### 2.5
### 2.6
### 2.7


## 3.行为型模式(11)

### 3.1
### 3.2
### 3.3
### 3.4
### 3.5
### 3.6
### 3.7
### 3.8
### 3.9
### 3.10
### 3.11