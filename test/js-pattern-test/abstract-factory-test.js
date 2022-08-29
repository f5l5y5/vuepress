const expect = require('chai').expect;
const droidProducer = require('../tmp');


describe("抽象工厂测试", () => {
    it("战斗机器人", () => {
        const battleDroid = droidProducer('battle')()
        expect(battleDroid.info()).to.equal('B1,Battle Droid')
    })
    it("飞行机器人", () => {
        const pilotDroid = droidProducer('pilot')()
        expect(pilotDroid.info()).to.equal('Rx24,Pilot Droid')
    })
})