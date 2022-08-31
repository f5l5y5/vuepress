const expect = require('chai').expect
import {
    Cabinet,
    FloppyDisk,
    HardDrive,
    Memory
} from '../tmp'

describe('组合模式 es6测试', () => {
    it('设备添加硬件 获取总价', () => {
      var cabinet = new Cabinet("cabinet")
      cabinet.add(new FloppyDisk())
      cabinet.add(new HardDrive())
      cabinet.add(new Memory())
  
      expect(cabinet.getPrice()).to.equal(600)
  
    })
  
  })