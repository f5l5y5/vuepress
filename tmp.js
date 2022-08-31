let head = {
    next: {
        val: 1,
        next: {
            val: 2,
            next: {
                val: 3,
                next: {
                    val: 2,
                    next: {
                        val: 1,
                        next: null
                    }
                }
            }
        }
    },
    value: 1
}
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
    let slow = head
    let fast = head
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
    if (fast) {
        slow = slow.next
    }
    //此时prev为
    while (prev && slow) {
        if (prev.val !== slow.val) {
            return false
        }
        prev = prev.next
        slow = slow.next
    }
    return true
};

isPalindrome(head)