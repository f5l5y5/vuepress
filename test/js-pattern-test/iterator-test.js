const expect = require('chai').expect
const Iterator = require('../tmp')

describe('迭代器模式 测试', () => {
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