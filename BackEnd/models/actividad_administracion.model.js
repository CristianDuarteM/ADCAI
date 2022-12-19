const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Actividad_administracion = db.define("actividad_administracion", {
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
    listar: {
        defaultValue: true,
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    estado: {
        defaultValue: true,
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

module.exports = Actividad_administracion;