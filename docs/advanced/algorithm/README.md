## 1.为什么学算法

- vue 和 react 的虚拟 dom 就是两棵树的 diff
- react16 的 fiber 架构 就是把树变成了链表
- jsx 解析 用的是栈
- 缓存模块用的是链表
- vue3 的虚拟 dom diff，使用的是最长递增子序列
- KeepAlive使用了LRUcache进行缓存

## 2.了解算法的复杂度

### 2.1 leetCode-1 两数之和

```javascript
// 第一种解法： 时间复杂度O(n^2)  空间复杂度O(1)
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i !== j && nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
}
// 第二种解法 空间换时间  时间复杂度 O(n) 空间复杂度O(n)
var twoSum = function (nums, target) {
  //1.定义一个对象 用于存放每个nums与target的差值及索引
  let obj = {}
  for (let i = 0; i < nums.length; i++) {
    //2.查看每个数与目标数之间的差距
    let num = nums[i]
    let n = target - num
    //如果当前的数值与为之前数值的差值，直接返回
    if (num in obj) {
      return [i, obj[num]]
    } else {
      //如果不存在,插入对象中,建立nums每个数 对应的差值值与索引的对象
      obj[n] = i
    }
  }
}
```
## 3.链表与数组
数据结构的增删改查
[1,2,3,4,5]
随机访问 arr[0] 时间复杂度是O(1)

1=> 2=> 3=> 4=> 5
访问时间复杂度 O(n)
删除和插入 都是 O(1)

### 3.1 实现简单链表

```javascript
class Node {
    constructor(val) {
        this.val = val
        this.next = null
    }
}

class LinkNodeList {
    constructor() {
        this.head = null
        this.length = 0
    }
    append(val) {
        let node = new Node(val)
        let p = this.head
        if (this.head) {

            //找到链表的最后一个节点，next属性设置为node
            while (p.next) {
                p = p.next
            }
            p.next = node
        } else {
            //没有头节点 直接设置
            this.head = node
        }
        this.length++
    }
    print() {
        let p = this.head
        let ret = ''
        if (this.head) {
            do {
                ret += (p.val + '==>')
                p = p.next
            } while (p.next)
            ret += p.val
            console.log(ret);

        } else {
            console.log('empty');
        }
    }
}

let linkList = new LinkNodeList()
linkList.append(1)
linkList.append(2)
linkList.append(3)
linkList.append(4)
linkList.print()
console.log(linkList.length);
```

### 3.2 leetCode-203 移除链表元素
```js
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
//递归写法
var removeElements = function (head, val) {
    //先判断不存在条件 如果为空直接返回
    if (head === null) {
        return head
    }
    // 不停的进行调用 删除 返回
    head.next = removeElements(head.next, val)
    //知道最后 一层一层跳出 如果值等于val 返回下个next节点  不相等返回当前head 返回的值赋值给上个head.next
    return head.val === val ? head.next : head
};
//普通写法  新增一个哨兵节点 省去为null的判断
var removeElements = function (head, val) {
    let ele = {
        next:head
    }
    let p = ele
    while(p.next){
        //判断val是否和val相等，将p.next的节点指向下下个节点
        if(p.next.val===val){
            p.next = p.next.next
        }else{
            p = p.next
        }
    }
    return ele.next
};
```

### 3.3 leetCode-141 环形链表
```js
/**
 * @param {ListNode} head
 * @return {boolean}
 */
//快慢指针
var hasCycle = function (head) {
    //定义两个指针 一个步长快 一个步长慢 如果是环形一定会相遇
    let fast = head
    let slow = head
    while (fast && fast.next) {
        fast = fast.next.next
        slow = slow.next
        if (slow === fast) return true
    }
    return false
};

//普通做法 使用Set集合存储 看是否存在相同的
var hasCycle = function (head) {
    //定义一个Set集合 不是键值 所以用
    let cache = new Set()
    //如果存在next，先判断head是否在cache中，不在新增，遍历head下个节点
    while (head) {
        if (cache.has(head)) {
            return true
        } else {
            cache.add(head)
        }
        head = head.next
    }
    return false
};
```
### 3.4 链表在vue源码中的应用
keep-alive的行为在指定了 max 后类似一个 LRU 缓存：如果缓存的实例数量即将超过指定的那个最大数量，则最久没有被访问的缓存实例将被销毁，以便为新的实例腾出空间。
超过数量不会被缓存
缓存方式：
1. 任务队列是谁先谁先出 
2. 看谁出现的次数最多淘汰最少出现次数的
3. last recent use LRU(最近最少使用)  比如最多缓存4个 [1,2,3,4]  此时来了2 将[1,2,3,4,2] 将之前的2删除 [1,3,4,2] 如果来了5 则淘汰1 [3,4,2,5] 使用链表实现 
<br />vue源码\packages\runtime-core\src\components\KeepAlive.ts :322
<br />源码320的写法 pruneCacheEntry(keys.values().next().value)

```js
//keys.values().next().value  Map是有迭代器 可以使用next取调用 keys 或者values 获取数组
let cache = new Map()
cache.set('1', 1)
cache.set('2', 2)
cache.set('3', 3)
// 生成器的代码 
// 使用cache.keys().next().value 相当于取了最先存进去的那个值
console.log(cache.keys().next().value);
// keys()  [Map Iterator] { '1', '2', '3' }
// keys().next()   { value: '1', done: false }
// keys().next().value  1

```

#### 3.4.1 leetCode-146 LRU缓存

```js
// @lc code=start
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    //使用map进行缓存
    this.cache = new Map()
    this.max = capacity
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    //如果存在key 进行删除缓存  原先的值需要进行赋值
    if (this.cache.has(key)) {
        let tmp = this.cache.get(key)
        this.cache.delete(key)
        this.cache.set(key, tmp)
        return tmp
    }
    return -1
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    //如果存在直接删除key
    if (this.cache.has(key)) {
        this.cache.delete(key)
    } else if (this.cache.size >= this.max) {
        // 当cache的数量大于等于最大值 删除之前的缓存
        this.cache.delete(this.cache.keys().next().value)
    }
    this.cache.set(key, value)
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

```

## 4 位运算
<<  >>  &   |  ^异或
    << 左移动一位是 乘以2
    >> 右移动一位是 除以2
    |
    &
    ^ 相同的位置不同为1
2的整数总是 1 10 100 1000 10000 100000 以1为开头的数

例如： 文本         html标签        组件
     text=001   element=010    component=100
    ｜ 进行授权
例如想拥有文本和标签属性  则let target = text & element  多次进行& 还只有这两个属性
    & 尽性校验
例如 target & text   011 & 001 = 001 说明有text属性
    target & element 011 & 010 = 010 有element属性
    target & component 011 & 100 = 000 没有component属性
### 4.1 leetCode-231   2 的幂

```js
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
    // 运用n 与 n-1 之间的特点 进行&操作 1000 & 0111 = 0000
    return n > 0 && (n & (n - 1)) === 0
};
//普通做法
var isPowerOfTwo = function (n) {
    // 先判断跳出条件
    if (n === 1) {
        return true
    }
    // 判断失败的条件
    if (n % 2 !== 0 || n === 0) {
        return false
    }
    // 二分进行递归
    return isPowerOfTwo(n / 2)
};
```

### 4.2 leetCode-136    只出现一次的数字
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
//使用异或方法 任何两个相同的数异或后为0
var singleNumber = function (nums) {
    let ret = 0
    nums.forEach(num=>[
        ret ^= num 
    ])
    return ret 
};
//普通做法
var singleNumber = function (nums) { 
    let obj = new Map()
    for (let i = 0; i < nums.length; i++) {
        if (obj.has(nums[i])) {
            obj.set(nums[i],2)
        } else {
            obj.set[nums[i],1]
        }
    }
    for(let o of obj.keys()){
        if(obj.get(o)===1){
            return o
        }
    }
};
```
组合权限认证 一个虚拟dom 很多属性是动态的 每一个状态标记一个2进制位
let STYLE= 1
let CLASS = 1 << 1
let CHILDREN = 1<< 2
//授权 
let vnodeType = STYLE | CLASS
判断 &
!!(vnodeType & STYLE)
删除授权 ^
vnodeType ^ CLASS 

## 5 树结构入门
### 5.1 树概念
树和链表所有结构的基础
     1
    /\
    2 3
二叉树 this.val= val   this.left=null  this.right=null

### 5.2 leetCode-104 二叉树的最大深度
```js
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if(root===null){
        return 0
    }
    // 最大深度是 左子树的深度 和右子树的深度 最大的那个+1？ 从null返回为0 返回到上层的时候+1
    return Math.max(maxDepth(root.left),maxDepth(root.right))+1
};
```
### 5.3 leetCode-226 翻转二叉树
```js
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if(root!==null){
         // 递归子问题 循环遍历调用子节点进行调换
        [root.left,root.right]=[invertTree(root.right),invertTree(root.left)]   
    }
    return root
};
```
## 6 数据结构漫谈
- 数组：连续存储
  - 队列 jsx template 
  - 栈  判断一段html合法
  - 堆  

- 链表：非连续存储
    - 树 下个节点有几个
    - 图 闭合的链表 
例子 {a:1,b:2} 数组加链表
a => 数字  hash算法  放入数组中存储 查找O(1)
b => 数字 放入数组中 可以用链表进行存储

## 7 React原理树和链表的关系
两棵树进行对比 Vdom  嵌套调用 无法控制  60fps 是16.6ms
之前是childre  现在是head 只需要找到下次执行的head继续执行即可
### leetCode-20 有效的括号
```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    // 解题思路： 用一个数组存放每次遍历的值  枚举这些对应的括号， 将左边括号进行存储，当遇到不是obj的规则
    // 先比较stack中pop的值与当前的值是不是相等，不相等直接返回
    // [{}()]   [{()}]   [({}) {}()]
    let stack = []
    let obj = {
        '(': ')',
        '{': '}',
        '[': ']'
    }
    for(let i=0;i<s.length;i++){
        const el = s[i]
        if(el in obj){
            stack.push(el)
        }else{
            if(el!==obj[stack.pop()]){
                return false
            }
        }
    }
    // 所有stack中的数据匹配完成后，返回true
    return !stack.length
};
```
### leetCode-71 简化路径
```js
/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
    //解题思路：栈 将path通过/分割成数组 只含有 .  ..  '' 字母 遇到. 直接删除 .. 删除上个path 
    let pathArr = path.split('/')
    const stack = []
    for (let i = 0; i < pathArr.length; i++) {
        let s = pathArr[i]
        if (s === '..') {
            stack.pop()
        } else if (s && s !== '.') {
            stack.push(s)
        }
    }
    return '/' + stack.join('/')
};
```

## 8 排序

### leetCode-15 三数之和

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    // 如果长度小于3 返回空
    if(nums.length<3){
        return []
    }
    let list = []

    //在一个无序的数组中，查询目标与大小相关，可以利用排序进行降低复杂度
    nums.sort((a, b) => a - b)
    //最小+最大之和，如果比目标值大， 说明我们要缩小这个值，最大值左移动，否则最小右移
    for (let i = 0; i < nums.length; i++) {
        //如果下一个数与前一个数相同直接跳过
        if (nums[i] === nums[i - 1]) {
            continue
        }
        //以nums[i]为基准，找出其他两个值为-nums[i]. 数组和为0
        let left = i + 1
        let right = nums.length - 1
        //
        while (left < right) {
            //需要跳过i自身 
            if (right === i) {
                right--
            } else if (nums[left] + nums[right] + nums[i] === 0) {
                list.push([nums[left], nums[right], nums[i]])
                //继续找
                while (nums[left] === nums[left + 1]) {
                    //由于排序了 去重相邻的重复的数字
                    left++
                }
                left++
                while (nums[right] === nums[right - 1]) {
                    //由于排序了 去重相邻的重复的数字
                    right--
                }
                right--
            } else if (nums[left] + nums[right] + nums[i] > 0) {
                //数字变大
                right--
            } else {
                //数字变小
                left++
            }
        }
    }
    return list
};
```

## leftpad
```js
// leftpad
let s = 'hello'

console.log(s.padStart(10, '0'));
// 性能慢 二分思想
function leftpad(str, length, ch) {
	let len = length - str.length + 1
	return Array(len).join(ch) + str
}
console.log(1, leftpad(s, 20, '0'));
// '0'
// '00'
// '0000'
// '00000000'
function leftpad2(str, length, ch) {
	let len = length - str.length
	total = ''
	while (true) {
		// if (len % 2 === 1) {
		if (len & 1) {
			total += ch
		}
		if (len === 1) {
			return total + str
		}
		ch += ch
		// len = parseInt(len/2)
		len = len >> 1
	}
}

console.time('leftpad')
for (let i = 0; i < 10000; i++) {
	leftpad('hello', 100000, 'o')
}
console.timeEnd('leftpad')
console.time('leftpad2')
for (let i = 0; i < 10000; i++) {
	leftpad2('hello', 100000, 'o')
}
console.timeEnd('leftpad2')

//leftpad: 9.044s
// leftpad2: 5.152ms

```

## 9 回溯和递归思想入门
排序、二分、递归、回溯、贪心、动态规划
全排列
深度优先基本
### leetCode-46 全排列
```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
//公式
/*
temp [1]
    backtrack
        temp[1,2]
            backtrack
                temp [1,2,3]终止
                temp.pop[1,2]
            temp[1]
    

 */
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
```

### leetCode-79 单词搜索
```js
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
/*
  1. 全部答案的路径 需要个list
   let list = []
   function backtrack(list,临时路径,输入){
       //结束条件
           临时路径，新增一个路径
       循环{
           选择一个数据
           递归backtrack(list,临时路径,输入)
           撤回选择的数据
       }
   }
   backtrack(list,[],输入)

   2 不需要全部路径 只需要true/false 不需要临时路径 
*/
var exist = function (board, word) {
    //输入终止条件
    if (board.length === 0) {
        return false
    }
    if (word.length === 0) {
        return true
    }
    //定义行列数
    let row = board.length
    let col = board[0].length
    //遍历
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            // 每一个字母都可以作为一个起点 
            //传入索引，方便上下左右移动，最后0是当前值的索引
            const ret = find(i, j, 0)
            if(ret){
                return ret
            }
        }

    }
    return false //结束未找到

    //递归函数
    function find(i, j, cur) {
        if (i >= row || i < 0) {
            return false
        }
        if (j >= col || j < 0) {
            return false
        }
        //查找的数字至空，如果空不要再查找
        let letter = board[i][j]
        //查找当前的值不等于word的对应为的字母
        if (letter !== word[cur]) {
            return false
        }
        //最后一个都是匹配的
        if (cur === word.length - 1) {
            return true
        }
        board[i][j] = null
        //进行下一步
        //四个方向查找  有一个方向找到即可
        const ret = find(i + 1, j, cur + 1) ||
            find(i - 1, j, cur + 1) ||
            find(i, j + 1, cur + 1) ||
            find(i, j - 1, cur + 1)
        //回撤
        board[i][j] = letter
        //再下一步塞回去，查找下一个
        return ret
    }
};
```

## 贪心
每一步都是当前的最优解 跟之前的没关系
1. 找零钱  （最小张数）
2. 100 50 20 10 5 1
3. 先100 每次都是先找最大值 最终找到全局的最后解

### leetCode-860 柠檬水找零
```js
/**
 * @param {number[]} bills
 * @return {boolean}
 */
// 给5 收入
// 给10 就找5
// 给20 给个10+5 或者 5+5+5 优先给10
var lemonadeChange = function (bills) {
    let fiveNum = 0
    let tenNum = 0
    for (let i = 0; i < bills.length; i++) {
        let bill = bills[i]
        if (bill === 5) {
            fiveNum += 1
        } else if (bill === 10) {
            //如果10块有5块找 就找没有就返回false
            if (fiveNum > 0) {
                fiveNum -= 1
                tenNum += 1
            } else {
                return false
            }
        } else {
            //20的情况
            if (fiveNum > 0 && tenNum > 0) {
                fiveNum -= 1
                tenNum -= 1
            } else if (fiveNum > 2) {
                fiveNum -= 3
            } else {
                return false
            }
        }
    }
    return true
};
```

### leetCode-55 跳跃游戏
```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
//跳跃的范围覆盖就可以
var canJump = function (nums) {
    //cover如果比length-1 大 认为可以跳过
    let cover = 0
    //遍历 到cover 如果cover小说明 遍历不到后面的值
    for (let i = 0; i <= cover; i++) {
        // 当前覆盖的范围是 cover到第i+nums[i]的值
        cover = Math.max(cover, i + nums[i])
        //如果覆盖的值大于等于nums的最后的下表 说明成功
        if (cover >= nums.length - 1) {
            return true
        }
    }
    //一直没有匹配到 说明不可以
    return false
};
```

### leetCode-455 分发饼干
```js
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
// g 胃口 s有的饼干
// 贪心策略
var findContentChildren = function (g, s) {
    g.sort((a, b) => a - b)
    s.sort((a, b) => a - b)
    //饼干满足胃口最大的小朋友
    let ret = 0
    let index = s.length - 1
    //找出胃口最大的小朋友
    for (let i = g.length - 1; i >= 0; i--) {
        //如果饼干数量>0 饼干大于小朋友的胃口 结果+1 最大数量的索引-1
        if (index >= 0 && s[index] >= g[i]) {
            ret++
            index--
        }
    }
    return ret

};
```


## 动态规划 (递推)
求极值
- 每一步状态是前一步推导出来了
   - 走迷宫 每一步都有数字 怎么走数字最小

### 斐波那契数列
- dp[i]中间值的推导
- 确定推导公式
- 确定初始化和遍历顺序
  
### leetCode-509 斐波那契数列
```js
/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
    // 1.递归
    if(n<=1){
        return n
    }
    return fib(n-1)+fib(n-2)

    //2.递推
    // dp[i] 就是第i的值
    // dp[i] = dp[i-1]+dp[i-2]

    let dp = [0, 1]
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]


    //3.备忘录
    //备忘录+递推
    function helper(meno,n){
        if(n<=1){
            return n
        }
        if(meno[n]){
            return meno[n]
        }
        meno[n] = helper(meno,n-1)+helper(meno,n-2)
        return meno[n]
    }
    let meno = []
    return helper(meno,n)
    



    //熟组优化成两个数字
    if(n<=1){
        return n
    }
    let dp1 = 0
    let dp2 = 1
    let dp3
    for (let i = 2; i <= n; i++) {
        dp3 = dp1 + dp2
        dp1 = dp2
        dp2 = dp3
    }
    return dp3

    //数学公式
    //可以用矩阵
};
```

### leetCode-322 零钱兑换
```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    // 固定金额下，最少的个数
    // 边界条件
    //     循环
    //         递推公式
    // dp[n] n的钱数下最优解
    //只有2，5 硬币 找12
    // dp[n-coins[i]] + 1
    // 10 + 2
    // 7 + 5
    //金额为0 直接返回0
    if (!amount) {
        return 0
    }
    //coins=[1,2,5] amount =11
    let dp = Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for (let i = 0; i < coins.length; i++) {
        //针对每一个硬币
        // i=0 j=1 
        for (let j = coins[i]; j <= amount; j++) {
            dp[j] = Math.min(dp[j - coins[i]] + 1, dp[j])
        }
    }
        return dp[amount] === Infinity ? -1 : dp[amount]
};
```
### leetCode-300 最长递增子序列
在vue的dom树进行新旧对比，如果同一个是div进行属性更新 如果不是同一元素替换
- old [2,5,3,7,4,6]
- new [1,2,3,4,5]
  - 如何进行高效的复用，怎么2标签复用
  - 最长递增子序列[2,3,4] 新的进行插入

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    //贪心+二分
    //让序列尽可能慢 
    // [1,3,5,7] 9  大于最后一个push  中间在插入 [1,4,5]
     let n = nums.length
    if(n===0){
        return 0
    }
    let arr = [nums[0]]
    for(let i=0;i<n;i++){
        if(nums[i]>arr[arr.length-1]){
            arr.push(nums[i])
        }else{
            //找到arr中第一个比nums[i]大的数组 修改他
            let left = 0
            let right = arr.length-1
            while(left<right){
                let mid = (left+right)>>1
                if(arr[mid]<nums[i]){
                    left = mid+1
                }else{
                    right = mid
                }
            }
            arr[left] = nums[i]
        }
    }
    return arr.length

   // [0,1,0,3,2,3]
   //选择极值用dp
   // dp[i] 在i的位置以前的数组 最长递增子序列的长度
   // 例如 刚开始是1个数[1,1,1,1,1,1]
   // 第二个数 nums[i]>nums[i-1] [1,2,1,1,1,1] 
   // 第三个数 比之前的小  [1,2,2,1,1,1] 
   // 第四个数 比之前的大  [1,2,2,3,1,1] 
   // 第五个数 比之前的小  [1,2,2,3,3,1] 
   // 第六个数 比之前的大  [1,2,2,3,3,4] 
    //动态规划
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
```
renderer.ts--2387

## 刷题章节150左右

1. 链表
```js
遍历
while (head) {
    head = head.next
}
return head
//定义一个哨兵节点
let dummny = {
    next:head.next
}
return dummny.next
```
2. 数组

```js

```
3. **树** 前端最需要刷的数据结构
```js
二叉树
function walk(treeNode){
    if(treeNode===null){
        return
    }
    //停止条件
    //处理treeNode

    //处理treeNode
    walk(treeNode.left)
    walk(treeNode.right)

    walk(treeNode.left)
    //处理treeNode
    walk(treeNode.right)

    walk(treeNode.left)
    walk(treeNode.right)
    //处理treeNode
}
```

### leetCode-94 二叉树的中序遍历
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    let  arr = []
    function dfs(r){
        if(r===null){
            return
        }
        dfs(r.left)
        arr.push(r.val)
        dfs(r.right)
    }
    dfs(root)
    return arr
};
```
### leetCode-144 二叉树的前序遍历
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    let  arr = []
    function dfs(r){
        if(r===null){
            return
        }
        arr.push(r.val)
        dfs(r.left)
        dfs(r.right)
    }
    dfs(root)
    return arr
};
//迭代写法
var preorderTraversal = function (root) {
    let res = []
    if (root === null) {
        return []
    }
    let stack = [root]
    while (stack.length) {
        let cur = stack.pop()
        res.push(cur.val)
        cur.right && stack.push(cur.right)
        cur.left && stack.push(cur.left)
    }
    return res

};
```

### leetCode-145 二叉树的后序遍历
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    let  arr = []
    function dfs(r){
        if(r===null){
            return
        }
        dfs(r.left)
        dfs(r.right)
        arr.push(r.val)
    }
    dfs(root)
    return arr
};
```

### 算法思想
1. 二分
2. 双指针(快慢指针 头尾指针)
   1. 链表数组
```js
let fast = null
let slow = null
if(fast&&fast.next){
    处理
}

```
3. 递归和回溯（递归树）
```js
function backtrack(数据，缓存路径){
    循环
        标记
        backtrack(数据，缓存路径)
        取消标记
}

```
4. **动态规划** 重点

```js
想清楚结果怎么推导，找零钱
1，2，5 
dp[11] 11块钱找零的最佳解
dp[10] dp[9] dp[6] 三个最优解 +1
```
5. 贪心
```js

```
6. bfs(宽度优先) dfs(回溯 广度优先)



## 刷题 
- 算法复杂度
  <!-- - 1.两数之和 -->
- 数据结构
  - 数组  （暴力破解 双指针）
    <!-- - 26.删除有序数组中的重复项 -->
    <!-- - 27.移除元素 -->
    <!-- - 977.有序数组中的平方 -->
    <!-- - 209.长度最小的子数组 -->
    <!-- - 283.移动零 -->
    <!-- - 344.反转字符串 -->
    <!-- - 167.两数之和-ii-输入有序数组 -->
  - 数组进阶
  - 链表
    <!-- - 19.删除链表的倒数第N个结点 -->
    <!-- - 206.反转链表 -->
    <!-- - 21.合并两个有序链表 -->
    <!-- - 876.链表的中间结点 -->
    <!-- - 234.回文链表 -->
    <!-- - 92.反转链表-ii -->
    <!-- - 142.环形链表II -->
    <!-- - 160.相交链表 -->
    - 141.环形链表
    - 203.移除链表元素
    - 202.快乐数
  - 位运算
    - 136.只出现一次的数字
  - 树结构
    <!-- - 100.相同的树 -->
    <!-- - 101.对称二叉树 -->
    <!-- - 104.二叉树的最大深度 -->
    <!-- - 226.翻转二叉树 -->
    <!-- - 94.二叉树的中序遍历 -->
    <!-- - 144.二叉树的前序遍历 -->
    <!-- - 145.二叉树的后序遍历 -->
    <!-- - 111.二叉树的最小深度 -->
    <!-- - 114.二叉树展开为链表 -->

    <!-- - 617.合并二叉树 -->
    <!-- - 236.二叉树的最近公共祖先 -->
    <!-- - 543.二叉树的直径 -->
    <!-- - 572.另一棵树的子树 -->
    <!-- - 110.平衡二叉树 -->
    <!-- - 222.完全二叉树的节点个数 -->
    <!-- - 257.二叉树的所有路径 -->
    - 每层对比
    <!-- - 102.二叉树的层序遍历 -->
    <!-- - 107.二叉树的层序遍历 II -->
    <!-- - 199.二叉树的右视图 -->
    - 637.
    - 116.
    - 117.
    - 429.
    - 515.
    - 112.
    - 404.
    - 98.
    - 99.
    - 108.
    - 109.
    - 654.
    - 230.
    - 700.
    - 701.
    - 96.
    - 堆
  - 栈
    - 20.
    - 71.
    - =
    - 225.
    - 232.
    - 1047.
    - 150.
    - 151.
    - console.trace() 调用栈 哪些函数执行了
- 算法思想
  - 排序
    - 912.
    - 15.
  - 二分思想
    - 快排
    - 704.
    - 35.
    - 153.
    - 69.
  - 回溯和搜索
    - 46.
    - 79.
    - 17.
    - 39.
    - 77.
    - 78.
    - 131.
    - 93.
    - 37.
    - 47.
    - 51.
  - 贪心算法
    - 55.
    - 300.
    - 455.
    - 860.
  - 动态规划
    - 509.
    - 70.
    - 62.
    - 63.
      - 分硬币
      - 硬币不限 硬币种类是变量硬币数量有限 额度差
    - 322.
      - 背包 01 完全
      - 打家劫舍 有没有环
    - 198.
    - 213.
    - 337.
      - 股票 只能卖一次两次多次 冷冻期 手续费
    - 121.
    - 122.
    - 123.
    - 188.
    - 309.
    - 714.
      - 序列
    - 1143.
    - 115.

## leetCode-26 删除有序数组中的重复项
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
 //思路：定义一个快慢指针 slow fast
 //[1,1,2,3,3]=> 如果fast和slow不相等 让fast的值赋给slow slow++ 
//  [1,1,2,3,3]=>[1,2,2,3,3]=>[1,2,3,3,3]=>返回slow索引 长度需要加1
var removeDuplicates = function(nums) {
    if(nums.length===0){
        return 0
    }
    let slow = 0
    let fast = 0
    while(fast<nums.length){
        if(nums[fast]!==nums[slow]){
            slow++
            nums[slow] = nums[fast]
        }
        fast++
    }
    return slow+1
};
```

## leetCode-27 移除元素
```js
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
 //思路 定义一个k指针 如果nums[i]不等于val  利用下表代表返回后新数组的长度
var removeElement = function(nums, val) {
    let k = 0 
    for(let i=0;i<nums.length;i++){
        if(nums[i]!==val){
            nums[k++]=nums[i]
        }
    }
    return k
};
```
## leetCode-283 移动零
```js
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
```
## leetCode-167. 两数之和 II - 输入有序数组
```js
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
    //两个递增相加之和 从两个方向进行移动
    let left = 0
    let right = numbers.length - 1
    while (left <= right) {
        let sum = numbers[left] + numbers[right]
        //下标记从1开始
        if (sum === target) {
            return [left + 1, right + 1]
        }
        if (sum > target) {
            right--
        } else if (sum < target) {
            left++
        }
    }
};
```
## leetCode-977. 有序数组的平方
```js
/**
 * 如何原地？
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
    let left = 0
    let right = nums.length - 1
    let arr = Array(nums.length)
    let k = right
    while (left <= right) {
        let l = nums[left] * nums[left]
        let r = nums[right] * nums[right]
        //最左边小于右边 进行赋值右边-- 
        if (l < r) {
            arr[k] = r
            right--
        } else {
            arr[k] = l
            left++
        }
        k--
    }
    return arr
};
```
## leetCode-209. 长度最小的子数组
```js
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    //暴力解法
    let len = nums.length
    let result = len + 1
    for (let i = 0; i < len; i++) {
        let sum = 0
        for (let j = i; j < len; j++) {
            sum += nums[j]
            //如果找到sum大于等于target subLen 是j-i+1长度 
            if (sum >= target) {
                let subLen = j - i + 1
                result = result < subLen ? result : subLen
                break
            }
        }
    }
    return result > len ? 0 : result
};
```
```js
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    //动态规划
    let len = nums.length
    let fast = slow = 0
    let sum = 0
    let result = len + 1
    while (fast < len) {
        sum += nums[fast++]
        while (sum >= target) {
            let subLen = fast - slow
            result = result < subLen ? result : subLen
            sum -= nums[slow++]
        }
    }
    return result > len ? 0 : result
};
```

## leetCode-344. 反转字符串
```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    let left = 0
    let right = s.length - 1
    while(left<=right){
        let tmp = s[left]
        s[left] = s[right]
        s[right] = tmp
        left++
        right--
    }
};
```
## leetCode-206. 反转链表
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
    // 终止条件
    if (!head || !head.next) {
        return head
    }
    // 定义prev 保存前一个结点
    let prev = null
    // cur 当前结点
    let cur = head
    //如果cur存在 next结点需要找到下个结点，当前的节点的next需要进行反转，指向上个结点 ；继续进行上个结点的变成prev 当前结点需要指向下个结点
    // 例如[1,2] => next = 2 => cur.next = null => prev = 1=> cur = 2=> [2,1]
    while (cur) {
        let next = cur.next
        cur.next = prev
        prev = cur
        cur = next
    }
    return prev
};
```
## leetCode-19. 删除链表的倒数第 N 个结点
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
// 思路： 定义双指针 让fast先走n步，然后同时走，知道fast为null ，slow就是倒数第n个
var removeNthFromEnd = function (head, n) {
    let dummy = new ListNode(null, head) //[0,1,2,3,4,5]
    // let dummy = {
    //     next: head
    // }
    let slow = dummy
    let fast = dummy
    while (n--) {
        fast = fast.next
    }
    while (fast.next !== null) {
        fast = fast.next
        slow = slow.next
    }
    slow.next = slow.next.next
    return dummy.next
};
```
## leetCode-21.合并两个有序链表
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
    // 遍历两个链表，每次对比两个结点头部的大小
    // 优先把小的节点追加到新的链表
    //定义头结点
    let dummy = {
        next: null
    }
    let tmp = dummy
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            tmp.next = list1
            list1 = list1.next
        } else {
            tmp.next = list2
            list2 = list2.next
        }
        //每次遍历将tmp的next扩展
        tmp = tmp.next
    }
    //最后判断两个链表有没有遍历完成
    tmp.next = list1===null?list2:list1

    return dummy.next
};
```
## leetCode-876.链表的中间结点
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
    //使用双指针slow走一步 fast走两步 fast走完 slow刚好是一半
    let slow = fast = head
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
    }
    return slow
};
```
## leetCode-234.回文链表
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
    // 通过双指针把前半个反转。1，2，3，2，1   2，1，2，1
    let slow = fast = head
    let prev = null

    while (fast && fast.next) {
        fast = fast.next.next
// slow=1 现将slow下个结点找出 slow.next等于上个结点 等于后重置prev上个结点的值为当前的节点，slow节点更新为下个结点 
        let next = slow.next
        slow.next = prev
        prev = slow
        slow = next
    }
    //12321=>1 ,2=>2,2 
    //slow 此时就在中间
    //fast 还有说明是奇数 slow还要往中间走
    if(fast){
        slow = slow.next
    }
    //此时prev为[2,1,1][3,2,1]?
    while(prev&&slow){
        if(prev.val!==slow.val){
            return false
        }
        prev = prev.next
        slow = slow.next
    }
    return true
};
```
## leetCode-92. 反转链表 II
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
    //先移动到left 再反转left-right这么多次
    if (left >= right) {
        return head
    }
    let dummy = {
        next: head
    }
    let tmp = dummy
    //先移动到left位置
    for (let i = 0; i < left - 1; i++) {
        tmp = tmp.next
    }
    // left-right位置进行反转
    let prev = tmp.next
    let cur = prev.next
    for (let j = 0; j < right - left; j++) {
        let next = cur.next
        cur.next = prev
        prev = cur
        cur = next
    }
    //修改指针的指向
    tmp.next.next = cur
    tmp.next = prev

    return dummy.next
};
```
## leetCode-142. 环形链表 II
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
    //进行两次撞击， 第一次撞击是在环形链表上 第二次是入口
    if (head === null) {
        return null
    }
    let slow = fast = head
    while (fast !== null) {
        slow = slow.next
        if (fast.next !== null) {
            fast = fast.next.next
        } else {
            return null
        }
        if (fast === slow) {
            let cur = head
            while (cur !== slow) {
                cur = cur.next
                slow = slow.next
            }
            return cur
        }
    }
    return null
};
```
## leetCode-160. 相交链表
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
    if(headA===null||headB===null){
        return null
    }
    //思路1: 先找到head的长度  两个拼接在一起。a1->a2->b1->b2->b3 b1->b2->b3->a1->a2 一起遍历即可找到相同的 headA->headB
    let curA = headA
    let curB = headB
    while (curA !== curB) {
        curA = curA === null ? headB : curA.next
        curB = curB === null ? headA : curB.next
    }
    return curB
};
```
## leetCode-100. 相同的树
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if(p===null&&q===null){
        return true
    }
    if(p===null||q===null){
        return false
    }
    if(p.val!==q.val){
        return false
    }
    return isSameTree(p.left,q.left)&&isSameTree(p.right,q.right)

};
// 
var isSameTree = function (p, q) {
    function travese(p, q) {
        if (p === null && q === null) {
            return true
        }
        if (p === null || q === null) {
            return false
        }
        let left = travese(p.left, q.left)
        let right = travese(p.right, q.right)
        if (p.val === q.val && left && right) {
            return true
        }
        return false
    }
    return travese(p, q)
};
```
## leetCode-101.对称二叉树
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
    const travese = (root1, root2) => {
        if (root1===null&&root2===null) {
            return true
        }
        if(root1===null||root2===null){
            return false
        }
        if(root1.val===root2.val){
            return travese(root1.left,root2.right)&&travese(root1.right,root2.left)
        }
        return false
    }
    return travese(root.left,root.right)
};
```
## leetCode-111. 二叉树的最小深度
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
    //递归 
    if (root === null) {
        return 0
    }
    if (root.left === null && root.right === null) {
        return 1
    }
    if (root.left === null) {
        return 1 + minDepth(root.right)
    }
    if (root.right === null) {
        return 1 + minDepth(root.left)
    }
    if (root.left && root.right) {
        return Math.min(minDepth(root.left), minDepth(root.right)) + 1
    }
};
var minDepth = function (root) {
    //迭代
    if(root===null){
        return 0
    }
    const stack = [root]
    //需要层级的变量
    let dep = 0
    //每次弹出结点 相当于一个深度
    while(true){
        let size = stack.length
        dep++
        while(size--){
            let node = stack.shift()
            if(!node.left&&!node.right){
                return dep
            }
            node.left && stack.push(node.left)
            node.right && stack.push(node.right)
        }
    }
};
```
## leetCode-114 **二叉树展开为链表**
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
function preTravese(root,list) {
    if (root !== null) {
        list.push(root)
        preTravese(root.left, list)
        preTravese(root.right, list)
    }
}
//使用前序遍历
var flatten = function (root) {
    let list = []
    preTravese(root, list)
    for (let i = 1; i < list.length; i++) {
        const pre = list[i-1] //pre就是root
        const cur = list[i]
        pre.left = null
        pre.right = cur
    }
};
```
## leetCode-617 合并二叉树
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
var mergeTrees = function(root1, root2) {
// 思路 root1不存在返回root2 root2不存在返回root1
    function dfs(root1,root2){
        if(!root1){
            return root2
        }
        if(!root2){
            return root1
        }
        // 都存在 让两个值进行相加
        root1.val += root2.val
        //此时root1的左边就是累积相加
        //递归 左右结点是否还有子节点 
        root1.left = dfs(root1.left,root2.left)
        root1.right = dfs(root1.right,root2.right)
        return root1
    }

    return dfs(root1,root2)
};
```
## leetCode-236 二叉树的最近公共祖先
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    if (root === null) {
        return null
    }
    if (root === p || root === q) {
        return root
    }
    let left = lowestCommonAncestor(root.left, p, q)
    let right = lowestCommonAncestor(root.right, p, q)
    if (left && right) {
        return root
    }
    return left ? left : right
};
```
## leetCode-543 二叉树的直径
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
    let len = 0
    function dfs(root) {
        if (root === null) {
            return null
        }
        let left = dfs(root.left)
        let right = dfs(root.right)
        len = Math.max(len, left + right)

        return Math.max(left, right) + 1
    }
    dfs(root)
    return len
};
```
## leetCode-572 另一棵树的子树
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
    //不停的比较 某一个子树 是不是和subRoot相同
    if (root === null) {
        return false
    }
    if (root.val === subRoot.val) {
        if (isSameTree(root, subRoot)) {
            return true
        }
    }
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)
};

function isSameTree(p, q) {
    return JSON.stringify(p) === JSON.stringify(q)
}
```
## leetCode-110 平衡二叉树
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {

    function travese(node) {
        if (node === null) {
            return 0
        }
        let leftDepth = travese(node.left)
        if (leftDepth === -1) {
            return -1
        }
        let rightDepth = travese(node.right)
        if (rightDepth === -1) {
            return -1
        }

        if (Math.abs(leftDepth - rightDepth) > 1) {
            return -1
        } else {
            return Math.max(leftDepth, rightDepth) + 1
        }
        return true
    }
    return travese(root) !== -1
};
```
## leetCode-222 完全二叉树的节点个数
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function (root) {

    function travese(node) {
        if (node === null) {
            return 0
        }
        let leftNum = travese(node.left)
        let rightNum = travese(node.right)
        return leftNum + rightNum + 1
    }

    return travese(root)

};
```
## leetCode-257 二叉树的所有路径
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
    // let ret = []
    // function travese(node, path) {
    //     if (node === null) {
    //         return null
    //     }
    //     if (node.left === null && node.right === null) {
    //         ret.push(path + node.val)
    //     }
    //     travese(node.left, path + node.val + '->')
    //     travese(node.right, path + node.val + '->')
    // }

    // travese(root, '')
    // return ret
    //用数组保存结果
    let ret = []
    function travese(node, path) {
        if (node === null) {
            return null
        }
        if (node.left === null && node.right === null) {
            path.push(node.val)
            ret.push(path.join('->'))
        }
        travese(node.left, path.concat(node.val))
        travese(node.right, path.concat(node.val))
    }

    travese(root, [])
    return ret
};
```
## leetCode-102 二叉树的层序遍历
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
//  [3] 1
// [9,20] 2
var levelOrder = function (root) {
    //适合用栈的方式去树的遍历 适合层序遍历
    let ret = []
    if (root === null) {
        return ret
    }
    let queue = [root]//遍历进行队列保存
    //每次遍历保存当层的数据量
    while (queue.length) {
        let len = queue.length
        let curLevel = []
        while (len > 0) {
            //每次从头部弹出
            let node = queue.shift()
            //放入结果
            curLevel.push(node.val)
            //如果当前的结点有左右结点，放入队列中等待下次层序遍历
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
            len--
        }
        //遍历队列，每次遍历都是一个层级 i变量没有使用到
        // for (let i = 0; i < len; i++) {
        //     let node = queue.shift()
        //     curLevel.push(node.val)
        //     node.left && queue.push(node.left)
        //     node.right && queue.push(node.right)
        // }
        ret.push(curLevel)
    }


    return ret
};
```
## leetCode-107 二叉树的层序遍历 II
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
 //思路正常层序遍历逻辑 返回是放在头部即可
var levelOrderBottom = function (root) {
    let ret = []
    if (root === null) {
        return ret
    }
    let queue = [root]
    while (queue.length) {
        let len = queue.length
        let curLevel = []
        while (len > 0) {
            let node = queue.shift()
            curLevel.push(node.val)
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
            len--
        }
        ret.unshift(curLevel)
    }
    return ret
};
```
## leetCode-199 二叉树的右视图
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
    //每层遍历的最右结点
    let ret = []
    if (root === null) {
        return ret
    }
    let queue = [root]
    while (queue.length) {
        let len = queue.length
        while (len--) {
            let node = queue.shift()
            //巧妙的地方，是每次左右结点push后当len===0 说明是最右边结点
            if (len === 0) {
                ret.push(node.val)
            }
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }
    }
    return ret
};
```
## leetCode-
```js

```
## leetCode-
```js

```