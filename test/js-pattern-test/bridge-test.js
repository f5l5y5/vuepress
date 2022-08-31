const expect = require('chai').expect
const [EpsonPrinter, HPprinter, acrylicInk, alcoholInk] = require('../tmp')

describe('桥接模式测试', () => {
  it('爱普生打印机', () => {
    const printer = new EpsonPrinter(alcoholInk)
    const result = printer.print()

    expect(result).to.equal("Printer: Epson, Ink: alcohol-based")
  })
  it('惠普打印机', () => {
    const printer = new HPprinter(acrylicInk)
    const result = printer.print()

    expect(result).to.equal("Printer: HP, Ink: acrylic-based")
  })
})