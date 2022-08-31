const expect = require('chai').expect
import {Iterator}  from '../tmp'

describe('迭代器模式 es6测试', () => {
  it('遍历', () => {
    test(Iterator)
  })

})

function test(Iterator) {
  var numbers = new Iterator([1, 2, 3])
  expect(numbers.next()).to.equal(1);
  expect(numbers.next()).to.equal(2);
  expect(numbers.next()).to.equal(3);
  expect(numbers.hasNext()).to.false;
}