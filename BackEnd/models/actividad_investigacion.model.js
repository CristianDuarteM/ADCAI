const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Actividad_investigacion = db.define("actividad_investigacion", {
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
    horas_minimas: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    horas_maximas: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    descripcion_horas: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    estado: {
        defaultValue: true,
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

module.exports = Actividad_investigacion;