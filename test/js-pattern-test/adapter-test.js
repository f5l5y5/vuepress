const expect = require('chai').expect;
const [Soldier, Jedi, JediAdapter] = require('../tmp')

describe('适配器 测试', () => {
    it('攻击', () => {
        var stormrooper = new Soldier(1)
        var yoda = new JediAdapter(new Jedi(10))
        expect(yoda.attack()).to.equal(stormrooper.attack()*1000);
    });
});