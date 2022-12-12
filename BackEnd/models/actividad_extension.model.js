const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Actividad_extension = db.define("actividad_extension", {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estado: {
        defaultValue: true,
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    listar: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

module.exports = Actividad_extension;