/**
 * Created by danny on 16/9/21.
 */
var nodemailer = require('nodemailer');
var config = require('../../config');
const alidayu_sdk = config.alidayu_sdk,
    TopClient = require('../../ali-sdk/lib/api/topClient.js').TopClient,
    _ = require('lodash'),
    Promise = require('bluebird'),
    Result = require('../../util/result'),
    has = Object.prototype.hasOwnProperty;


module.exports = {
    sendMail: function(configue, _obj, callback) {
        var _mailServer = nodemailer.createTransport(configue);

        var _senderInfo = config[_obj.type][_obj.type + "Server" + _obj.typeMessage].auth.user;

        // set sender
        _obj.from = _senderInfo;

        _mailServer.sendMail(_obj, function(err, info) {
            callback(err, info);
        });
    },

    sendMessage: function(data, callback) {

        const regPhoneNumber = /1[\d]{10}/;

        if (typeof data !== 'object') return new Result(Result.ERROR, '参数类型错误');

        if (!data
            || !has.call(data, 'sms_template_code')
            || !has.call(data, 'sms_param')
            || !has.call(data, 'rec_num')
            ) return new Result(Result.ERROR, '参数出错');

        if (!regPhoneNumber.test(data.rec_num)) return new Result(Result.ERROR, '手机号出错');

        const msgConfig = {
                extend: '123456',
                sms_type: alidayu_sdk.sms_type,
                sms_free_sign_name: alidayu_sdk.sms_free_sign_name,
                sms_template_code:data.sms_template_code,
                rec_num: data.rec_num,
                sms_param: data.sms_param
            },
            client = new TopClient({
                'appkey': alidayu_sdk.appkey,
                'appsecret': alidayu_sdk.appsecret,
                'REST_URL': alidayu_sdk.REST_URL
            });

        client.execute(alidayu_sdk.exec_url, msgConfig, function(error, response) {
            callback(error, response);
        })
    }
}