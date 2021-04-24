const sequelize = require("../dbAccess");
const { Model, DataTypes } = require('sequelize');

class Device extends Model {}

Device.init( {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id"
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.BLOB,
    },
    owner_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    device_status: {
        type: DataTypes.SMALLINT,
        allowNull: false
    }
}, {
    sequelize: sequelize.db,
    modelName: 'device',
    tableName: 'devices'
})

module.exports = { Device }
