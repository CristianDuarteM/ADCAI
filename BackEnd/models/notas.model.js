const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Notas = db.define("notas", {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        defaultValue: true,
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

module.exports = Notas;