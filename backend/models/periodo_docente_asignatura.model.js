const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Periodo_docente_asignatura = db.define("periodo_docente_asignatura", {
    id_asignatura: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
            model: "Asignatura",
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
    },
});

module.exports = Periodo_docente_asignatura;