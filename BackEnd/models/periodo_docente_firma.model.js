const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Periodo_docente_firma = db.define("periodo_docente_firma", {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_firma: {
        type: DataTypes.INTEGER,
        references: {
            model: "Firma",
            key: "id"
        }
    },
    id_periodo_docente: {
        type: DataTypes.INTEGER,
        references: {
            model: "Periodo_docente",
            key: "id"
        }
    }
});

module.exports = Periodo_docente_firma;