const sequelize = require("../dbAccess");
const { Model, DataTypes } = require('sequelize');

class Payment extends Model {}

Payment.init( {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id"
    },
    payment_sum: {
        type: DataTypes.BIGINT,
    },
    process_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    client_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    sequelize: sequelize.db,
    modelName: 'payment',
    tableName: 'payments'
})

module.exports = { Payment }
