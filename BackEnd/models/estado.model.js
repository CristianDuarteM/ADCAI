const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Estado = db.define("estado", {
    id: {
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
    }
});

module.exports = Estado;
