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