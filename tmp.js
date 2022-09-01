//定义一个访问者类  内部改变元素类的执行方法 奖励访问者 员工
function bonusVisitor(employee) {
    if (employee instanceof Manager) {
        employee.bonus = employee.salary * 2
    }
    if (employee instanceof Developer) {
        employee.bonus = employee.salary
    }
}
//在数据基础类里面有一个方法接受访问者，将自身引用传入访问者。
class Employee {
    constructor(salary) {
        this.bonus = 0
        this.salary = salary
    }
    accept(visitor) {
        visitor(this)
    }
}
// 被访问者
class Manager extends Employee {
    constructor(salary) {
        super(salary)
    }
}

class Developer extends Employee {
    constructor(salary) {
        super(salary)
    }
}


export { Developer, Manager, bonusVisitor }