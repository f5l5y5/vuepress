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