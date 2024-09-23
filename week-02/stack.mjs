// stack.js
// 完成以下 TODO 的部分，並且以 Module 的方式匯出 (ESM)
export default class Stack {
	// TODO: # 有特別的意思嗎？請以註解回覆。
  #items;
  #top;

  constructor() {
    this.#items = [];
    this.#top = -1; // 查看頂部元素以peek函數實現，top用以內部追蹤
  }

  // 在 stack 頂部加入元素i
  push(element) {
		
    this.#top ++;
    this.#items[this.#top] = element;
  }

  // 移除並回傳 stack 頂部的元素
  pop() {

    if(this.#isEmpty()) return console.log('Underflow'); // stack為空

    const topElement = this.#items[this.#top]; // 取得頂部元素，而避免變數被改寫、誤解，應用const
    this.#items[this.#top] = undefined; // 避免意外保留原本的top值
    this.#top --;
    return topElement;
    
  }

  // 回傳 stack 頂部的元素，但不移除它
  peek() {
    
    if(this.#isEmpty()) return console.log('Stack is empty!');
    return this.#items[this.#top];
  }

  // 檢查 stack 是否為空
  // 將isEmpty設為private，檢查是否為空用size表示即可
  #isEmpty() { 
    
    return this.#top === -1;
  }

  // 回傳 stack 中元素的個數
  size() {
    
    return console.log(this.#top + 1);
  }

  // 清空 stack 
  clear() {
    
    this.#items = [];
    this.#top = -1;
    console.log("Stack has been cleared");
  }

  // 印出 stack 內容
  print() {
    
    if(this.#isEmpty()) return console.log('Stack is empty!');
    return console.log(this.#items.slice(0, this.#top + 1)); // slice(start, end)，注意是end exclude
  }
}