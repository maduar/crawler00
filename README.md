# 安装
npm install
# 运行
node run start

# 爬取
 1. 爬知乎
    浏览器窗口调用： http://localhost:3000/getZhihuDailyHot?email_url=maduar@163.com
 2. 爬博客园: http://localhost:3000/getCnblogsPages?email_url=maduar@163.com 
 
###### ps: email_url后面网址改为自己的邮箱地址
 
 
### 记录
1. 爬取博客园首页的文章列表，并用邮件发送到指定邮箱。
2. 爬取知乎每日热门文章的功能暂未开发完毕。
3. 定时器有些bug
4. 增加运行日志

### bug修复: 1. 定时器bug已修复，原因--服务器使用的是西八区时间，程序设置的是东八区时间！
