"use strict";
/**
 * 用户授权表
 */
module.exports = function(sequelize, DataTypes) {
    const
        Base = sequelize.import('./abstract/base'), //基础类定义
        _ = require('lodash');

    let option = _.merge({}, Base.option, {
        tableName: 'secb_verity'
    });

    let entity = _.merge({
        "uuid": {
            "type": DataTypes.STRING(40),
            "comment": "标识",
            "field": "uuid",
            "allowNull": false,
            "primaryKey": true
        }
    }, Base.entity, {
        "status": {
            "type": DataTypes.STRING(10),
            "comment": "企业ID",
            "field": "status",
            "allowNull": false
        }
    });

    var Auth =  sequelize.define('auth', entity, option);

    return Auth;

};
