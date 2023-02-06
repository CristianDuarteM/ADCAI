const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Asignatura = db.define("asignatura", {
    id:{
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
    },
    creditos: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    horas_teoricas: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    horas_practicas: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    id_programa: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: "Plan_estudio",
            key: "id"
        }
    },
    estado: {
        defaultValue: true,
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

module.exports = Asignatura;