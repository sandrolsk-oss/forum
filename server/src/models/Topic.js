import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Topic = sequelize.define('Topic', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    tableName: 'topics',
    createdAt: 'created_at',
    updatedAt: false,
});

export default Topic;
