
### 1. 你的網址
https://www.mulooo.com  

### 2. 你在哪裡購買網域的
GoDaddy  

### 3. DNS 的 A record 是什麼？
最主要定義網域名稱的 record，在GoDaddy中，Name 可以設定子網域類型（可以@設定為空），Data 為設定要指向的IP。  

### 4. DNS 的 NS record 是什麼？
NS record是指定網域使用的 DNS server，意思是對應的 DNS server 可以告訴網路一個網域名稱對應的IP地址，通常我們會設定多個 NS record 確保連線的可靠性。  

### 5. Domain Name vs FQDN vs URL 這三者分別為何？
Domain Name是方便記錄網路地址的命名方式，通常包含 Subdomain, Second-level Domain和 Top-level Domain  
滿足三個層次的 domain name，在 DNS 系統中可以被唯一定址，故被稱為 FQDN  
URL 則是在 FQDN 之上，滿足特定格式的網路統一定位標準，簡單講就是網指，URL 必須包含通訊協定、子網域、網域名稱，後面的路徑可有可無。  

### 6. 為什麼應該要為網站加上憑證？而不是直接用 http 就好？
安全性，客戶和伺服器端之間傳送的資訊會被加密，不會被偷看或截斷等等。
