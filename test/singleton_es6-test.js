const expect = require('chai').expect;
import Person from '../tmp'

describe('单例模式测试 es6', () => {
    it('单个实例 es6', () => {
        var john = new Person();
        var john2 = new Person();

        expect(john).to.equal(john2);
        expect(john===john2).to.be.true
    });
});