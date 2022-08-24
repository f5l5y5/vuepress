let cache = new Map()
cache.set('1', 1)
cache.set('2', 2)
cache.set('3', 3)
// 生成器的代码
console.log(cache.values().next());
console.log(cache.keys().next());
