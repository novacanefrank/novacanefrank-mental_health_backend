const{Sequelize}=require("sequelize");

Sequelize

const sequelize=new Sequelize('test','postgres','admin123',{
    host:'localhost',
    dialect:'postgres',
    port:5432,
    logging:false,
})
async function testConnection() {
    try{
        await sequelize.authenticate();
        console.log('DB connection successful..................................')

    }
    catch(error){
        console.error('Unable to connect ti the database.......................',error)

    }
    
}
testConnection()

module.exports=sequelize
