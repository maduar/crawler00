const express = require('express'),
    router = express.Router(),
    cheerio = require('cheerio'),
    fs = require('fs'),
    request = require('request'),
    Promise = require('bluebird'),
    config = require('./config'),
    verifyEmail = require('./util/myUtil').verifyEmail,
    mailAPI = require('./nodemailer').mailAPI,
    schedule = require('node-schedule'),
    uuid = require('uuid'),
    _ = require('lodash'),
    Result = require('./util/result'),
    moment = require('moment'),
    weather = require('./util/weather');



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
                    return res.send({status: 'success', code: "200", message: "发送成功", data: ""});
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
    var j = schedule.scheduleJob({hour: 8, minute: 10}, function(){
        console.log("send mail");
        request
            .get('http://http://127.0.0.1:3000/getCnblogsPages?email_url=maduar@163.com')
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
            $('.explore-feed').each((index, value) => {
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
                    return res.send({status: 'success', code: "200", message: "发送成功", data: ""});
                }
            });
        } else {
            LogFile.error('error', error);
            return res.send("error");
        }
    })
});

router.get('/getZhiHuCron', function(req, res, next) {

    const uuid = req.query.uuid;

    if (!uuid || uuid.length !== 32) return res.send('参数出错!');

    const sqlStr = `SELECT count(*) AS count FROM secb_verity WHERE uuid = '${uuid}' AND status = 'ENABLE'`;

    return sequelize.query(sqlStr)
        .then(data => {

            if (data && data[0].length > 0 && data[0][0].count === 1) {

                const j = schedule.scheduleJob({hour: 8, minute: 11}, function() {

                    const url = `${config.qcloudUrl}${config.zhiHuCronEmails}`;

                    request
                        .get( url )
                        .on( 'error', function ( err ) {
                            LogFile.error( err )
                        } );
                });

                res.send("知乎定时爬虫设置成功!");
            } else {
                res.send('参数不存在!');
            }

        })
        .catch(err => {
            LogFile.error('error', err);
            res.send('error');
        });
});

router.get('/test', function(req, res, next) {
    const city = 'CN101180101',
        city_zh = '郑州';

    const key = req.query.key;

    if (key !== config.key) return res.send('请输入正确的key');

    const j = schedule.scheduleJob({hour: 21, minute: 1}, function() {
        weather.getForecastCityWeather(city, (err, reesponse, body) => {

            if (err) return res.send(new Result(Result.ERROR, '查询失败', err || ''));

            const result = JSON.parse(body).HeWeather5[0].daily_forecast;

            const options = {
                name: `${config.people_info.girlfirend.second_name},郑州`,
                weather1: `${result[1].cond.txt_d},${result[1].cond.txt_n}.${result[1].uv}-${result[1].vis}度.`,
                weather2: `${result[2].cond.txt_d},${result[2].cond.txt_n}.${result[2].uv}-${result[2].vis}度`
            }

            const data = {
                sms_param: JSON.stringify(options),
                sms_template_code: config.alidayu_sdk.sms_template_code.girlfirend,
                rec_num: config.people_info.girlfirend.phone_number
            };


            return mailAPI.sendMessage(data, (error, response) => {
                if (!error) {
                    LogFile.info('send message data: ', data.sms_param);
                } else {
                    LogFile.error('send message error:  ', error);
                    console.log('NOT ok');
                }
            })

        })
    });
    return res.send('天气预报提醒设置成功');
});




function renderHtm(index, value) {
    const tmp = Number(index) + 1;
    const title = value.children[0].data;
    const href = value.attribs.href || value.children[1].children[0].attribs.href;
    const result = `<li>${tmp}: <a href="${href}">${title}</a></li>`;
    return result;
}

function renderZhiHuHtm(index, value) {
    const zhihu_url = "https://www.zhihu.com";
    const tmp = Number(index) + 1;
    const title = value.children[1].children[0].children[0].data;
    const href = zhihu_url + value.attribs.href;
    const auther = value.children[3].children[15].attribs['data-author-name'];
    const result = `<li>${tmp}: <a href="${href}">${title}</a>  作者: ${auther}</li>`;
    return result;
}


module.exports = router;
