const {Sequelize, DataTypes} = require('sequelize');
const User = require("./UserModel")

const sequelize = require('../database/db');
const { defaultValueSchemable } = require('sequelize/lib/utils');

const MoodTracker = sequelize.define('MoodTracker',{

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
     Status:{
        type:DataTypes.BOOLEAN,
        defaultValue: false,
     }
    
    
});

module.exports = JounalEntry;