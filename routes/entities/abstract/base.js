/**
 * Created by maduar on 23/02/2017.
 */
"use strict";
/**
 * 基础实体类定义
 * @param sequelize
 * @param DataTypes
 * @returns {{option: {timestamps: boolean, createdAt: string, updatedAt: string, freezeTableName: boolean}, entity: {create_id: {type: *}, create_code: {type: *}, create_name: {type: *}, create_date: {type: *}, optr_id: {type: *}, optr_code: {type: *}, optr_name: {type: *}, optr_date: {type: *}}}}
 */
module.exports = function(sequelize, DataTypes) {
    return {
        option: {
            timestamps: true,
            createdAt: 'create_date',
            updatedAt: 'modify_date',
            underscored: true,
            freezeTableName: true
        },
        entity: {
            create_id: {
                type: DataTypes.STRING(40)
            },
            create_date: {
                type: DataTypes.DATE
            },
            modify: {
                type: DataTypes.STRING(40)
            },
            modify_date: {
                type: DataTypes.DATE
            },
            timestamp: {
                type: DataTypes.BIGINT
            }
        }
    }
};

