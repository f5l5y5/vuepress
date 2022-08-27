## 1.为什么学算法

- vue 和 react 的虚拟 dom 就是两棵树的 diff
- react16 的 fiber 架构 就是把树变成了链表
- jsx 解析 用的是栈
- 缓存模块用的是链表
- vue3 的虚拟 dom diff，使用的是最长递增子序列

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
3. 先100

## 动态规划
求极值