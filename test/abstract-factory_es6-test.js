const expect = require('chai').expect;
import droidProducer6 from '../tmp';

describe('抽象工厂es6 测试', () => {
    it('战斗机器人 es6', () => {
        const battleDroid = droidProducer6('battle')();
        expect(battleDroid.info()).to.equal('B1, Battle Droid');
    });

    it('飞行机器人 es6', () => {
        const pilotDroid = droidProducer6('pilot')();
        expect(pilotDroid.info()).to.equal('Rx24, Pilot Droid');
    });

});
