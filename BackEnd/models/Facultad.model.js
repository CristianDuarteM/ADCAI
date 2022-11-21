const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Facultad = db.define("Facultad", {
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

module.exports = Facultad;