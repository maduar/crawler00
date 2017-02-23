"use strict";
/**
 * 原生实体类
 * @param sequelize
 * @param DataTypes
 * @returns {{option: {timestamps: boolean, createdAt: string, updatedAt: string, freezeTableName: boolean}, entity: {create_id: {type: *}, create_code: {type: *}, create_name: {type: *}, create_date: {type: *}, optr_id: {type: *}, optr_code: {type: *}, optr_name: {type: *}, optr_date: {type: *}}}}
 */
module.exports = function(sequelize, DataTypes) {
  return {
    option: {
      timestamps: false,
      underscored: true,
      freezeTableName: true
    },
    entity: {}
  }
};
