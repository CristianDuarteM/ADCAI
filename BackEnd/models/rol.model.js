const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Rol = db.define("rol", {
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

module.exports = Rol;
