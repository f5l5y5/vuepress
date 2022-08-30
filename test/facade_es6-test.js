const expect = require('chai').expect
import ShopFacade from '../tmp'

describe('外观模式 es6测试', () => {
  it('购物', () => {
    const shop = new ShopFacade()
    const result = shop.calc(100)

    expect(result).to.equal(99.5)

  })
})