const {DataTypes} = require('sequelize');
const User = require("./UserModel")
const sequelize = require('../database/db');

const SetGoals = sequelize.define('SetGoals',{

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

    title:{
         type:DataTypes.INTEGER,
         allowNull:false
    },
     
     Date:{
        type:DataTypes.STRING,
        allowNull: false,
     },
     isCompleted:{
        type:DataTypes.BOOLEAN,
        defaultValue: false,
     }
    
    
});

module.exports = SetGoals;