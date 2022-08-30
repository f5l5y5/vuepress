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
let head = {
    next:{
        value:2,
        next:{
            value:3,
            next:{
                value:4,
                next:{
                    value:5,
                    next:null
                }
            }
        }
    },
    value:1
}
// 思路： 定义双指针 让fast先走n步，然后同时走，知道fast为null ，slow就是倒数第n个
var removeNthFromEnd = function (head, n) {
    // let dummy = new ListNode(null,head) //[0,1,2,3,4,5]
    let dummy = {
        next: head
    }
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

removeNthFromEnd(head,3)