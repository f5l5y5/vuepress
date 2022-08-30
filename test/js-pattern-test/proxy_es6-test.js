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