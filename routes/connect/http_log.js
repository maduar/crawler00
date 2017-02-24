/**
 * Created by maduar on 2017/2/23.
 */

const uuid = require('uuid'),
    moment = require('moment');

module.exports = {
    httpLog: function (  ) {
        return function ( req, res, next ) {


            const reg = /:|f/g;

            const ip = req.connection.remoteAddress
                        ? req.connection.remoteAddress.replace(reg, '')
                        : ( req.ip ? req.ip.replace(reg, '') : 0);

            const data = {
                ip: ip,
                log_uuid: uuid.v1().replace(/[-]/g, ''),
                pid: process.pid,
                url: req.url,
                method: req.method,
                timestamp: Date.parse(new Date()),
                create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                parameters: (req.method === 'POST') ? req.body : req.query
            };

            const parameters_sql = JSON.stringify(data.parameters);

            const sqlStr = `INSERT INTO secl_api VALUES
                            (
                                '${data.log_uuid}', '${data.ip}', '${data.url}', '${data.method}', 
                                '${parameters_sql}', '${data.timestamp}', '', '${config.app_id}', 'ACTIVE',
                                '${data.create_time}'
                              
                            )`;

            sequelize.query(sqlStr)
                .then(() => {
                    LogFile.info('api记录成功');
                })
                .catch(err => {
                    LogFile.info('log_api is wrong.', err);
                });


            LogFile.info(JSON.stringify(data));

            next();
        }

    }
}