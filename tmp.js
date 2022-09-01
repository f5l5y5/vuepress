// 一个行为随着状态改变而改变的context对象
class Order {
    constructor() {
        this.state = new WaitingForPayment()
    }
    nextState() {
        this.state = this.state.next()
    }
}

// 抽象类
class OrderStatus {
    constructor(name, nextStatus) {
        this.name = name
        this.nextStatus = nextStatus
    }
    next() {
        return new this.nextStatus()
    }
}



//创建各种状态的对象
class WaitingForPayment extends OrderStatus {
    constructor() {
        super('waitingForPayment', Shipping)
    }

}
class Shipping extends OrderStatus {
    constructor() {
        super('shipping', Delivered)
    }

}
class Delivered extends OrderStatus {
    constructor() {
        super('delivered', Delivered)
    }
}

export { Order }