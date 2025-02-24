const {DataTypes} = require('sequelize');
const User = require('../model/UserModel');
const sequelize = require('../database/db');

const JournalEntry = sequelize.define('JournalEntries',{

    id:{
       type: DataTypes.INTEGER,
       primaryKey: true, 
       autoIncrement: true,
    },
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
        type: DataTypes.STRING,
        allowNull:false,

    },

    entry:{
        type:DataTypes.STRING,
        allowNull:false,

    },
     
     Date:{
        type:DataTypes.STRING,
        allowNull: false,
     },
    
    
});

JournalEntry.belongsTo(User, { foreignKey: "userId" });
module.exports = JournalEntry;