const sequelize = require("../dbAccess");
const { Model, DataTypes } = require('sequelize');

class Process extends Model {}

Process.init( {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id"
    },
    status: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    estimated_cost: {
        type: DataTypes.BIGINT,
    },
    bookmark_id: {
        type: DataTypes.BIGINT,
    }
}, {
    sequelize: sequelize.db,
    modelName: 'process',
    tableName: 'processes'
})

module.exports = { Process }
