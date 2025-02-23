const {DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const User = require('./UserModel');


const Exercises = sequelize.define('exercises', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title :{
        type:DataTypes.STRING,
        allowNull:false
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
  
}, {
    timestamps: true,
});
Exercises.belongsTo(User, { foreignKey: "userId" });

module.exports = Exercises;
