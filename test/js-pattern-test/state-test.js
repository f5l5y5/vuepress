const expect = require('chai').expect
const Order = require('../tmp')

describe('状态模式 测试', () => {
  it('订单', () => {
    var order = new Order()
    expect(order.state.name).to.equal('waitingForPayment')
    order.nextState()
    expect(order.state.name).to.equal('shipping')
    order.nextState()
    expect(order.state.name).to.equal('delivered')
  })

})