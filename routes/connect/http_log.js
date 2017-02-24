/**
 * Created by maduar on 2017/2/23.
 */

const uuid = require('uuid');


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
                parameters: (req.method === 'POST') ? req.body : req.query
            };

            LogFile.info(JSON.stringify(data));

            next();
        }

    }
}