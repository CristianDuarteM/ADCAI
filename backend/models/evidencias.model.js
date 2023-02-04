const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Evidencia = db.define("evidencia", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_periodo: {
        type: DataTypes.INTEGER,
        references: {
            model: "Periodo_docente",
            key: "id"
        }
    }
});

module.exports = Evidencia;
