# 设计模式
[git参考地址](https://github.com/fbeline/design-patterns-JS)

## 1.创建型模式(creational 5)
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

## 2.结构型模式(structural 7)
### 2.1 适配器模式(adapter)
- 将一个类的接口转换成客户希望的另外一个接口。Adapter模式使得原本由于接口不兼容而不能一起工作的那些类可以在一起工作。

```js
function Soldier(lvl) {
    this.lvl = lvl
}
//士兵攻击1
Soldier.prototype.attack = function () {
    return this.lvl * 1
}

function Jedi(lvl) {
    this.lvl = lvl
}
//用剑100
Jedi.prototype.attackWithSaber = function () {
    return this.lvl * 100
}

// 创建适配器 传入不同的对象 攻击不同 
// 需要将Jedi的attackWithSaber 适配成 attack
function JediAdapter(jedi) {
    this.jedi = jedi
}

JediAdapter.prototype.attack = function () {
    return this.jedi.attackWithSaber()
}

module.exports = [Soldier, Jedi, JediAdapter]
```
```js
const expect = require('chai').expect;
const [Soldier, Jedi, JediAdapter] = require('../tmp')

describe('适配器 测试', () => {
    it('攻击', () => {
        var stormrooper = new Soldier(1)
        var yoda = new JediAdapter(new Jedi(10))
        expect(yoda.attack()).to.equal(stormrooper.attack()*1000);
    });
});
```

es6实现
```js
class Soldier {
    constructor(level) {
        this.level = level
    }

    attack() {
        return this.level * 1
    }
}

class Jedi {
    constructor(level) {
        this.level = level
    }

    attackWithSaber() {
        return this.level * 100
    }
}

class JediAdapter {
    constructor(jedi) {
        this.jedi = jedi
    }

    attack() {
        return this.jedi.attackWithSaber()
    }
}
export {
    Soldier,
    Jedi,
    JediAdapter
}
```

```js
const expect = require('chai').expect;
import { Soldier, Jedi, JediAdapter } from '../tmp'


describe('适配器 es6测试', () => {
    it('攻击', () => {
        var stormrooper = new Soldier(1)
        var yoda = new JediAdapter(new Jedi(10))
        expect(yoda.attack()).to.equal(stormrooper.attack() * 1000);
    });
});
```


### 2.2 装饰者模式(decorator)
- 动态给一个对象添加一些额外的职责,就象在墙上刷油漆.使用Decorator模式相比用生成子类方式达到功能的扩充显得更为灵活。
- 设计初衷:通常可以使用继承来实现功能的拓展,如果这些需要拓展的功能的种类很繁多,那么势必生成很多子类,增加系统的复杂性,同时,使用继承实现功能拓展,我们必须可预见这些拓展功能,这些功能是编译时就确定了,是静态的。
```js
// 意大利面价格
function Pasta() {
    this.price = 0
}
Pasta.prototype.getPrice = function () {
    return this.price
}
// 意面
function Penne() {
    this.price = 8
}
Penne.prototype = Object.create(Pasta.prototype)

//调味汁
function SauceDecorator(pasta) {
    this.pasta = pasta
}
SauceDecorator.prototype.getPrice = function () {
    return this.pasta.getPrice() + 5
}

//奶酪
function CheeseDecorator(pasta) {
    this.pasta = pasta
}
CheeseDecorator.prototype.getPrice = function () {
    return this.pasta.getPrice() + 3
}

module.exports = [Penne, SauceDecorator, CheeseDecorator]
```

```js
const expect = require('chai').expect;
const [Penne, SauceDecorator, CheeseDecorator] = require('../tmp');

describe('装饰模式测试', () => {
    it('装饰', () => {
        //每次new 添加新的装饰
        var penne = new Penne()
        var penneWithSauce = new SauceDecorator(penne)
        var panneWithSauceAndCheese = new CheeseDecorator(penneWithSauce)

        expect(penne.getPrice()).to.equal(8);
        expect(penneWithSauce.getPrice()).to.equal(13)
        expect(panneWithSauceAndCheese.getPrice()).to.equal(16)
    });
});
```
es6实现
```js
class Pasta {
    constructor() {
        this.price = 0
    }
    getPrice() {
        return this.price
    }
}

class Penne extends Pasta {
    constructor() {
        super()
        this.price = 8
    }
}

class PastaDecorator extends Pasta {
    constructor(pasta) {
        super()
        this.pasta = pasta
    }
    getPrice() {
        return this.pasta.getPrice()
    }
}

class SauceDecorator extends PastaDecorator {
    constructor(pasta) {
        super(pasta)
    }
    getPrice() {
        return super.getPrice() + 5
    }
}

class CheeseDecorator extends PastaDecorator {
    constructor(pasta) {
        super(pasta)
    }
    getPrice() {
        return super.getPrice() + 3
    }
}

export {
    Penne,
    SauceDecorator,
    CheeseDecorator
}
```

```js
const expect = require('chai').expect;
import { Penne, SauceDecorator, CheeseDecorator } from '../tmp'


describe('装饰模式 es6测试', () => {
    it('装饰', () => {
        //每次new 添加新的装饰
        var penne = new Penne()
        var penneWithSauce = new SauceDecorator(penne)
        var panneWithSauceAndCheese = new CheeseDecorator(penneWithSauce)

        expect(penne.getPrice()).to.equal(8);
        expect(penneWithSauce.getPrice()).to.equal(13)
        expect(panneWithSauceAndCheese.getPrice()).to.equal(16)
    });
});
```
### 2.3 代理模式(proxy)
- 对一些对象提供代理，以限制那些对象去访问其它对象。
```js
function Car() {
    this.drive = function () {
        return "driving"
    }
}

function CarProxy(driver) {
    this.driver = driver
    this.drive = function () {
        if (driver.age < 18)
            return "too young to drive"
        return new Car().drive()
    }
}

function Driver(age) {
    this.age = age
}

module.exports = [Car, CarProxy, Driver]
```

```js
const expect = require('chai').expect
const [Car, CarProxy, Driver] = require('../tmp')

describe('代理模式测试', () => {
  it('驾驶', () => {
    var driver = new Driver(20)
    var kid = new Driver(16)

    var car = new CarProxy(driver)     
    expect(car.drive()).to.equal('driving')

    car = new CarProxy(kid)
    expect(car.drive()).to.equal('too young to drive')
    
  })
})
```
es6实现
```js
class Car {
    drive() {
        return "driving"
    }
}

class CarProxy {
    constructor(driver) {
        this.driver = driver
    }
    drive() {
        return (this.driver.age < 18) ? "too young to drive" : new Car().drive()
    }
}

class Driver {
    constructor(age) {
        this.age = age
    }
}

export {
    Car,
    CarProxy,
    Driver
}
```

```js
const expect = require('chai').expect
import { Car, CarProxy, Driver } from '../tmp'

describe('代理模式 es6测试', () => {
  it('驾驶', () => {
    let driver = new Driver(28);
    let kid = new Driver(10);

    let car = new CarProxy(driver);
    expect(car.drive()).to.equal('driving');

    car = new CarProxy(kid);
    expect(car.drive()).to.equal('too young to drive');

  })
})
```
### 2.4 外观模式(facade)
- 设置一个门面,处理各种事务
```js
var shopFacade = {
    calc:function(price){
        price = discount(price)
        price = fees(price)
        price += shipping()
        return price
    }
}
function discount(value){
    return value * 0.9
}
function shipping(value){
    return 5
}
function fees(value){
    return value * 1.05
}
module.exports = shopFacade
```

```js
const expect = require('chai').expect
const shopFacade = require('../tmp')

describe('外观模式测试', () => {
  it('购物', () => {
    var result = shopFacade.calc(100)

    expect(result).to.equal(99.5)
    
  })
})
```
es6实现
```js
class ShopFacade {
    constructor(price) {
        this.discount = new Discount()
        this.shipping = new Shipping()
        this.fees = new Fees()
    }
    calc(price) {
        price = this.discount.calc(price)
        price = this.fees.calc(price)
        price += this.shipping.calc()
        return price
    }
}

class Discount {
    calc(value) {
        return value * 0.9
    }
}

class Shipping {
    calc() {
        return 5
    }
}
class Fees {
    calc(value) {
        return value * 1.05
    }
}
export default ShopFacade
```

```js
const expect = require('chai').expect
import ShopFacade from '../tmp'

describe('外观模式 es6测试', () => {
  it('购物', () => {
    const shop = new ShopFacade()
    const result = shop.calc(100)

    expect(result).to.equal(99.5)

  })
})
```
### 2.5 桥接模式(bridge)
- 通过组合的方式建立两个类之间的联系,而不是继承。将抽 象和实现解耦，让它们可以独立变化。
```js
// 将基础什么材料生产的进行说明
function EpsonPrinter(ink){
    this.ink = ink()
}
EpsonPrinter.prototype.print = function(){
    return "Printer: Epson, Ink: " + this.ink
}

function HPprinter(ink){
    this.ink = ink()
}
HPprinter.prototype.print = function(){
    return "Printer: HP, Ink: " + this.ink
}
// 基于丙烯酸
function acrylicInk(){
    return "acrylic-based"
}
//基于活性炭
function alcoholInk(){
    return "alcohol-based"
}

module.exports = [EpsonPrinter, HPprinter, acrylicInk, alcoholInk]

```

```js
const expect = require('chai').expect
const [EpsonPrinter, HPprinter, acrylicInk, alcoholInk] = require('../tmp')

describe('桥接模式测试', () => {
  it('爱普生打印机', () => {
    const printer = new EpsonPrinter(alcoholInk)
    const result = printer.print()

    expect(result).to.equal("Printer: Epson, Ink: alcohol-based")
  })
  it('惠普打印机', () => {
    const printer = new HPprinter(acrylicInk)
    const result = printer.print()

    expect(result).to.equal("Printer: HP, Ink: acrylic-based")
  })
})
```
es6实现
```js
class Printer {
    constructor(ink) {
        this.ink = ink
    }
}

class EpsonPrinter extends Printer {
    constructor(ink) {
        super(ink)
    }
    print() {
        return "Printer: Epson, Ink: " + this.ink.get();
    }
}

class HPprinter extends Printer {
    constructor(ink) {
        super(ink)
    }
    print() {
        return "Printer: HP, Ink: " + this.ink.get();
    }
}

class Ink {
    constructor(type) {
        this.type = type
    }
    get() {
        return this.type
    }
}

class AcrylicInk extends Ink {
    constructor() {
        super("acrylic-based")
    }
}
class AlcoholInk extends Ink {
    constructor() {
        super("alcohol-based")
    }
}

export {
    EpsonPrinter,
    HPprinter,
    AcrylicInk,
    AlcoholInk
}
```

```js
const expect = require('chai').expect
import {
    EpsonPrinter,
    HPprinter,
    AcrylicInk,
    AlcoholInk
} from '../tmp'

describe('桥接模式 es6测试', () => {
    it('爱普生打印机', () => {
        const printer = new EpsonPrinter(new AlcoholInk())
        const result = printer.print()

        expect(result).to.equal("Printer: Epson, Ink: alcohol-based")
    })
    it('惠普打印机', () => {
        const printer = new HPprinter(new AcrylicInk())
        const result = printer.print()

        expect(result).to.equal("Printer: HP, Ink: acrylic-based")
    })
})
```
### 2.6 组合模式(composite)
- 将对象组合成树形结构以表示‘部分-整体’的层次结构。组合模式使得用户对单个对象和组合对象的使用具有一致性。
- 例如 办了一张永辉超市充值卡 它可以在任何门店进行消费 组合抽象类-leaf-composite
```js
//组合抽象类
function EquipmentComposition(name) {
    this.equipments = []
    this.name = name
}

EquipmentComposition.prototype.add = function (equipment) {
    this.equipments.push(equipment)
}

EquipmentComposition.prototype.getPrice = function () {
    return this.equipments.map(function (equipment) {
        return equipment.getPrice()
    }).reduce(function (a, b) {
        return a + b
    })
}

// 设备
function Equipment() { }
Equipment.prototype.getPrice = function () {
    return this.price
}

// --leaf 
//软盘
function FloppyDisk() {
    this.name = 'Floppy Disk'
    this.price = 70
}
FloppyDisk.prototype = Object.create(Equipment.prototype)

//硬盘
function HardDrive() {
    this.name = "Hard Drive"
    this.price = 250
}
HardDrive.prototype = Object.create(Equipment.prototype)
//内存
function Memory() {
    this.name = '8gb memory'
    this.price = 280
}
Memory.prototype = Object.create(Equipment.prototype)

module.exports = [EquipmentComposition, FloppyDisk, HardDrive, Memory]
```

```js
const expect = require('chai').expect
const [EquipmentComposition, FloppyDisk, HardDrive, Memory] = require('../tmp')

describe('组合模式 测试', () => {
  it('机箱添加硬件 获取总价', () => {
    var cabinet = new EquipmentComposition("cabinet")
    cabinet.add(new FloppyDisk())
    cabinet.add(new HardDrive())
    cabinet.add(new Memory())

    expect(cabinet.getPrice()).to.equal(600)

  })

})
```
es6实现
```js
//组合抽象类
class Equipment {
    getPrice() {
        return this.price || 0
    }
    getName() {
        return this.name
    }
    setName(name) {
        this.name = name
    }
}

// composite
class Composite extends Equipment {
    constructor() {
        super()
        this.equipments = []
    }
    add(equipment) {
        this.equipments.push(equipment)
    }
    getPrice() {
        return this.equipments.map(equipment => {
            return equipment.getPrice();
        }).reduce((a, b) => {
            return a + b;
        });
    }

}

class Cabinet extends Composite{
    constructor(){
        super()
        this.setName('cabinet')
    }
}

// --leaf
class FloppyDisk extends Equipment{
    constructor(){
        super()
        this.setName('Floppy Disk')
        this.price = 70
    }
}

class HardDrive extends Equipment {
    constructor(){
        super()
        this.setName('Hard Drive')
        this.price = 250
    }
}

class Memory extends Equipment{
    constructor(){
        super()
        this.setName('Memory')
        this.price = 280
    }
}
export { Cabinet,FloppyDisk,HardDrive,Memory }
```

```js
const expect = require('chai').expect
import {
    Cabinet,
    FloppyDisk,
    HardDrive,
    Memory
} from '../tmp'

describe('组合模式 es6测试', () => {
    it('设备添加硬件 获取总价', () => {
      var cabinet = new Cabinet("cabinet")
      cabinet.add(new FloppyDisk())
      cabinet.add(new HardDrive())
      cabinet.add(new Memory())
  
      expect(cabinet.getPrice()).to.equal(600)
  
    })
  
  })
```
### 2.7 享元模式(flyweight)
- 一个系统中如果有多个相同的对象，那么只共享一份就可以了，不必每个都去实例化一个对象。
  - 比如说一个文本系统，每个字母定一个对象，那么大小写字母一共就是52个，那么就要定义52个对象。如果有一个1M的文本，那么字母是何其的多，如果每个字母都定义一个对象那么内存早就爆了。那么如果要是每个字母都共享一个对象，那么就大大节约了资源。
```js
function Color(name){
    this.name = name
}
//使用对象池存放内部的状态对象，如果存在直接返回没有则创建
var colorFactory = {
    colors:{},
    create:function(name){
        var color = this.colors[name]
        if(color) return color
        this.colors[name] = new Color(name)
        return this.colors[name]
    }
}
module.exports = colorFactory
```

```js
const expect = require('chai').expect
const colorFactory = require('../tmp')

describe('享元模式 测试', () => {
  it('重复颜色', () => {
    colorFactory.create('RED')
    colorFactory.create('RED')
    colorFactory.create('RED')
    colorFactory.create('YELLOW')
    colorFactory.create('YELLOW')

    expect(Object.keys(colorFactory.colors)).to.have.lengthOf(2)
  })

})
```
es6实现
```js
class Color {
    constructor(name) {
        this.name = name
    }
}

class colorFactory {
    constructor(name) {
        this.colors = {}
    }
    create(name) {
        let color = this.colors[name]
        if (color) return color
        this.colors[name] = new Color(name)
        return this.colors[name]
    }
}

export { colorFactory }

```

```js
const expect = require('chai').expect
import { colorFactory } from '../tmp'

describe('享元模式 es6测试', () => {
    it('重复颜色', () => {
        const cf = new colorFactory()
        cf.create('RED')
        cf.create('RED')
        cf.create('YELLOW')
        cf.create('YELLOW')

        expect(Object.keys(cf.colors)).to.have.lengthOf(2)
    })

})
```

## 3.行为型模式(behavioral 11)

### 3.1 责任链模式(chain-of-resp)
- 使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系，将这个对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理他为止。
```js
//购物车 商品 添加商品
function ShoppingCart() {
    this.products = []

    this.addProduct = function (p) {
        this.products.push(p)
    }
}
//折扣计算 看是否满足特定的折扣 形成链n->p->none 执行起始的exec 知道有返回
function Discount() {
    this.calc = function (products) {
        var ndiscount = new NumberDiscount()
        var pdiscount = new PriceDiscount()
        var none = new NoneDiscount()

        ndiscount.setNext(pdiscount)
        pdiscount.setNext(none)

        return ndiscount.exec(products)
    }
}

function NumberDiscount() {
    this.next = null
    this.setNext = function (fn) {
        this.next = fn
    }
    this.exec = function (products) {
        var result = 0
        if (products.length > 3) result = 0.05

        return result += this.next.exec(products)
    }
}

function PriceDiscount() {
    this.next = null
    this.setNext = function (fn) {
        this.next = fn
    }
    this.exec = function (products) {
        var result = 0
        var total = products.reduce(function (a, b) {
            return a + b
        })
        if (total >= 500) {
            result = 0.1
        }
        return result + this.next.exec(products)
    }
}

function NoneDiscount() {
    this.exec = function () {
        return 0
    }
}

module.exports = [ShoppingCart, Discount]
```

```js
const expect = require('chai').expect
const [ShoppingCart, Discount] = require('../tmp')

describe('责任链模式 测试', () => {
  it('购物车金额 > $500', () => {
    const discount = new Discount()
    const sc = new ShoppingCart()
    sc.addProduct(1000)
    let resp = discount.calc(sc.products)

    expect(resp).to.equal(0.1)
  })
  it('大于三个商品', () => {
    const discount = new Discount()
    const sc = new ShoppingCart()
    sc.addProduct(100)
    sc.addProduct(100)
    sc.addProduct(100)
    sc.addProduct(100)
    let resp = discount.calc(sc.products)
    expect(resp).to.equal(0.05)
  })
  it('大于三个商品并且 >$500', () => {
    const discount = new Discount()
    const sc = new ShoppingCart()
    sc.addProduct(1000)
    sc.addProduct(100)
    sc.addProduct(100)
    sc.addProduct(100)
    let resp = discount.calc(sc.products)
    expect(resp.toFixed(2)).to.equal('0.15')
  })

})
```
es6实现
```js
class ShoppingCart {
    constructor() {
        this.products = []
    }

    addProduct(p) {
        this.products.push(p)
    }
}

class Discount {
    calc(products) {
        let ndiscount = new NumberDiscount();
        let pdiscount = new PriceDiscount();
        let none = new NoneDiscount();
        ndiscount.setNext(pdiscount);
        pdiscount.setNext(none);
        return ndiscount.exec(products);
    }
}

class NumberDiscount {

    constructor() {
        this.next = null;
    }

    setNext(fn) {
        this.next = fn;
    };

    exec(products) {
        let result = 0;
        if (products.length > 3)
            result = 0.05;

        return result + this.next.exec(products);
    };
}

class PriceDiscount {

    constructor() {
        this.next = null;
    }

    setNext(fn) {
        this.next = fn;
    };

    exec(products) {
        let result = 0;
        let total = products.reduce((a, b) => a + b);

        if (total >= 500)
            result = 0.1;

        return result + this.next.exec(products);
    };
}

class NoneDiscount {
    exec() {
        return 0;
    };
}

export {
    ShoppingCart,
    Discount
};
```

```js
const expect = require('chai').expect
import { ShoppingCart, Discount } from '../tmp'

describe('责任链模式 es6测试', () => {
  it('购物车金额 > $500', () => {
    const discount = new Discount()
    const sc = new ShoppingCart()
    sc.addProduct(1000)
    let resp = discount.calc(sc.products)

    expect(resp).to.equal(0.1)
  })
  it('大于三个商品', () => {
    const discount = new Discount()
    const sc = new ShoppingCart()
    sc.addProduct(100)
    sc.addProduct(100)
    sc.addProduct(100)
    sc.addProduct(100)
    let resp = discount.calc(sc.products)
    expect(resp).to.equal(0.05)
  })
  it('大于三个商品并且 >$500', () => {
    const discount = new Discount()
    const sc = new ShoppingCart()
    sc.addProduct(1000)
    sc.addProduct(100)
    sc.addProduct(100)
    sc.addProduct(100)
    let resp = discount.calc(sc.products)
    expect(resp.toFixed(2)).to.equal('0.15')
  })

})
```

### 3.2 命令模式(command)
- 将来自客户端的请求传入一个对象，从而使你可用不同的请求对客户进行参数化。用于“行为请求者”与“行为实现者”解耦，可实现二者之间的松耦合，以便适应变化。分离变化与不变的因素。
- 请求以命令的形式包裹在对象中，并传给调用对象。调用对象寻找可以处理该命令的合适的对象，并把该命令传给相应的对象，该对象执行命令。
- 定义三个角色
  - Command 定义命令的接口，声明执行的方法。
    - ConcreteCommand  命令接口实现对象，是“虚”的实现；通常会持有接收者，并调用接收者的功能来完成命令要执行的操作。
  - Receiver 接收者，真正执行命令的对象。
  - Invoker 使用对象命令的入口 调用者
    - Client 创建具体的命令对象，并且设置命令对象的接收者。
**整体流程** 定义三个角色,command属于驾驶舱 receiver属于涡轮 invoker调用实际命令的入口；先创建具体的receiver 将receiver传入到invoker调用者,最后command调用invoker处理对应的命令 执行,具体的状态receiver会发生变化
```js
//驾驶舱 接受命令 执行命令 command
function Cockpit(command) {
    this.command = command
}
Cockpit.prototype.execute = function () {
    this.command.execute()
}

//涡轮  操作有开 关 加速 减速 receiver 命令真正执行的对象
function Turbine() {
    this.state = false
    this.speed = 0
}
Turbine.prototype.on = function () {
    this.state = true
    this.speed = 100
}
Turbine.prototype.off = function () {
    this.state = false
    this.speed = 0
}
Turbine.prototype.speedDown = function () {
    if (!this.state) return
    this.speed -= 100
}
Turbine.prototype.speedUp = function () {
    if (!this.state) return
    this.speed += 100
}
//命令 操作开命令 调用turbine实例的开 
// invoker 使用命令对象的入口
function OnCommand(turbine) {
    this.turbine = turbine
}
OnCommand.prototype.execute = function () {
    this.turbine.on()
}

function OffCommand(turbine) {
    this.turbine = turbine
}
OffCommand.prototype.execute = function () {
    this.turbine.off()
}

function SpeedUpCommand(turbine) {
    this.turbine = turbine
}
SpeedUpCommand.prototype.execute = function () {
    this.turbine.speedUp()
}

function SpeedDownCommand(turbine) {
    this.turbine = turbine
}
SpeedDownCommand.prototype.execute = function () {
    this.turbine.speedDown()
}

module.exports = [Cockpit, Turbine, OffCommand, OnCommand, SpeedDownCommand, SpeedUpCommand]

```

```js
const expect = require('chai').expect
const [Cockpit, Turbine, OffCommand, OnCommand, SpeedDownCommand, SpeedUpCommand] = require('../tmp')

describe('命令模式 测试', () => {
  it('开/关 测试', () => {
    //receiver 创建命令的具体对象 涡轮  真正命令执行的对象
    var turbine = new Turbine()
    //invoker 调用者 使用命令对象入口
    const onCommand = new OnCommand(turbine)
    //command 驾驶舱 
    const cockpit = new Cockpit(onCommand)
    cockpit.execute()
    expect(turbine.state).to.be.true
  })
  it('加减速 测试', () => {
    //先开启后加速
    var turbine = new Turbine()
    const onCommand = new OnCommand(turbine);
    var cockpit = new Cockpit(onCommand);
    cockpit.execute();

    const speedUpCommand = new SpeedUpCommand(turbine)
    cockpit = new Cockpit(speedUpCommand)
    cockpit.execute()
    expect(turbine.speed).to.equal(200)
  })

})
```
es6实现
```js
class Cockpit {
    constructor(command) {
        this.command = command
    }
    execute() {
        this.command.execute()
    }
}

class Turbine {
    constructor() {
        this.state = false
        this.speed = 0
    }
    on() {
        this.state = true
        this.speed = 100
    }
    off() {
        this.state = false
        this.speed = 0
    }
    speedDown() {
        if (!this.state) return
        this.speed -= 100
    }
    speedUp() {
        if (!this.state) return
        this.speed += 100
    }
}

class OnCommand {
    constructor(turbine) {
        this.turbine = turbine
    }
    execute() {
        this.turbine.on()
    }
}
class OffCommand {
    constructor(turbine) {
        this.turbine = turbine
    }
    execute() {
        this.turbine.off()
    }
}
class SpeedUpCommand {
    constructor(turbine) {
        this.turbine = turbine
    }
    execute() {
        this.turbine.speedUp()
    }
}
class SpeedDownCommand {
    constructor(turbine) {
        this.turbine = turbine
    }
    execute() {
        this.turbine.speedDown()
    }
}


export { Cockpit, Turbine, OffCommand, OnCommand, SpeedDownCommand, SpeedUpCommand }
```

```js
const expect = require('chai').expect
import { Cockpit, Turbine, OffCommand, OnCommand, SpeedDownCommand, SpeedUpCommand } from '../tmp'

describe('命令模式 es6测试', () => {
    it('开/关 测试', () => {
        //receiver 创建命令的具体对象 涡轮  真正命令执行的对象
        var turbine = new Turbine()
        //invoker 调用者 使用命令对象入口
        const onCommand = new OnCommand(turbine)
        //command 驾驶舱 
        const cockpit = new Cockpit(onCommand)
        cockpit.execute()
        expect(turbine.state).to.be.true
    })
    it('加减速 测试', () => {
        //先开启后加速
        var turbine = new Turbine()
        const onCommand = new OnCommand(turbine);
        var cockpit = new Cockpit(onCommand);
        cockpit.execute();

        const speedUpCommand = new SpeedUpCommand(turbine)
        cockpit = new Cockpit(speedUpCommand)
        cockpit.execute()
        expect(turbine.speed).to.equal(200)
    })

})
```

### 3.3 解释器模式(interpreter)
- 给定一个语言，定义它的文法表示，并定义一个解释器，这个解释器使用该标识来解释语言中的句子。
```js
function Sum(left, right) {
    this.left = left
    this.right = right
}
Sum.prototype.interpret = function () {
    return this.left.interpret() + this.right.interpret()
}

function Min(left, right) {
    this.left = left
    this.right = right
}

Min.prototype.interpret = function () {
    return this.left.interpret() - this.right.interpret()
}

function Num(val) {
    this.val = val
}
Num.prototype.interpret = function () {
    return this.val
}

module.exports = [Num, Min, Sum]
```

```js
const expect = require('chai').expect
const [Num, Min, Sum] = require('../tmp')

describe('解释器模式 测试', () => {
  it('加', () => {
    var result = new Sum(new Num(100), new Min(new Num(100), new Num(50)))

    expect(result.interpret()).to.equal(150)
  })

})
```
es6实现
```js
class Sum {
    constructor(left, right) {
        this.left = left
        this.right = right
    }
    interpret() {
        return this.left.interpret() + this.right.interpret()
    }
}
class Min {
    constructor(left, right) {
        this.left = left
        this.right = right
    }
    interpret() {
        return this.left.interpret() - this.right.interpret()
    }
}
class Num {
    constructor(val) {
        this.val = val
    }
    interpret() {
        return this.val
    }
}

export { Num, Min, Sum }
```

```js
const expect = require('chai').expect
import {Num, Min, Sum} from '../tmp'

describe('解释器模式 es6测试', () => {
  it('加', () => {
    var result = new Sum(new Num(100), new Min(new Num(100), new Num(50)))

    expect(result.interpret()).to.equal(150)
  })

})
```

### 3.4 迭代器模式(iterator)
- 
```js

```

```js

```
es6实现
```js

```

```js

```

### 3.5 中介者模式(mediator)
- 
```js

```

```js

```
es6实现
```js

```

```js

```

### 3.6 备忘录模式(memento)
- 
```js

```

```js

```
es6实现
```js

```

```js

```

### 3.7 观察者模式(observer)
- 
```js

```

```js

```
es6实现
```js

```

```js

```

### 3.8 状态模式(state)
- 
```js

```

```js

```
es6实现
```js

```

```js

```

### 3.9 策略模式(strategy)
- 
```js

```

```js

```
es6实现
```js

```

```js

```

### 3.10 模板方法模式(template)
- 
```js

```

```js

```
es6实现
```js

```

```js

```

### 3.11 访问者模式(visitor)
- 
```js

```

```js

```
es6实现
```js

```

```js

```
