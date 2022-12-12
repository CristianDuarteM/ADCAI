const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Periodo = db.define("periodo", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    anno: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    semestre: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    fecha_inicio: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    fecha_limite: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    id_departamento: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: "Departamento",
            key: "id"
        }
    }
});

module.exports = Periodo;