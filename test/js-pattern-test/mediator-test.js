const expect = require('chai').expect
const [TrafficTower, Airplane] = require('../tmp')

describe('中介者模式 测试', () => {
  it('塔台', () => {
    var trafficTower = new TrafficTower()
    var boeing1 = new Airplane(10, trafficTower)
    var boeing2 = new Airplane(15, trafficTower)
    var boeing3 = new Airplane(55, trafficTower)
    expect(boeing1.requestPositions()).to.deep.equals([10, 15, 55])
  })
})
