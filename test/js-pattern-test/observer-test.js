const expect = require('chai').expect
const [Product, fees, proft] = require('../tmp')
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

describe('观察者模式 测试', () => {
  it('订阅者触发', () => {
    let product = register(new Product(), fees, proft)
    product.setBasePrice(100)
    expect(product.price).to.equal(240)
  })
  it('取消一个订阅',()=>{
    let product = register(new Product(),fees,proft)
    product.unregister(proft)

    product.setBasePrice(100)
    expect(product.price).to.equal(120)
  })

})