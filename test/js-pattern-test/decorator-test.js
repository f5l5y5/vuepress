const expect = require('chai').expect;
const [Penne, SauceDecorator, CheeseDecorator] = require('../tmp');

describe('装饰模式测试', () => {
    it('装饰', () => {
        //每次new 添加新的装饰
        var penne = new Penne()
        var penneWithSauce = new SauceDecorator(penne)
        var panneWithSauceAndCheese = new CheeseDecorator(penneWithSauce)

        expect(penne.getPrice()).to.equal(8);
        expect(penneWithSauce.getPrice()).to.equal(13)
        expect(panneWithSauceAndCheese.getPrice()).to.equal(16)
    });
});