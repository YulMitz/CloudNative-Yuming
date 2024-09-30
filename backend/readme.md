
1. package.json 中的 dependencies 與 devDependencies 分別是什麼
在執行npm init時，它會在專案目錄下生成package.json，其中會包含這個專案所包含的dependencies和devDependencies
dependencies是在專案運行時必須仰賴的套件，例如維持工作環境運作的框架，簡而言之就是專案在本地運行所必需的。
devDependencies是開發時的輔助型工具，例如型別、格式的檢查、測試、美化之類。

2. package.json 中的 scripts 這個區塊怎麼用？
*簡化開發的routine和自動化一些功能*
在package.json中，我們可以這樣運用script的區塊：
```
{
  "scripts": {
    "start": "node app.js",
    "test": "jest",
    "build": "webpack --mode production",
    "lint": "eslint ."
  }
}
```
這樣定義之後，我們就可以透過npm run "script-name"快速執行預先定義好的動作
*自動化一些功能*
npm有事先定義一些詞綴，以便自動化流程的建立，比如說：
```
{
  "scripts": {
    "preinstall": "echo Running pre-install script",
    "postinstall": "echo Running post-install script"
  }
}
```
這樣設定之後，執行npm install時，preinstall會先於install執行，postinstall會後於install執行
pre和post的這類詞綴可以使得install等開發時常見的指令更靈活且自動化
*易於組織流程*
script的定義簡單易讀且方便定義團隊的工作模板，開發過程常見的工作都標準化了所以省去很多時間成本

3. Port number 要怎麼以環境變數來設定？
*使用cross-env套件，設定環境變數*
```
npm install --save-dev cross-env
```
將cross-env裝為devDependencies
接著在package.json的script中設定start變數：
```
{
  "scripts": {
    "start": "cross-env PORT=4000 node app.js"
  }
}
```
接著直接npm start即可

*使用dotenv套件，設定環境變數*
```
npm install --save-dev dotenv
```
接著建立.env檔案
```
New-Item -Path '.env' -Itemtype File
```
在檔案中，設定環境變數
```
PORT = 4000
```
回到app.js
```
require('dotenv').config(); // 引入dotenv的環境變數

const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // 透過process.env存取PORT變數
```


4. 關於哪些檔案應該要被放上 github repo 這個問題，描述看看為什麼你選擇上傳某些檔案、選擇不上傳某些檔案，決策的要素是什麼？
*不上傳github repo的原則*
在這個專案中，有幾種.gitignroe
    * 能由package.json自動生成的內容都可以放進.gitignore，即node_modules整個資料夾
    * .env是環境變數類，應由readme.md或.env.example文件提示其他協作者

5. 範例程式中用 require，但上週的 Stack 是用 import/export，這兩種分別是 JavaScript 引用模組的兩種方式: CJS vs ESM，這兩者分別怎麼用？
Node.js默認使用require，屬於CommonJS(CJS)的module系統，export/import方法屬於ES6的Module系統
Node.js環境下直接可以使用require
但大多時候建議使用ESM，使用時可以用下面其中一種：
1. 設置 package.json
2. 使用 .mjs 副檔名，Node.js會將檔案視為使用ESM
