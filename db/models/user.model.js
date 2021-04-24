const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbAccess')

class User extends Model {}

User.init( {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id"
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    second_name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelize.db,
    modelName: 'user',
    tableName: 'users'
})

module.exports = { User }
