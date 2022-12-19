const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Periodo_docente_notas = db.define("periodo_docente_notas", {
    id_notas: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
            model: "Nota",
            key: "id"
        }
    },
    id_periodo_docente: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
            model: "Periodo_docente",
            key: "id"
        }
    }
});

module.exports = Periodo_docente_notas;