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