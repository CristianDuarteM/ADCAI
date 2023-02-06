const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Periodo_docente_representacion = db.define("periodo_docente_representacion", {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_tipo_representacion: {
        type: DataTypes.INTEGER,
        references: {
            model: "Tipo_representacion",
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

module.exports = Periodo_docente_representacion;