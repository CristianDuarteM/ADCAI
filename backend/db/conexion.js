const {Sequelize} = require("sequelize");

const db = new Sequelize(process.env.NOMBRE, process.env.USUARIO, process.env.CONTRASENNA,{
    host:process.env.HOST,
    dialect: "mysql",
    define: {
        freezeTableName: true,
        
    },
    //logging: true
});


module.exports = db;