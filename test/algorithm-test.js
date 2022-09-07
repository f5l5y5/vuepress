fs = require('fs')
const path = require('path')
const dir = path.resolve(__dirname, './')
let files = fs.readdirSync(dir)
console.log(files);
let len = files.filter(f => /^\d+\..+\.js$/.test(f)).length
console.log('打印***一共刷了' + len + '题')