/**
 * @param {number[]} nums
 * @return {number}
 */
 var lengthOfLIS = function(nums) {
	 let n = nums.length
	 if(n===0){
		 return 0
	 }
 
	 let dp = Array(n).fill(1)
	 for(let i=0;i<n;i++){
		 for(j=0;j<i;j++){
			 if(nums[i]>nums[j]){
				 dp[i] = Math.max(dp[i],dp[j]+1)
			 }
		 }
	 }
	 return Math.max(...dp)
 };
 const nums = [0,1,0,3,2,3]
 lengthOfLIS(nums)

// [1,1,1,1,1,1]
//判断1>0 是dp[1] = dp[1],dp[0]+1 [1,2,1,1,1,1]
//i=2 [1,2,1,1,1,1]
//i=3 [1,2,1,3,1,1]
//i=4 => 1,2,1,3,2,1 => 1,2,1,3,3,1
//i=5 => 1,2,1,3,2,1 => 1,2,1,3,3,1




 	// [0,1,0,3,2,3]
	//选择极值用dp
	// dp[i] 在i的位置以前的数组 最长递增子序列的长度
	// 例如 刚开始是1个数[1,1,1,1,1,1]
	// 第二个数 nums[i]>nums[i-1] [1,2,1,1,1,1] 
	// 第三个数 比之前的小  [1,2,2,1,1,1] 
	// 第四个数 比之前的大  [1,2,2,3,1,1] 
	// 第五个数 比之前的小  [1,2,2,3,3,1] 
	// 第六个数 比之前的大  [1,2,2,3,3,4] 