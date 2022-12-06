const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Firma = db.define("firma", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    ruta_firma: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Firma;
