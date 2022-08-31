const expect = require('chai').expect
import { colorFactory } from '../tmp'

describe('享元模式 es6测试', () => {
    it('重复颜色', () => {
        const cf = new colorFactory()
        cf.create('RED')
        cf.create('RED')
        cf.create('YELLOW')
        cf.create('YELLOW')

        expect(Object.keys(cf.colors)).to.have.lengthOf(2)
    })

})