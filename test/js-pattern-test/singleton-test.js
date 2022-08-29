const expect = require('chai').expect;
const Person = require('../tmp');

describe('单例模式测试', () => {
    it('单个实例', () => {
        var john = new Person();
        var john2 = new Person();

        expect(john).to.equal(john2);
    });
});