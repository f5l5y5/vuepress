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

### 1.4 建造者模式(builder)
- 将一个复杂的对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。

```js
//对象构建
function Request() {
    this.url = ''
    this.method = ''
    this.payload = ''
}
//每个不同的表示 return this 支持链式调用
function RequestBuilder() {
    this.request = new Request()
    this.forUrl = function (url) {
        this.request.url = url
        return this
    }
    this.useMethod = function (method) {
        this.request.method = method
        return this
    }
    this.payload = function (payload) {
        this.request.payload = payload
        return this
    }
    this.build = function () {
        return this.request
    }
}
module.exports = RequestBuilder
```

```js
const expect = require('chai').expect;
const RequestBuilder = require('../tmp');

describe('建造者模式测试', () => {
    it('构建行为分离 method', () => {
        var requestBuilder = new RequestBuilder();
        var request = requestBuilder
            .forUrl('http://something/users')
            .useMethod('GET')
            .payload(null)
            .build()

        expect(request.method).to.equal('GET');
    });
});
```

es6实现

```js
class Request {
    constructor() {
        this.url = ''
        this.method = ''
        this.payload = ''
    }
}
class RequestBuilder {
    constructor() {
        this.request = new Request()
    }
    forUrl(url) {
        this.request.url = url
        return this
    }
    useMethod(method) {
        this.request.method = method
        return this
    }
    payload(payload) {
        this.request.payload = payload
        return this
    }
    build() {
        return this.request
    }
}
export default RequestBuilder
```
```js
const expect = require('chai').expect;
import RequestBuilder from '../tmp'

describe('建造者模式 es6测试', () => {
    it('构建行为分离 es6', () => {
        const requestBuilder = new RequestBuilder();
        const url = 'http://something/users';
        const method = 'GET';
        const request = requestBuilder
            .forUrl(url)
            .useMethod(method)
            .payload(null)
            .build();

        expect(request.method).to.equal(method);
        expect(request.payload).to.be.null;
        expect(request.url).to.equal(url);
    });
});
```

### 1.5 原型模式(prototype)
- 用原型实例指定创建对象的种类，并通过拷贝这些原型创建新的对象。
```js
function Sheep(name, weight) {
    this.name = name
    this.weight = weight
}

Sheep.prototype.clone = function () {
    return new Sheep(this.name, this.weight)
}

module.exports = Sheep
```

```js
const expect = require('chai').expect;
const Sheep = require('../tmp')

describe('原型模式 测试', () => {
    it('sheep', () => {
        var sheep = new Sheep('dolly', 10.3);
        var dolly = sheep.clone()
        expect(dolly.name).to.equal('dolly');
    });
});
```

es6实现

```js
class Sheep {
    constructor(name, weight) {
        this.name = name
        this.weight = weight
    }
    clone() {
        return new Sheep(this.name, this.weight)
    }
}

export default Sheep
```
```js
const expect = require('chai').expect;
import Sheep from '../tmp'

describe('原型模式 es6测试', () => {
    it('sheep', () => {
        var sheep = new Sheep('dolly', 10.3);
        var dolly = sheep.clone()

        expect(dolly.name).to.equal('dolly');
        expect(dolly.weight).to.equal(10.3);
        expect(dolly).to.be.instanceOf(Sheep);
        expect(dolly === sheep).to.be.false
    });
});
```

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