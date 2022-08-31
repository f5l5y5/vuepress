const expect = require('chai').expect
const [originator, Caretaker] = require('../tmp')

describe('备忘录模式 测试', () => {
  it('看门的', () => {
    var careTaker = new Caretaker()
    careTaker.addMemento(originator.store('hello'))
    careTaker.addMemento(originator.store('hello world'))
    careTaker.addMemento(originator.store('hello world !!!'))
    var result = originator.restore(careTaker.getMemento(1))
    expect(result).to.equal("hello world")
  })

})



