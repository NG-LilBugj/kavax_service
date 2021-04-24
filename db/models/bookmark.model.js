const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbAccess');

class Bookmark extends Model {}

Bookmark.init( {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id"
    },
    type: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    bookmark_note: {
        type: DataTypes.BLOB
    }
}, {
    sequelize: sequelize.db,
    modelName: 'bookmark',
    tableName: 'bookmarks'
})

module.exports = { Bookmark }
