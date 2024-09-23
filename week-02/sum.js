// Formula Approach
function sum_formula(n) {

    if(n === 0) return 0;
    if(n < 0) return "請輸入非負整數";

    return (n * (n + 1)) / 2;
}

// Recursive Approach
function sum_recursive(n) {

    if(n === 0) return 0;
    if(n < 0) return "請輸入非負整數";

    return n + sum_recursive(n-1);
}

// Array.prototype Approach
function sum_reduce(n) {

    if(n === 0) return 0;
    if(n < 0) return "請輸入非負整數";

    return Array.from({ length: n }, (_, x) => x + 1).reduce((cum, cur) => cum + cur, 0);
}

// 在Javascript中：
// 1. Array.from(arrayLike, mapping function)，一般來說接受這兩個parameter
//      * arrayLike可以丟進一個array或者指定長度
//      * mapping function通常為arrow function: (element, index) => calc., return值為陣列某index的值
// 2. Array.prototype.reduce可以累加陣列中所有元素：
//      * cum for accumulation, cur for value of current element
//      * 0表示從0開始加

console.log(sum_formula(100));
console.log(sum_recursive(100));
console.log(sum_reduce(100));