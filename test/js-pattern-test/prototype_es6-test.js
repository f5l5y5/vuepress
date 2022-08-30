const expect = require('chai').expect;
import Sheep from '../tmp'

describe('原型模式 es6测试', () => {
    it('sheep', () => {
        var sheep = new Sheep('dolly', 10.3);
        var dolly = sheep.clone()

        expect(dolly.name).to.equal('dolly');
        expect(dolly.weight).to.equal(10.3);
        expect(dolly).to.be.instanceOf(Sheep);
        expect(dolly === sheep).to.be.false
    });
});