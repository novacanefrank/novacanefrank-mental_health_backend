const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const User = require('./UserModel');
const Exercises = require('./ExercisesModel');

const User_Exercises = sequelize.define('User_Exercises', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    exerciseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Exercises,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
}, {
    timestamps: true,
});

module.exports = User_Exercises;
