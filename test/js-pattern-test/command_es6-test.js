const expect = require('chai').expect
import { Cockpit, Turbine, OffCommand, OnCommand, SpeedDownCommand, SpeedUpCommand } from '../tmp'

describe('命令模式 es6测试', () => {
    it('开/关 测试', () => {
        //receiver 创建命令的具体对象 涡轮  真正命令执行的对象
        var turbine = new Turbine()
        //invoker 调用者 使用命令对象入口
        const onCommand = new OnCommand(turbine)
        //command 驾驶舱 
        const cockpit = new Cockpit(onCommand)
        cockpit.execute()
        expect(turbine.state).to.be.true
    })
    it('加减速 测试', () => {
        //先开启后加速
        var turbine = new Turbine()
        const onCommand = new OnCommand(turbine);
        var cockpit = new Cockpit(onCommand);
        cockpit.execute();

        const speedUpCommand = new SpeedUpCommand(turbine)
        cockpit = new Cockpit(speedUpCommand)
        cockpit.execute()
        expect(turbine.speed).to.equal(200)
    })

})