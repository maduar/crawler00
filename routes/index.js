var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');
var config = require('./config');
const verifyEmail = require('./util/myUtil').verifyEmail;
const mailAPI = require('./nodemailer').mailAPI;
const schedule = require('node-schedule');
const uuid = require('uuid');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/getPages', function(req, res, next) {
    request('http://www.cnblogs.com/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            const arrays = [];
            $('.titlelnk').each((index, value) => {
                arrays.push({index: index, href: value.attribs.href, title: value.children[0].data});
            });
            res.render('index', { title: arrays });
        } else {
            LogFile.error('error', error);
            return res.render('index', { title: 'error' });
        }
    })
});


router.get('/getCnblogsPages', function(req, res, next) {

    const email_url = req.query.email_url;
    if(!email_url || !verifyEmail(email_url)) {
        LogFile.error(`{ errorInfo: '邮箱地址出错', errorAPI: '/getZhihuDailyHot', ip: '${ip}'}`);
        return res.send("邮箱地址出错");
    }

    request('http://www.cnblogs.com/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            let result = `<ul>`;
            $('.titlelnk').each((index, value) => {
                result += renderHtm(index, value);
            });
            result += `</ul>`;
            mailAPI.sendMail(config.mail.mailServerMe, {
                to: email_url,
                subject: '博客园首页20篇文章',
                text: "11",
                html: result,
                type: "mail",
                typeMessage: "Me"
            }, function(err, info) {
                if(err)  {
                    LogFile.error('error', error);
                    return res.render('index', { title: 'error' });
                } else {
                    return res.send("OK");
                }
            });
        } else {
            return res.send("error");
        }
    })
});


router.get('/getCron', function(req, res, next) {

    let startTime = new Date(Date.now() + 5000);
    let endTime = new Date(startTime.getTime() + 5000);
    // var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '* * * * * *' }, function(){
    var j = schedule.scheduleJob({hour: 9, minute: 50}, function(){
        console.log("send mail");
        request
            .get('http://115.159.70.195:3000/getCnblogsPages?email_url=maduar@163.com')
            .on('error', function(err) {
                LogFile.error('error', err);
            })
    });

    return res.send("set cron OK!");
});


router.get('/getZhihuDailyHot', function(req, res, next) {

    const ip = req.connection.remoteAddress || req.ip;
    const log_uuid = uuid.v1().replace(/[-]/g, '');
    const pid = process.pid;

    const email_url = req.query.email_url;
    if(!email_url || !verifyEmail(email_url)) {
        LogFile.error(`{ log_uuid: '${log_uuid}',errorInfo: '邮箱地址出错', errorAPI: '/getZhihuDailyHot', ip: '${ip}'
                        pid: '${pid}'}`);
        return res.send("邮箱地址出错");
    }

    request('https://www.zhihu.com/explore', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body) // Show the HTML for the Google homepage.
            const $ = cheerio.load(body);
            let result = `<ul>`;
            $('h2 .question_link').each((index, value) => {
                result += renderZhiHuHtm(index, value);
            });
            result += `</ul>`;
            mailAPI.sendMail(config.mail.mailServerMe, {
                to: email_url,
                subject: '知乎每日热门文章',
                text: "11",
                html: result,
                type: "mail",
                typeMessage: "Me"
            }, function(err, info) {
                if(err) {
                    LogFile.error('error', err);
                    return res.render('index', { title: 'error' });
                } else {
                    return res.send("OK");
                }
            });
        } else {
            LogFile.error('error', error);
            return res.send("error");
        }
    })
});

router.get('/getZhiHuCron', function(req, res, next) {

    let startTime = new Date(Date.now() + 5000);
    let endTime = new Date(startTime.getTime() + 5000);
    // var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '* * * * * *' }, function(){
    var j = schedule.scheduleJob({hour: 8, minute: 11}, function(){
        console.log("send mail");
        request
            .get('http://115.159.70.195:3000/getZhihuDailyHot?email_url=maduar@163.com\,493106537@qq.com')
            .on('error', function(err) {
                LogFile.error(err)
            })
    });

    return res.send("set cron OK!");
});

function renderHtm(index, value) {
    const tmp = Number(index) + 1;
    const title = value.children[0].data;
    const href = value.attribs.href;
    const result = `<li>${tmp}: <a href="${href}">${title}</a></li>`;
    return result;
}

function renderZhiHuHtm(index, value) {
    const zhihu_url = "https://www.zhihu.com";
    const tmp = Number(index) + 1;
    const title = value.children[0].data;
    const href = zhihu_url + value.attribs.href;
    const result = `<li>${tmp}: <a href="${href}">${title}</a></li>`;
    return result;
}


module.exports = router;
