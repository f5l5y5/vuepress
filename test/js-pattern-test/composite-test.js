const expect = require('chai').expect
const [EquipmentComposition, FloppyDisk, HardDrive, Memory] = require('../tmp')

describe('组合模式 测试', () => {
  it('设备添加硬件 获取总价', () => {
    var cabinet = new EquipmentComposition("cabinet")
    cabinet.add(new FloppyDisk())
    cabinet.add(new HardDrive())
    cabinet.add(new Memory())

    expect(cabinet.getPrice()).to.equal(600)

  })

})