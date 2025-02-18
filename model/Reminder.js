const {Sequelize, DataTypes} = require('sequelize');
const User = require("./UserModel")

const sequelize = require('../database/db');

const Reminder = sequelize.define('Reminder',{

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
     
     Date:{
        type:DataTypes.STRING,
        allowNull: false,
     },
     Message:{
        type:DataTypes.STRING,
        allowNull:false,
     }
    
    
});

module.exports = Reminder;