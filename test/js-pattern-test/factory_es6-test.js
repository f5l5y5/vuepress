import BmwFactory from '../tmp'
const expect = require('chai').expect

describe('工厂模式 es6 测试', () => {
    it('创建X5的实例', () => {
        const x5 = BmwFactory.create('X5')
        expect(x5.model).to.equal('X5')
    })
    it('X5价格设置', () => {
        const x5 = BmwFactory.create('X5')
        expect(x5.price).to.equal(108000)
    })
})