/**
 * Created by lintry on 16/4/16.
 */
"use strict";
var _ = require('lodash'),
    Promise = require('bluebird');
var enums = {
    ERROR: 'ERROR', //操作失败
    SUCCESS: 'SUCCESS', //操作成功
    EXPIRED: "EXPIRED", //链接过期，禁止进入系统
    PASS: "PASS", //登录成功，可以进入系统
    WRONG: "WRONG" //账号异常
};

/**
 * 创建返回结果对象
 * @param code 返回值
 * @param msg 操作提示
 * @param err 错误提示
 * @param content 相关数据
 * @returns {Result}
 * @constructor
 */
var Result = function (code, msg, err, content) {
    const util = require('util');

    if (!(this instanceof Result)) {
        return new Result(code, msg, err, content);
    }

    this.code = this.content = this.token = void 0;
    this.msg = msg;
    this.err = err;
    code && enums[code] && (this.code = enums[code]);
    //content && (this.content = content);
    if (content) {
        if(util.isObject(content) && 'toJSON' in content){
            content = content.toJSON();
        }
        this.content = content;
    } else {
        this.content = {};
    }

    /**
     * 返回一个自身为参数的promise
     */
    var me = this;
    this.promise = function () {
        return new Promise(function (resove) {
            resove(me);
        });
    };
    return this;
};

_.merge(Result, enums);

module.exports = Result;
