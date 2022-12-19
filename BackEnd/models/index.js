const Rol = require("./rol.model");
const Usuario = require("./usuario.model");
const Facultad = require("./facultad.model");
const Departamento = require("./departamento.model");
const Usuario_rol = require("./usuario_rol.model");
const Firma = require("./firma.model");
const Periodo = require("./periodo.model");
const Periodo_docente = require("./periodo_docente.model");
const Estado = require("./estado.model");
const Plan_estudio = require("./plan_estudio.model");
const Asignatura = require("./asignatura.model");
const Periodo_docente_asignatura = require("./periodo_docente_asignatura.model");
const Actividad_investigacion = require("./actividad_investigacion.model");
const Actividad_extension = require("./actividad_extension.model");
const Actividad_administracion = require("./actividad_administracion.model");
const Tipo_representacion = require("./tipo_representacion.model");
const Actividad_otra = require("./actividad_otra.model");
const Periodo_docente_actividad_investigacion = require("./periodo_docente_actividad_investigacion.model");
const Periodo_docente_actividad_extension = require("./periodo_docente_actividad_extension.model");
const Periodo_docente_actividad_administracion = require("./periodo_docente_actividad_administracion.model");
const Periodo_docente_representacion = require("./periodo_docente_representacion.model");
const Periodo_docente_otra = require("./periodo_docente_otra.model");
const Periodo_docente_firma = require("./periodo_docente_firma.model");
const Notificacion = require("./notificacion.model");
const Retroalimentacion = require("./retroalimentacion.model");
const Notas = require("./notas.model");
const Periodo_docente_notas = require("./periodo_docente_notas.model");
const Evidencia = require("./evidencias.model");


//-------------\\ Usuarios //-------------\\
Usuario.belongsToMany(Rol, {
    through: "usuario_rol",
    foreignKey: "id_usuario"
});
Rol.belongsToMany(Usuario, {
    through: "usuario_rol",
    foreignKey: "id_rol",
});

Usuario.hasMany(Periodo_docente, {
    foreignKey: "id_usuario"
});
Periodo_docente.belongsTo(Usuario, {
    foreignKey: "id_usuario"
});

Departamento.hasMany(Usuario, {
    foreignKey: "id_departamento"
});
Usuario.belongsTo(Departamento, {
    foreignKey: "id_departamento"
});

Usuario.hasMany(Notificacion, {
    foreignKey: "id_usuario"
});
Notificacion.belongsTo(Usuario, {
    foreignKey: "id_usuario"
});

Usuario.hasMany(Retroalimentacion, {
    foreignKey: "id_usuario"
});
Retroalimentacion.belongsTo(Usuario, {
    foreignKey: "id_usuario"
});

//-------------\\ Retroalimentacion //-------------\\
Periodo_docente.hasMany(Retroalimentacion, {
    foreignKey: "id_periodo_docente"
});
Retroalimentacion.belongsTo(Periodo_docente, {
    foreignKey: "id_periodo_docente"
});

//-------------\\ Firma //-------------\\
Firma.hasOne(Usuario, {
    foreignKey: "id_firma"
});
Usuario.belongsTo(Firma, {
    foreignKey: "id_firma"
});

Firma.belongsToMany(Periodo_docente, {
    through: "periodo_docente_firma",
    foreignKey: "id_firma"
});
Periodo_docente.belongsToMany(Firma, {
    through: "periodo_docente_firma",
    foreignKey: "id_periodo_docente",
});


//-------------\\ Periodo //-------------\\
Periodo.hasMany(Periodo_docente, {
    foreignKey: "id_periodo"
});
Periodo_docente.belongsTo(Periodo, {
    foreignKey: "id_periodo"
});

//-------------\\ Departamento //-------------\\
Departamento.hasMany(Periodo, {
    foreignKey: "id_departamento"
});
Periodo.belongsTo(Departamento, {
    foreignKey: "id_departamento"
});

//-------------\\ Facultad //-------------\\
Facultad.hasMany(Departamento, {
    foreignKey: "id_facultad"
});
Departamento.belongsTo(Facultad, {
    foreignKey: "id_facultad"
});

Facultad.hasMany(Plan_estudio, {
    foreignKey: "id_facultad"
});
Plan_estudio.belongsTo(Facultad, {
    foreignKey: "id_facultad"
});

//-------------\\ Estado //-------------\\
Estado.hasMany(Periodo_docente, {
    foreignKey: "id_estado"
});
Periodo_docente.belongsTo(Estado, {
    foreignKey: "id_estado"
});

//-------------\\ Asignaturas //-------------\\
Plan_estudio.hasMany(Asignatura, {
    foreignKey: "id_programa"
});
Asignatura.belongsTo(Plan_estudio, {
    foreignKey: "id_programa"
});

Asignatura.belongsToMany(Periodo_docente, {
    through: "periodo_docente_asignatura",
    foreignKey: "id_asignatura"
});
Periodo_docente.belongsToMany(Asignatura, {
    through: "periodo_docente_asignatura",
    foreignKey: "id_periodo_docente",
});

//-------------\\ Actividad Investigacion //-------------\\
Actividad_investigacion.belongsToMany(Periodo_docente, {
    through: "periodo_docente_actividad_investigacion",
    foreignKey: "id_actividad_investigacion"
});
Periodo_docente.belongsToMany(Actividad_investigacion, {
    through: "periodo_docente_actividad_investigacion",
    foreignKey: "id_periodo_docente",
});

//-------------\\ Actividad Extension //-------------\\

Actividad_extension.belongsToMany(Periodo_docente, {
    through: "periodo_docente_actividad_extension",
    foreignKey: "id_actividad_extension"
});
Periodo_docente.belongsToMany(Actividad_extension, {
    through: "periodo_docente_actividad_extension",
    foreignKey: "id_periodo_docente",
});

//-------------\\ Actividad Administracion //-------------\\
Actividad_administracion.belongsToMany(Periodo_docente, {
    through: "periodo_docente_actividad_administracion",
    foreignKey: "id_actividad_administracion"
});
Periodo_docente.belongsToMany(Actividad_administracion, {
    through: "periodo_docente_actividad_administracion",
    foreignKey: "id_periodo_docente",
});

//-------------\\ Representaciones //-------------\\
Tipo_representacion.belongsToMany(Periodo_docente, {
    through: "periodo_docente_representacion",
    foreignKey: "id_tipo_representacion"
});
Periodo_docente.belongsToMany(Tipo_representacion, {
    through: "periodo_docente_representacion",
    foreignKey: "id_periodo_docente",
});

//-------------\\ Actividad otras //-------------\\
Actividad_otra.belongsToMany(Periodo_docente, {
    through: "periodo_docente_otra",
    foreignKey: "id_actividad_otra"
});
Periodo_docente.belongsToMany(Actividad_otra, {
    through: "periodo_docente_otra",
    foreignKey: "id_periodo_docente",
});

//-------------\\  Notas //-------------\\
Notas.belongsToMany(Periodo_docente, {
    through: "periodo_docente_notas",
    foreignKey: "id_notas"
});
Periodo_docente.belongsToMany(Notas, {
    through: "periodo_docente_notas",
    foreignKey: "id_periodo_docente",
});

//-------------\\  Evidencia //-------------\\
Periodo_docente.hasMany(Evidencia, {
    foreignKey: "id_periodo"
});
Evidencia.belongsTo(Periodo_docente, {
    foreignKey: "id_periodo"
});

module.exports = {
    Rol,
    Usuario,
    Facultad,
    Departamento,
    Usuario_rol,
    Firma,
    Periodo,
    Periodo_docente,
    Estado,
    Plan_estudio,
    Asignatura,
    Periodo_docente_asignatura,
    Actividad_investigacion,
    Actividad_extension,
    Actividad_administracion,
    Tipo_representacion,
    Actividad_otra,
    Periodo_docente_actividad_investigacion,
    Periodo_docente_actividad_extension,
    Periodo_docente_actividad_administracion,
    Periodo_docente_representacion,
    Periodo_docente_otra,
    Periodo_docente_firma,
    Notificacion,
    Retroalimentacion,
    Notas,
    Periodo_docente_notas,
    Evidencia
};

