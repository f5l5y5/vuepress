class Cockpit {
    constructor(command) {
        this.command = command
    }
    execute() {
        this.command.execute()
    }
}

class Turbine {
    constructor() {
        this.state = false
        this.speed = 0
    }
    on() {
        this.state = true
        this.speed = 100
    }
    off() {
        this.state = false
        this.speed = 0
    }
    speedDown() {
        if (!this.state) return
        this.speed -= 100
    }
    speedUp() {
        if (!this.state) return
        this.speed += 100
    }
}

class OnCommand {
    constructor(turbine) {
        this.turbine = turbine
    }
    execute() {
        this.turbine.on()
    }
}
class OffCommand {
    constructor(turbine) {
        this.turbine = turbine
    }
    execute() {
        this.turbine.off()
    }
}
class SpeedUpCommand {
    constructor(turbine) {
        this.turbine = turbine
    }
    execute() {
        this.turbine.speedUp()
    }
}
class SpeedDownCommand {
    constructor(turbine) {
        this.turbine = turbine
    }
    execute() {
        this.turbine.speedDown()
    }
}


export { Cockpit, Turbine, OffCommand, OnCommand, SpeedDownCommand, SpeedUpCommand }
