const expect = require('chai').expect
import { Tax1, Tax2 } from '../tmp'

describe('模板模式 es6测试', () => {
  it('税', () => {
    const tax1 = new Tax1()
    const tax2 = new Tax2()

    expect(tax1.calc(1000)).to.equal(1110)
    expect(tax2.calc(1000)).to.equal(1210)
    expect(tax2.calc(100)).to.equal(110)
  })
})