const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Periodo_docente_actividad_investigacion = db.define("periodo_docente_actividad_investigacion", {
    id_actividad_investigacion: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
            model: "Actividad_investigacion",
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
    horas:{
        type: DataTypes.DOUBLE
    }
});

module.exports = Periodo_docente_actividad_investigacion;