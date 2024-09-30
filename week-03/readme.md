## 1. 什麼是 AWS Region, AZ (availability zones)
* ### AWS Region和AZ
一個AWS Region對應到一個架設實體伺服器的地區\
而一個Region上有多個AZ，AZ是一種Logical Data Center，一個AZ對應到數個實體的資料中心
* ### VPC、Subnets和AZ的關係
VPC代表一個虛擬的網絡區域，被區分為多個subnets，我們程式則部屬在這些subnets上面\
而一個subnets對應到一個AZ，故我們需要確保我們部屬的subnets分散在多個AZ上，以確保安全性、可用性

## 2. 如果你要使用 AWS 服務，你會怎麼選擇用哪個 Region，考慮的因素有哪些？
* 地域規範的考量：每個地區可能會有些Local的規範，如資料存取、流動的規範
* 租用成本：每個地區的租用成本也會不一樣
* 延遲：延遲通常取決於物理距離，通常和租用成本一同考量
* 支援：每個地區可能有特別的支援、功能、方案，也許會有利於專案可以考慮
