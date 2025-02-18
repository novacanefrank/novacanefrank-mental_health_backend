const {Sequelize, DataTypes} = require('sequelize');
const User = require("./UserModel")

const sequelize = require('../database/db');

const Note = sequelize.define('Note',{

    id:{
       type: DataTypes.INTEGER,
       primaryKey: true, 
       autoIncrement: true,
    } ,
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
        onDelete: "CASCADE",
    },
     
     Description:{
        type:DataTypes.STRING,
        allowNull: false,
     },
    
    
});

module.exports = Exercises;