const expect = require('chai').expect;
import { Soldier, Jedi, JediAdapter } from '../tmp'


describe('适配器 es6测试', () => {
    it('攻击', () => {
        var stormrooper = new Soldier(1)
        var yoda = new JediAdapter(new Jedi(10))
        expect(yoda.attack()).to.equal(stormrooper.attack() * 1000);
    });
});