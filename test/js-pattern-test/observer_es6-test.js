const expect = require('chai').expect
import { Product, Fees, Proft } from '../tmp'
/**
 * @describe 注册变量 
 * @param {*} p 商品
 * @param {*} f 费用
 * @param {*} t 
 * @returns 
 */
function register(p, f, t) {
  p.register(f)
  p.register(t)
  return p
}

describe('观察者模式 es6测试', () => {
  it('订阅者触发', () => {
    let product = register(new Product(), new Fees(), new Proft())
    product.setBasePrice(100)
    expect(product.price).to.equal(240)
  })
  it('取消一个订阅', () => {
    let product = register(new Product(), new Fees(), new Proft())
    product.unregister(Proft)

    product.setBasePrice(100)
    expect(product.price).to.equal(120)
  })

})