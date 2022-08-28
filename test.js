/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var moveZeroes = function(nums) {
    //先不移动0 最后将后面的数修改为0
    let fast = 0
    let slow = 0
    while(fast<nums.length){
        if(nums[fast]){
            let tmp = nums[slow]
            nums[slow] = nums[fast]
            nums[fast] = tmp
            slow++
        }
        fast++
    }
};
const arr = [1,2,2,2]
moveZeroes(arr)