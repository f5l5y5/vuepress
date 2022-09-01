const expect = require('chai').expect
const [Tax1, Tax2] = require('../tmp')

describe('模板模式 测试', () => {
  it('税', () => {
    var tax1 = new Tax1()
    var tax2 = new Tax2()

    expect(tax1.calc(1000)).to.equal(1110)
    expect(tax2.calc(1000)).to.equal(1210)
    expect(tax2.calc(100)).to.equal(110)
  })
})