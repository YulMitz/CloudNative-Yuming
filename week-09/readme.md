﻿連線
 `ssh -i ~/.ssh/cloudnative-hw6.pem ubuntu@ec2-43-207-80-207.ap-northeast-1.compute.amazonaws.com`

## Debug 1

要用 nano 時，發現 Ubuntu 上面已經沒有儲存空間

### Evidence:
![Evidence1.](/assets/img-week-09/evidence1.jpg "Evidence1")
### Solution:

清掉多餘的空間

```
df -h # Display available spaces in the disk
# -h human readable
```
用 du 去抓可能 log 或 cache 過大的檔案
```
sudo du -shc ./* | sort -hr # Display file size in a directory
# -s depth=0
# -h human readable
# -c sum total
# sort -hr order the sizes
```
### Outcome:
先找 /var/cache/*
![Evidence2.](/assets/img-week-09/evidence2.jpg "Evidence2")
再找 /var/log/*
![Evidence3.](/assets/img-week-09/evidence3.jpg "Evidence3")
抓到了！
![Evidence4.](/assets/img-week-09/evidence4.jpg "Evidence4")
## Debug 2
開始抓 nginx config 裡面的問題
### Evidence:
可以發現 nginx.conf 裡面的第八行多了一個分號：
![Evidence5.](/assets/img-week-09/evidence5.jpg "Evidence5")
快速修好之後，進而發現：
![Evidence6.](/assets/img-week-09/evidence6.jpg "Evidence6")
發現有 process 在佔用 port80
### Solution:
```
sudo lsof -i :80 # List process that occupying port 80
```
```
sudo kill <PID> # Once find it, kill it
```
發現 srv process 事實上是一個 web service，確定 status 後發現可以直接 kill 掉：
![Evidence7.](/assets/img-week-09/evidence7.jpg "Evidence7")
看似沒問題了：
![Evidence8.](/assets/img-week-09/evidence8.jpg "Evidence8")
好，不可能這麼簡單
![Evidence9.](/assets/img-week-09/evidence9.jpg "Evidence9")
## Debug3
nginx.conf 和 sites-available/default 之間可能會有衝突\
在 default 中發現 root 和 error_log 的路徑好像怪怪的\
myweb/error.log 看起來就很可疑：
![Evidence10.](/assets/img-week-09/evidence10.jpg "Evidence10")
所以真正的 root 應該在 /var/myweb?
![Evidence11.](/assets/img-week-09/evidence11.jpg "Evidence11")
### Solution:
root 應該就是在 /var/myweb
所以把 error_log 那行刪掉，因為跟 nginx.conf 裡面衝突了
## Debug4
發現 curl localhost 之後出現 403 forbidden
### Evidence:
![Evidence14.](/assets/img-week-09/evidence14.jpg "Evidence14")
### Solution:
第一感覺得是權限問題
```
sudo chmod -R 777 /var/myweb # Give all permission to user www-data
````
![Evidence15.](/assets/img-week-09/evidence15.jpg "Evidence15")
成功了！
## 作業心得
### 一定要用紙筆定期整理思緒
當初在檢查 nginx.conf 和 sites-available/default 時，會有點亂掉，忘記誰跟誰衝突，誰又會把誰蓋掉，要記得定期停下來用紙筆整理。
### 認識很多檢查系統狀態的工具
例如 sudo lsof 就是一個萬用的工具，它可以用來檢查某個 process 是否占用某個 port、開啟哪些資料夾或者檔案等等。
### 撞牆很正常
其實我省略了蠻多撞牆的過程，比如說確認 largefile 到底能不能刪、403 forbidden 是不是防火牆的問題等等\
撞牆的過程也會更了解對應工具的工作模式：\
例如 nginx 的主要設定檔是 nginx.conf\
次要設定檔是： /conf.d /sites-* \
而 conf.d 的順位又高於 /site-* 有這樣的認識之後，就能知道具體的衝突關係了
