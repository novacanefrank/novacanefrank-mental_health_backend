const {DataTypes} = require('sequelize');
const User = require("./UserModel")
const sequelize = require('../database/db');

const Note = sequelize.define('Notes',{

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
     
     Message:{
        type:DataTypes.STRING,
        allowNull: false,
     },
     Date:{
        type:DataTypes.STRING,
        allowNull: false,
     },

    
    
});
Note.belongsTo(User, { foreignKey: "userId" });

module.exports = Note;