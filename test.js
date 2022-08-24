let obj = new Map()
obj.set(2,4)
obj.set(3,3)
obj.set(4,1)

for(let o of obj.keys()){
    if(obj.get(o)===1){
        console.log(o);
    }
}

console.log('打印***1',1)







