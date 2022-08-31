const expect = require('chai').expect
import {Num, Min, Sum} from '../tmp'

describe('解释器模式 es6测试', () => {
  it('加', () => {
    var result = new Sum(new Num(100), new Min(new Num(100), new Num(50)))

    expect(result.interpret()).to.equal(150)
  })

})