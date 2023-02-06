const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Periodo_docente_actividad_administracion = db.define("periodo_docente_actividad_administracion", {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_actividad_administracion: {
        type: DataTypes.INTEGER,
        references: {
            model: "Actividad_administracion",
            key: "id"
        }
    },
    id_periodo_docente: {
        type: DataTypes.INTEGER,
        references: {
            model: "Periodo_docente",
            key: "id"
        }
    },
    horas:{
        type: DataTypes.DOUBLE
    },
    nombre: {
        type: DataTypes.STRING,
    }
});

module.exports = Periodo_docente_actividad_administracion;