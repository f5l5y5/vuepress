const expect = require('chai').expect
import { ShoppingCart, guestStrategy, regularStrategy, premiumStrategy } from '../tmp'

describe('策略模式 es6测试', () => {
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