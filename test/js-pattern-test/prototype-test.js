const expect = require('chai').expect;
const Sheep = require('../tmp')

describe('原型模式 测试', () => {
    it('sheep', () => {
        var sheep = new Sheep('dolly', 10.3);
        var dolly = sheep.clone()
        expect(dolly.name).to.equal('dolly');
    });
});