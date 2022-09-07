const expect = require('chai').expect
// const [] = require('../tmp')
// import { } from '../tmp'


describe('模式 测试', () => {
  it('数量', () => {
    const fs = require('fs')
    const path = require('path')
    const dir = path.reslove(__dirname,'./')
    let files = fs.readdirSync(dir)
    console.log(files);



    //  expect(files).to.equal(2)
  })

})