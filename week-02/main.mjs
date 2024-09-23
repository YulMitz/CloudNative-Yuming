// main.js

import Stack from './stack.mjs';
// Node.js默認使用CommonJS的module系統，export/import方法屬於ES6的Module系統
// 查詢資料建議使用ES Modules，故需要提示Node.js使用ES Modules
// 1. 設置 package.json
// 2. 使用 .mjs 副檔名，Node.js會將檔案視為使用ES Modules

let stack = new Stack();

// 測試empty stack
stack.print(); // Stack is empty!
stack.peek(); // Stack is empty!
stack.pop(); // Underflow
stack.size(); // 0

// 正常功能測試
stack.push(5);
stack.push(8);
stack.push(13);
stack.push(4);
stack.push(23);
stack.print(); // [ 5, 8, 13, 4, 23 ]
console.log(stack.peek()); // 23
stack.size(); // 5