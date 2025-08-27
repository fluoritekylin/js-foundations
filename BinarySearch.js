/*
*
* 1.给定一个有序(非降序)数组A，可能含有重复元素，求最小的i使得A等于target，不存在则返回-1。

array =[1,2,3,5,6,7,7,10]

target  = 7，return  5

target = 8,  return -1*/
const input = [1,2,3,5,6,7,7,10]
const target = 8

function findByBinarySearch(array, target) {
  let right = array.length
  let left = 0
  while (right !== left) {
    let mid = left + Math.floor((right - left)/2)
    if(target <= array[mid]) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  if (target !== array[left]) return -1
  return left
}
console.log(findByBinarySearch(input, target))

