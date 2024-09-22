
## 1. Blob
Blob是一種git中檔案的基本單位，所有檔案"內容"都會被存成Blob的物件，而且有一個hash value作為唯一識別\
Blob的全名是Binary Large Object，以git來說會被儲存在.git/objects底下
> 例如我今天創建一個hello.txt裡面只有一行叫hello world\
git會生成一個雜湊值A，作為Blob的名稱儲存在.git/objects中，而Blob檔案的內容為hello world用git格式壓縮的東西\
要是今天更改了hello.txt，以雜湊值A儲存的Blob檔案不會被改變，而是會用雜湊值B生成新的Blob檔案。\
這使得git可以來做版本控管

## 2. Tree
Tree是git中的目錄物件，tree可以指向sub tree或Blob檔案\
Tree物件本身也有唯一的hash value\
而每次commit時，會有一個commit object紀錄該次commit的根目錄Tree物件、提交時間、提交者等等資訊

以下用我覺得好理解的方式解釋Tree的底層結構
```
[main 830c973] add git.md
 1 file changed, 11 insertions(+)
 create mode 100644 git.md
```
本次commit新增了git.md這個檔案，且這次commit的簡化識別叫做830c973\
透過830c973我們能夠查到這次commit的內容
```
>git cat-file -p 830c973
tree 87d4e61ae0533866ac44735c6f7c66fc33db071b
parent d88051fa4b3896f7efd20fd97e6d9ea26ffd8638
author YulMitz <yulmitz753220@gmail.com> 1726384811 +0800
committer YulMitz <yulmitz753220@gmail.com> 1726384811 +0800
```
可以得到這次commit的根目錄Tree的hash value: 87d4e61ae0533866ac44735c6f7c66fc33db071b\
再透過這個hash value，我們可以查詢這個Tree的資訊
```
>git cat-file -p 87d4e61ae0533866ac44735c6f7c66fc33db071b
100644 blob e2007e42c34ed7c8cf74988f6348dc8662a785e1    git.md
100644 blob 31fbf016aee04c92101cab65e4d3daa86f80921e    readme.md
100644 blob 469758f0cbf222af23f055f1378d93c43fa0d75c    video.md
```
資訊顯示根目錄的Tree底下有3個Blob物件\
順道一提如果是Tree物件，前面的號碼是040000

## 3. Commit
commit的概念是更新本地的repo，和push為更新remote的repo不同\
commit的具體步驟：\
假設使用git commit -am，將tracked的檔案同時staged和commit
 1. 對於每個staged且commit的檔案，建立blob物件
 2. 建立tree物件的目錄，包含tree和blob的reference
 3. 建立commit物件，描述這次commit

## 4. Branch
branch像是一個pointer，一個貼紙，用貼紙比喻就是它會貼在main或master以外的某個commit上，有利於合作、平行開發\
而HEAD則會指向目前工作的分支上
```
git branch feature
git checkout feature
```
新增一個branch，並將HEAD指向feature這個branch\
新增feature這個branch具體會在.git/refs/heads/的目錄下創建feature檔案，內容是main最新commit的hash value
```
echo "New feature" > feature.txt
git add feature.txt
git commit -m "Add new feature"
```
假如在feature branch上做修改並commit，則.git/refs/heads/feature的檔案內容會變成自己branch最新commit的hash value\
branch開發到一個程度可以merge回main\
而branch就引伸出許多branch models\
包含Feature Branch Workflow, Git Flow, Github Flow等等，運用何種則依哪種工作要求而定。

## 5. Head
HEAD是指向目前checkout的branch或者當前的commit\
如果要知道HEAD目前的指向可以：
```
cat .git/HEAD
```
有可能顯示ref: refs/heads/main，表示目前HEAD指向main\
也可能顯示：96fa6899ea34697257e84865fefc56beb42d6390，表示HEAD目前指向某個commit\
而**Detached HEAD**的意思就是HEAD指向不關於任何branch的commit\
此時會面臨無法切換branch、做新的commit等等問題，git的歷史管理會出現問題。

## 6. Commit Style
當在團體協作時，無論是公司或學校專案的情境，讓大家了解各個commit在做甚麼是必要的事情\
因此我整理並依自己的狀況，試著發展出一套可行、美觀的Commit Style，資料參考自：
* ericavonb/git-commit-style-guide.md: https://gist.github.com/ericavonb/3c79e5035567c8ef3267
* Git Commit Message 這樣寫會更好，替專案引入規範與範例（WadeHuang的學習迷航記）: https://wadehuanglearning.blogspot.com/2019/05/commit-commit-commit-why-what-commit.html

在commit時的commit types應是最重要的一環，以下為table說明幾種實用的type: 

| Type          | Type Guide                                 |
| ------------- |:------------------------------------------:|
| docs          | 新增文字描述，如開發進度、註解等              |
| fix           | 針對main branch上的bug修復                  |
| refactor      | 既有功能不變，調整程式碼的邏輯flow、效率等等   |
| revert        | 還原至某個commit                            |
| chore         | 維護程式碼，如更新package                    |
| init          | 初始commit                                  |

以上是如果需要commit message時，使用的type commit style\
定義好type之後，則是剩下commit message的撰寫格式：

```
{type}({scope}): {subject}
<BLANK LINE>
({body})
{footer}
```
* scope描述這個改動專案的哪個module或檔案，可省略
* subject簡述這次commit的改動
* body細節描述這次commit的改動，可省略
* footer主要註明版號
* 使用revert時，格式應為 `revert: type(scope): subject(commit id)`

例如：

```
docs(readme.md): add instructions to xxx.js
issue 722
```
```
revert: refactor(api): refine xx event call logic for possible future expansions of the feature.
issue 309
```
```
chore(login): update xxx package 1.3 > 1.6
issue 920
```
而因為我想像的團隊模板是使用*GitHub Flow*或*Trunk-Based*等較為快速的branch model
所以若commit type是:

* feat（新增功能）
* hotfix（feature branch的bug修復）

則直接使用branch name替代commit message即可，閱讀和工作上會比較有效率
例如：
```
feat/issue309-add-forget-password
```
```
hotfix/issue722-fix-spelling-error
```

