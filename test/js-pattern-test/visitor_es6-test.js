const expect = require('chai').expect
import { Developer, Manager, bonusVisitor } from '../tmp'

describe('访问者模式 es6测试', () => {
  it('奖金', () => {
    //流程 就是定义一个基础类 Employee 定义奖金和accept方法 
    //-> 被访问者继承基础类 自身有薪水 
    //-> 访问者通过 被访问者传入的信息，判断对应的奖金 
    let employees = [];

    const john = new Developer(4000);
    const maria = new Developer(4000);
    const christian = new Manager(10000);

    employees.push(john);
    employees.push(maria);
    employees.push(christian);

    employees.forEach(e => {
      e.accept(bonusVisitor);
    });

    expect(john.bonus).to.equal(4000);
    expect(christian.bonus).to.equal(20000);
  })

})