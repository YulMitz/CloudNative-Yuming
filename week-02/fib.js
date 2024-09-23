
// DP Approach
function fibonacci(n) {

    // Initial Condition
    if(n === 1) return 0; 
    if(n === 2) return 1;
    if(n <= 0) return "請輸入一個非負整數";

    let fib = [0, 1];
    for(let i = 2; i <= n; i++){
        fib[i] = fib[i - 1] + fib[i - 2];
    }

    return fib[n];
}

// 在Javascript中：
// 1. 可以用let或const建立array，差別在於const嚴格綁定variable和value，不可以重新指定別的value或array等等
// 2. ==是loose equality；===是strict equality。loose equality可以在不同type之間比較

// // Recursive Approach
// function fibonacci(n) {

//     // Initial Condition
//     if(n === 1) return 0; 
//     if(n === 2) return 1;

//     return fibonacci(n - 1) + fibonacci(n - 2);
// }

console.log(fibonacci(0)); // 沒有所謂第0個fibonacci數，故應跳錯誤訊息
console.log(fibonacci(1)); // 0
console.log(fibonacci(5)); // 5
console.log(fibonacci(10)); //55