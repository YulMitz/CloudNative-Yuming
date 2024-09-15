
1. Blob
Blob是一種git中檔案的基本單位，所有檔案"內容"都會被存成Blob的物件，而且有一個hash value作為唯一識別\
Blob的全名是Binary Large Object，以git來說會被儲存在.git/objects底下\
例如我今天創建一個hello.txt裡面只有一行叫hello world\
git會生成一個雜湊值A，作為Blob的名稱儲存在.git/objects中，而Blob檔案的內容為hello world用git格式壓縮的東西\
要是今天更改了hello.txt，以雜湊值A儲存的Blob檔案不會被改變，而是會用雜湊值B生成新的Blob檔案。\
這使得git可以來做版本控管

2. Tree

