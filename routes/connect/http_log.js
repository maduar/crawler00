/**
 * Created by maduar on 2017/2/23.
 */

const uuid = require('uuid'),
    moment = require('moment'),
    myUtil = require('../util/myUtil'),
    Promise = require('bluebird');

module.exports = {
    httpLog: function (  ) {
        return function ( req, res, next ) {


            const reg = /:|f/g,
                ip = req.connection.remoteAddress
                        ? req.connection.remoteAddress.replace(reg, '')
                        : ( req.ip ? req.ip.replace(reg, '') : 0),
                data = {
                    ip: ip,
                    log_uuid: uuid.v1().replace(/[-]/g, ''),
                    pid: process.pid,
                    url: req.url,
                    method: req.method,
                    timestamp: Date.parse(new Date()),
                    create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                    parameters: (req.method === 'POST') ? req.body : req.query
                },
                parameters_sql = JSON.stringify(data.parameters),
                sqlStr = `INSERT INTO secl_api VALUES('${data.log_uuid}', '${data.ip}', '${data.url}', '${data.method}', 
                             '${parameters_sql}', '${data.timestamp}', '', '${config.app_id}', 'ACTIVE','${data.create_time}')`,
                exec_data = {
                    user_id: '',
                    api: data.url,
                    client_host: data.ip,
                    exec_sql: JSON.stringify(sqlStr),
                    exec_duration: 0
                };

            LogFile.info(JSON.stringify(data));

            return Promise.all([
                sequelize.query(sqlStr),
                myUtil.recodeExecSql(exec_data)
            ])
            .spread((data, result) => {
                next();
                LogFile.info('api记录成功');
            })
            .catch(err => {
                next();
                LogFile.info('log_api is wrong.', err);
            });

        }

    }
}