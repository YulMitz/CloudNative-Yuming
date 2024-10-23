Instance Public IP: http://15.168.60.150

### 1. 什麼是 instance type?
是 AWS Cloud 服務下 virtual machine 租用的服務，在AWS維護的硬體基礎設施下，instance 的可擴展性高、容錯高，可以依據自己的需求配置各種不同規格的 instances，例如 T2, T3 系列就是具備基本運算性能的基礎規格，可以建立簡單的服務原型或微服務等。其他還有 C, R, P 等等不同的規格系列，分別對應到密集運算型、高記憶體需求、圖形運算密集型等等用途，依據自身需求可以彈性選擇需要的 instances.  
*Refs.*  
https://aws.amazon.com/what-is/cloud-instances/  
https://aws.amazon.com/tw/ec2/instance-types/  

### 2. 什麼是 Nginx？有哪些用途與特性？
Nginx 是一款 web server software，除了正常伺服器的功能之外，也可以作為 reverse proxy, loads balancer 和 http cache。  
Nginx 原本是俄羅斯工程師 Igor Sysoev 解決 c10k 問題時開發出的程式，後來越用越廣，在2011年正式被投資商用。  
*Refs.*  
https://en.wikipedia.org/wiki/Nginx  

### 3. pm2 套件是什麼？有什麼用處？
pm2 套件是管理 Node.js 程式的一個管理程式，pm2有一套簡單的方法管理 Node.js 的程式，包含確保程式的順利運作，可以監控程式的 CPU 用量、記憶體用量，log 集中管理等等。  
*Refs.*  
https://alerty.ai/blog/node-pm2  

### 4. 步驟 9 中提到的 proxy 是什麼意思？為什麼要透過 Nginx 來 proxy 到 Express 開發的 Web Server?
proxy是一種網路中兩個端點間（client和server）的中介，正向代理是一種幫用戶傳遞請求，並保護使用者的方式。Nginx屬於反向代理，他能夠保護伺服器的真實IP位置、當作緩存達到更快的 respond 速度，也能夠過濾各種來源的請求，達到伺服器的穩定和安全等等需求。  
*Refs.*  
https://www.inodeninja.net/what-is-reverse-proxy/  

### 5. 在 readme 中提供步驟 9 的 Nginx 設定檔
```
   server {
    listen 80;
    server_name 15.168.60.150;  # instance's public IP

    location / {
        proxy_pass http://localhost:4000;  # Express app's port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 6. Security Group 是什麼？用途為何？有什麼設定原則嗎？
Security Group是連線到AWS instances的一組安全性規則，簡單來說就是虛擬的防火牆，一個 security group可以套用到多個 instances，一個 instance 也可以套用多個 security group  
我認為在使用 security group 得以簡潔為主，看情況選擇多對一或者是一對多即可，為了避免複雜，就不要使用多對多的 security group 設定方式。  
最後是避免使用 default 的 security group，因為可能會造成管理上的小困擾，例如忘記 default setting 是甚麼之類的，而 default 也通常是 inbound, outbound 全開，所以也並不安全。  
*Refs.*  
https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html  

### 7. 什麼是 sudo? 為什麼有的時候需要加上 sudo，有時候不用？
在Linux作業系統中，如果是修改系統檔案、config、管理程序進行等等需要較高權限的指令都需要 sudo  
使用者層次的指令例如更改路徑，或在系統目錄以外 cat, touch 等等都可以不用加 sudo  

### 8. Nginx 的 Log 檔案在哪裡？你怎麼找到的？怎麼看 Nginx 的 Log？
在 /var/nginx/log 中，因為透過200秒了解 Linux 目錄的那個影片有提到，var 這個目錄通常放著系統或應用程式的暫存、數據、log 等等，就朝著這個方向去問了 Claude  
使用 `sudo nano access.log.x` 就可以看到 nginx 的 log  

### 9. 列出完成本作業時參考的資料
為了方便檢索，所以參考資料我放在各小題的結尾
