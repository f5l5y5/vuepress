const expect = require('chai').expect
import {
    EpsonPrinter,
    HPprinter,
    AcrylicInk,
    AlcoholInk
} from '../tmp'

describe('桥接模式 es6测试', () => {
    it('爱普生打印机', () => {
        const printer = new EpsonPrinter(new AlcoholInk())
        const result = printer.print()

        expect(result).to.equal("Printer: Epson, Ink: alcohol-based")
    })
    it('惠普打印机', () => {
        const printer = new HPprinter(new AcrylicInk())
        const result = printer.print()

        expect(result).to.equal("Printer: HP, Ink: acrylic-based")
    })
})