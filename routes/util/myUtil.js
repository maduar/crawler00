/**
 * Created by maduar on 10/02/2017.
 */

const uuid = require('uuid'),
    path = require('path');


//验证单个邮箱地址
function verifyEmail(email) {
    var reg = /^[a-z_0-9.-]{1,64}@([a-z0-9-]{1,200}.){1,5}[a-z]{1,6}$/;
    return email.match(reg) ? true : false;
}
module.exports = {
    //验证单个，或者以‘，’链接的多个邮箱地址
    verifyMultipleEmail: function(email) {
        var _result = false;
        var _temp = '';
        if(email.indexOf('\,') === (-1)) {
            _result = verifyEmail(email);
            return _result;
        }

        var _array = email.split("\,");
        if(_array.length === 0) return _result;
        _result = true;
        _array.forEach(function(value, index, full) {
            _temp = value.replace(' ', '');
            if(!verifyEmail(_temp)) {
                _result = false;
            }
        })
        return _result;
    },

    recodeExecSql: function (data) {

        const parameters = {
            id: uuid.v1().replace(/[-]/g, ''),
            user_id: data.user_id || '',
            exec_time: Date.parse(new Date()),
            exec_api: data.api,
            client_host: data.client_host,
            exec_sql: '', //data.exec_sql,
            exec_duration: data.duration ?  Number(data.duration) : 0,
            duration_unit: '0',
            exec_result: 'SUCCESS'
        }

        const sqlStr = `INSERT INTO secl_sql VALUES(
                        '${parameters.id}', '${parameters.user_id}', '${parameters.exec_time}', '${parameters.exec_api}', 
                        '${parameters.client_host}', '${parameters.exec_sql}', ${parameters.exec_duration} , '${parameters.duration_unit}', 
                        '${parameters.exec_result}')`;

        const createObj = {
            id: parameters.id,
            user_id: parameters.user_id,
            exec_time: parameters.exec_time,
            exec_api: parameters.exec_api,
            client_host: parameters.client_host,
            exec_sql: parameters.exec_sql,
            exec_duration: parameters.exec_duration,
            duration_unit: parameters.duration_unit,
            exec_result: parameters.exec_result
        }

        const SeclSql = sequelize.import('../entities/secl_sql.js');
        return SeclSql
            .create(createObj)
            .then((data) => {
                console.log();
            })
            .catch(err => {
                LogFile.info('log_api is wrong.', err);
            });
    },

    getUuid: function () {
        return uuid.v1().replace(/[-]/g, '');
    },

    getTimestamp: function () {
        return Date.parse(new Date());
    }
};

module.exports.verifyEmail = verifyEmail