// 使用reduce方法
function sum_array(arr){

    if (!Array.isArray(arr)) return "請輸入數字array";
    if (arr.length === 0) return 0;

    return arr.reduce((cum, cur) => cum + cur, 0);
}

// (optional)另外使用recursive的方法解決這個問題
// 另外也有如eval和forEach的方法
function sum_array_recursive(arr){

    if (arr.length === 0) return 0;
    return arr[0] + sum_array_recursive(arr.slice(1)); // arr.slice(1)會回傳比原本少了arr[0]的array，故會遞迴下去
}

// (optional)如果sum函式的input是n
// Formula Approach
function sum_formula(n) {

    if(n === 0) return 0;
    if(n < 0) return console.log("請輸入非負整數");

    return (n * (n + 1)) / 2;
}

// Recursive Approach
function sum_recursive(n) {

    if(n === 0) return 0;
    if(n < 0) return console.log("請輸入非負整數");

    return n + sum_recursive(n-1);
}

// Array.prototype.reduce Approach
function sum_reduce(n) {

    if(n === 0) return 0;
    if(n < 0) return console.log("請輸入非負整數");

    return Array.from({ length: n }, (_, x) => x + 1).reduce((cum, cur) => cum + cur, 0);
}

// 在Javascript中：
// 1. Array.from(arrayLike, mapping function)，一般來說接受這兩個parameter
//      * arrayLike可以丟進一個array或者指定長度
//      * mapping function通常為arrow function: (element, index) => calc., return值為陣列某index的值
// 2. Array.prototype.reduce可以累加陣列中所有元素：
//      * cum for accumulation, cur for value of current element
//      * 0表示從0開始加

// Empty array測試
let arr_empty = []
console.log(sum_array(arr_empty)); // 0
console.log(sum_array_recursive(arr_empty)); // 0

// Normal array測試
let arr_test = [1, 2, 5, 6, 7, -1]

console.log(sum_array(arr_test)); // 20
console.log(sum_array_recursive(arr_test)); // 20

// 如果sum函式的input是n
console.log(sum_formula(100)); // 5050
console.log(sum_recursive(100)); // 5050
console.log(sum_reduce(100)); // 5050