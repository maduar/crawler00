/**
 * Created by zzzzzz on 2016/9/27.
 */
const path = require('path');
const fs = require('fs');
const _loggerMSG = config.log_floder.loggerMSG;
const _loggerMSGPath = path.join(__dirname, '../', config.log_path, _loggerMSG, config.app);
module.exports = {
    "appenders":
        [
            {
                "type":"console",
                "category":"console"
            },
            {
                "category": _loggerMSG,
                "type": "dateFile",
                "filename":  _loggerMSGPath,
                "alwaysIncludePattern": true,
                "pattern": "-yyyy-MM-dd.log"

            }
        ],
    "replaceConsole": true,
    levels : {
        _loggerMSG: 'ALL'
    }
}

module.exports.createFloder = function() {
    const log_path = path.join(__dirname, '../', config.log_path);
    const loggerMSG_path = path.join(__dirname, '../', config.log_path, _loggerMSG);

    if(!fs.existsSync(log_path)) fs.mkdirSync(log_path);
    if(!fs.existsSync(loggerMSG_path)) fs.mkdirSync(loggerMSG_path);
}
