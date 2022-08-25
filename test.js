function insertionSort(arr) {
    console.time('快速排序耗时');
    for (let i = 1; i < arr.length; i++) {
        for (let j = i + 1; j > 0; j--) {
            if(arr[j]>arr[i])
        }
    }

    console.timeEnd('快速排序耗时');
}

//测试 
const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
// const arr = [200, 4, 8, 15, 27, 35, 36, 46, 47, 52, 66, 74, 89, 90, 2]
// const arr = [7, 8, 4, 5, 6, 3, 2, 1];
bubbleSort(arr)
bubbleSort1(arr)
console.log('打印***', arr)