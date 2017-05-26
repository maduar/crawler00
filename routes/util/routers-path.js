/**
 * 定义路由目录
 */
"use strict";


module.exports = function() {
    const fs = require('fs');
    const path = require('path');
    const config = global.config || {},
        config_path = config.path || {},
        ROUTER_PATH = config_path.ROUTERS_PATH || 'routers',
        ENTITIES_PATH = config.url.entityUrl
        ;

    return {
        /**
         * 列出router下的子目录
         * @return {Array}
         */
        list: function() {
            let files = fs.readdirSync(ROUTER_PATH);
            let folders = [];
            files.forEach(function(file){
                '.DS_Store' !== file && fs.statSync(path.resolve(ROUTER_PATH, file)).isDirectory() && folders.push(file);
            });
            return folders;
        },
        /**
         * 列出entities下的实体类文件
         * @deprecated
         * @return {Array}
         */
        entities: function() {
            let files = fs.readdirSync(ENTITIES_PATH);
            let folders = [];
            files.forEach(function(file){
                let file_name = path.resolve(ENTITIES_PATH, file);
                '.DS_Store' !== file && fs.statSync(file_name).isFile() && folders.push(file_name);
            });
            return folders;
        }
    };
}();