/**
 * Created by maduar on 16/03/2017.
 */

const cheerio = require('cheerio'),
    fs = require('fs'),
    request = require('request'),
    Promise = require('bluebird'),
    schedule = require('node-schedule'),
    uuid = require('uuid'),
    _ = require('lodash'),
    Result = require('./result'),
    moment = require('moment'),
    weather = config.heweather;

module.exports = {

    getNowCityWeather: function (city, callback) {

        const options = {
            url: `https://api.seniverse.com/v3/weather/daily.json?location=${city}&key=rhcbfiurv70a8oxu&language=zh-Hans&unit=c`,
            headers: {
                'User-Agent': 'request'
            }
        };

        LogFile.info('url', options.url);
        request(options, (error, response, body) => {
            callback(error, response, body);
        });

    },

    getForecastCityWeather: function (city, callback) {

        const options = {
            url: `${weather.baseUrl}${weather.forecastUrl}?city=${city}&key=${weather.key}`,
            headers: {
                'User-Agent': 'request'
            }
        };

        LogFile.info('url', options.url);
        request(options, (error, response, body) => {
            callback(error, response, body);
        });

    }

}
