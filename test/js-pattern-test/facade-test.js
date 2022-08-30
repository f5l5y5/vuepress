const expect = require('chai').expect
const shopFacade = require('../tmp')

describe('外观模式测试', () => {
  it('购物', () => {
    var result = shopFacade.calc(100)

    expect(result).to.equal(99.5)
    
  })
})