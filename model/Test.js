const{Datatypes}=require('sequelize');
const sequelize=require('../Mental_health_backend/database/db');
const Test=sequelize.define('Test',{
    id:{
        type: Datatypes.INTEGER,
        primarykey:true,
        autoIncrement:true,
    },
    name:{
        type: Datatypes.String,
        unique:true,
        allowNull:false,
    },
    password:{
        type:Datatypes.STRING,
        allowNull:false
    }
})
module.exports=Test;