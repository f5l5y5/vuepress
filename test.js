
function backtrack(list, temp, nums) {
    /*
放进去一个元素
执行递归公式
撤回这个元素
 */
    // 1.终止条件
    if (temp.length === nums.length) {
        return list.push([...temp])
    }

    for (let i = 0; i < nums.length; i++) {
        //找到一个不在temp中的值
        if (temp.includes(nums[i])) {
            continue
        }
        //push数组中
        temp.push(nums[i])
        backtrack(list, temp, nums)
        temp.pop()
    }




    // 2.递归公式
}

var permute = function (nums) {
    let list = []
    backtrack(list, [], nums)
    return list
};

permute([0,1])