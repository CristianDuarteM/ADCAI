const { DataTypes } = require("sequelize");
const db = require("../db/conexion");

const Periodo_docente = db.define("periodo_docente", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_periodo: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: "Periodo",
            key: "id"
        }
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Usuario",
            key: "id"
        }
    },
    id_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Estado",
            key: "id"
        }
    },
    dedicacion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fecha_diligenciamiento: {
        type: DataTypes.DATE
    },
    horas_lectivas_semanales: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    horas_investigacion: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    horas_extension: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    horas_administracion: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    horas_representacion: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    horas_otras: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    horas_totales: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    observacion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    esActivo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
});

module.exports = Periodo_docente;