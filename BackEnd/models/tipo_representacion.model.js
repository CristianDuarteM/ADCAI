const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Tipo_representacion = db.define("tipo_representacion", {
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
        defaultValue: false,
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    estado: {
        defaultValue: true,
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

module.exports = Tipo_representacion;