const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Plan_estudio = db.define("plan_estudio", {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_facultad: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: "Facultad",
            key: "id"
        }
    },
    estado: {
        defaultValue: true,
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

module.exports = Plan_estudio;