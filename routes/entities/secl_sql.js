/**
 * Created by maduar on 26/05/2017.
 */
"use strict";
/**
 * 用户表
 */
module.exports = function(sequelize, DataTypes) {
    const
        Base = sequelize.import('./abstract/base'), //基础类定义
        _ = require('lodash');

    let option = _.merge({}, Base.option, {
        tableName: 'secl_sql'
    });

    let entity = _.merge({
        "id": {
            "type": DataTypes.STRING(40),
            "comment": "标识",
            "field": "id",
            "allowNull": false,
            "primaryKey": true
        }
    }, Base.entity, {
        "user_id": {
            "type": DataTypes.STRING(40),
            "comment": "用户ID",
            "field": "user_id",
            "allowNull": false
        },
        "exec_time": {
            "type": DataTypes.DATE,
            "comment": "执行时间",
            "field": "exec_time",
            "allowNull": false
        },
        "exec_api": {
            "type": DataTypes.STRING(100),
            "comment": "执行api名称",
            "field": "exec_api",
            "allowNull": false
        },
        "client_host": {
            "type": DataTypes.STRING(20),
            "comment": "IP地址",
            "field": "client_host",
            "allowNull": false
        },
        "exec_sql": {
            "type": DataTypes.STRING(10),
            "comment": "执行sql",
            "field": "exec_sql",
            "allowNull": false
        },
        "exec_duration": {
            "type": DataTypes.INTEGER,
            "comment": "执行时间",
            "field": "exec_duration",
            "allowNull": false
        },
        "duration_unit": {
            "type": DataTypes.STRING(10),
            "comment": "执行单位",
            "field": "duration_unit",
            "allowNull": false
        },
        "exec_result": {
            "type": DataTypes.STRING(10),
            "comment": "执行结果",
            "field": "exec_result",
            "allowNull": false
        }
    });

    var SeclSql =  sequelize.define('secl_sql', entity, option);

    return SeclSql;

};
