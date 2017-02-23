/**
 * Created by maduar on 2017/2/23.
 */

const uuid = require('uuid');


module.exports = {
    httpLog: function (  ) {
        return function ( req, res, next ) {
            const ip = req.connection.remoteAddress || req.ip;
            const log_uuid = uuid.v1().replace(/[-]/g, '');
            const pid = process.pid;
            const url = '';

            LogFile.info(`{ log_uuid: '${log_uuid}',
                        errorInfo: '邮箱地址出错', 
                        errorAPI: '${req.url}', ip: '${ip}'
                        pid: '${pid}'}`);

            next();
        }

    }
}