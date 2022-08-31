const expect = require('chai').expect
const colorFactory = require('../tmp')

describe('享元模式 测试', () => {
  it('重复颜色', () => {
    colorFactory.create('RED')
    colorFactory.create('RED')
    colorFactory.create('RED')
    colorFactory.create('YELLOW')
    colorFactory.create('YELLOW')

    expect(Object.keys(colorFactory.colors)).to.have.lengthOf(2)
  })

})