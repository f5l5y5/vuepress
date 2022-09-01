const expect = require('chai').expect
const [ShoppingCart, guestStrategy, regularStrategy, premiumStrategy] = require('../tmp')

describe('策略模式 测试', () => {
  it('客人购物折扣', () => {
    var guestCart = new ShoppingCart(guestStrategy)
    guestCart.setAmount(100)
    expect(guestCart.checkout()).to.equal(100)
  })
  it('常规折扣', () => {
    var guestCart = new ShoppingCart(regularStrategy)
    guestCart.setAmount(100)
    expect(guestCart.checkout()).to.equal(90)
  })
  it('赠品折扣', () => {
    var guestCart = new ShoppingCart(premiumStrategy)
    guestCart.setAmount(100)
    expect(guestCart.checkout()).to.equal(80)
  })

})