/**
 * Sequelize初始化
 */
"use strict";
global.sequelize = global.sequelize = function () {
    const Sequelize = require('sequelize'),
        path = require('path'),
        config = require('../config'),
        config_sequelize = config.sequelize,
        sequelize = new Sequelize(config_sequelize.database,
        config_sequelize.username, config_sequelize.password, config_sequelize.options);


    sequelize.sync().then(function () {
        LogFile.info('msyql  init finished!');
    });

    return sequelize;
}();

module.exports = global.sequelize;
