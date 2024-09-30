1. 安裝的Node.js版本

目前安裝的版本為v20.17.0，以下指令可以確認安裝的版本
```
node -v
```
使用這個版本的原因是，由於我們組員沒有在javascript上的開發經驗，所以選擇了距離我們最近的LTS版本

2. nvm和npm

\
nvm和npm都是在Node.js開發環境下的重要工具：


* npm (Node Package Manager)\
npm提供了一套CLI來管理JavaScript的package和dependency，另一方面則是npm自己就是最大的開源套件供應。\
管理package方面，有適用的指令：
```
npm install <package-name>
npm publish
```
處理專案的dependency上，提供package.json定義專案所需的dependencies\
例如在本次作業中Stack的部分，有關係到匯入與匯出的模組，javascript就有不同的規格，如ESM、CommonJS\
這種不同規格的管理就能透過package.json來定義：
```
{
  "type": "module"
}
```
* nvm (Node Version Manager)\
nvm是Node.js的版本管理工具，開發者可以在不同版本環境下進行切換\
比如說，切換到特定版本的Node.js
```
nvm use <node_version>
```

或者設定默認的版本：
```
nvm alias default <node_version>
```
