const moment = require("moment");
const { Departamento,
        Rol,
        Periodo,
        Estado,
        Asignatura,
        Plan_estudio,
        Facultad,
        Usuario, 
        Actividad_investigacion,
        Actividad_administracion,
        Tipo_representacion,
        Actividad_otra,
        Periodo_docente,
        Firma,
        Notificacion} = require("../models");
const Actividad_extension = require("../models/actividad_extension.model");

//---------------------\\ Departamento //---------------------\\
const noExisteDepartamentoById = async (id) => {
    const existeDepartamento = await Departamento.findByPk(id);
    if(!existeDepartamento){
        throw new Error("No existe departamento con ese id");
    }
};

const existeDepartamentoByNombre = async (nombre) => {
    const existeDepartamento = await Departamento.findOne({
        where: {
            nombre: nombre.toUpperCase()
        }
    });
    if(existeDepartamento){
        throw new Error("Ya existe un departamento con ese nombre");
    }
};

//---------------------\\ Rol //---------------------\\
const noExisteRolById = async (id) => {
    const existeRol = await Rol.findByPk(id);
    if(!existeRol){
        throw new Error(`No existe un rol con ese id`);
    }
};

const noExisteRolByNombre = async (nombre="") => {
    const existeRol = await Rol.findOne({
        where: {
            nombre: nombre.toUpperCase()
        }
    });
    if(!existeRol){
        throw new Error(`No existe rol con ese nombre ${rol}`);
    }
};

const existeRolByNombre = async (nombre="") => {
    const existeRol = await Rol.findOne({
        where: {
            nombre: nombre.toUpperCase()
        }
    });
    if(existeRol){
        throw new Error(`Ya existe un rol con ese nombre ${rol}`);
    }
};

//---------------------\\ Periodo //---------------------\\
const noExistePeriodo = async (periodo) => {
    const existePeriodo = await Periodo.findByPk(periodo);
    if(!existePeriodo){
        throw new Error("No existe periodo con ese id");
    }
};

/*const existePeriodoByFechaInicio = async (inicio, id_departamento) => {
    const fecha_inicio = moment(inicio, "YYYY-MM-DD");
    let semestre;
    if(fecha_inicio.month()+1 < 6){
        semestre = 1;
    } else{
        semestre = 2;
    }
    const existePeriodo = await Periodo.findOne({
        anno: fecha_inicio.year(),
        semestre,
        id_
    });
    if(!existePeriodo){
        throw new Error("No existe periodo con ese id");
    }
};*/

//---------------------\\ Estado //---------------------\\
const existeEstadobyNombre = async (estado="") => {
    const existeEstado = await Estado.findOne({
        where: {
            nombre: estado
        }
    });
    if(existeEstado){
        throw new Error(`Ya existe estado con ese nombre ${estado}`);
    }
};

const noExisteEstadoById = async (id) => {
    const existeEstado = await Estado.findByPk(id);
    if(!existeEstado){
        throw new Error(`No existe estado con ese id`);
    }
};

//---------------------\\ Asignatura //---------------------\\
const existeAsignaturaByNombre = async (nombre="", req) => {
    console.log(req.body)
    const existeAsignatura = await Asignatura.findOne({
        where: {
            nombre: nombre.toUpperCase(),
            id_programa: req.body.id_programa
        }
    });
    if(existeAsignatura){
        throw new Error(`Ya existe una asignatura con ese nombre: ${nombre} en ese programa académico ${req.body.id_programa}`);
    }
};

const noExistenAsignaturasById = async (asignaturas = []) => {
    for(asignatura of asignaturas){
        const existeAsignatura = await Asignatura.findByPk(asignatura);
        if(!existeAsignatura){
            throw new Error(`No existe asignatura con ese id ${asignatura}`);
        }
    }
};

const noExisteAsignaturaById = async (id) => {
    const existeAsignatura = await Asignatura.findByPk(id);
    if(!existeAsignatura){
        throw new Error(`No existe asignatura con ese id`);
    }
};

//---------------------\\ Programa //---------------------\\
const noExisteProgramaById = async (id) => {
    const existePrograma = await Plan_estudio.findByPk(id);
    if(!existePrograma){
        throw new Error(`No existe plan de estudio con ese id ${id}`);
    }
};

//---------------------\\ Facultad //---------------------\\
const noExisteFacultadById = async (id) => {
    const existeFacultad = await Facultad.findByPk(id);
    if(!existeFacultad){
        throw new Error(`No existe facultad con ese id ${id}`);
    }
};

const existeFacultadByNombre = async (nombre) => {
    const existeFacultad = await Facultad.findOne({
        where: {
            nombre: nombre.toUpperCase()
        }
    });
    if(existeFacultad){
        throw new Error(`Ya existe una facultad con ese nombre: ${nombre}`);
    }
};

//---------------------\\ Plan Estudio //---------------------\\
const noExistePlanEstudioById = async (id) => {
    const existePlan_estudio = await Plan_estudio.findByPk(id);
    if(!existePlan_estudio){
        throw new Error(`No existe plan de estudio con ese id ${id}`);
    }
};

const existePlanEstudioByNombre = async (nombre) => {
    const existePlan_estudio = await Plan_estudio.findOne({
        where: {
            nombre
        }
    });
    if(existePlan_estudio){
        throw new Error(`Ya existe un plan de estudio con ese nombre: ${nombre}`);
    }
};

//---------------------\\ Usuario //---------------------\\
const noExisteUsuarioById = async (id) => {
    const existeUsuario = await Usuario.findByPk(id);
    if(!existeUsuario){
        throw new Error(`No existe usuario con ese id ${id}`);
    }
};

//---------------------\\ Actividad Investigacion //---------------------\\
const existeAInvestigacionByNombre = async (nombre) => {
    const existeActividadInvestigacion = await Actividad_investigacion.findOne({
        where: {
            nombre
        }
    });
    if(existeActividadInvestigacion){
        throw new Error(`Ya existe una actividad de investigación con ese nombre: ${nombre}`);
    }
};

const noExisteAInvestigacionById = async (id) => {
    const existeActividadInvestigacion = await Actividad_investigacion.findByPk(id);
    if(!existeActividadInvestigacion){
        throw new Error(`No existe actividad de investigación con ese id ${id}`);
    }
};

//---------------------\\ Actividad Extension //---------------------\\
const existeActividadExtensionByNombre = async (nombre) => {
    const existeActividadExtension = await Actividad_extension.findOne({
        where: {
            nombre
        }
    });
    if(existeActividadExtension){
        throw new Error(`Ya existe una actividad de extensión con ese nombre: ${nombre}`);
    }
};

const noExisteActividadExtensionById = async (id) => {
    const existeActividadExtension = await Actividad_extension.findByPk(id);
    if(!existeActividadExtension){
        throw new Error(`No existe actividad de exntensión con ese id ${id}`);
    }
};

const listarExtension = async (actividades=[]) => {
    for(actividad of actividades){
        const extension = await Actividad_extension.findByPk(actividad.id);
        if(extension.listar){
            if(!actividad.nombre){
                throw new Error(`Se deben enunciar las actividades ${actividad}`);
            }
        }
    }
};

//---------------------\\ Actividad Administracion //---------------------\\
const existeActividadAdministracionByNombre = async (nombre) => {
    const existeActividad = await Actividad_administracion.findOne({
        where: {
            nombre
        }
    });
    if(existeActividad){
        throw new Error(`Ya existe una actividad de administracion con ese nombre: ${nombre}`);
    }
};

const noExisteAAdministracionById = async (id) => {
    const existeActividad = await Actividad_administracion.findByPk(id);
    if(!existeActividad){
        throw new Error(`No existe actividad de administracion con ese id ${id}`);
    }
};

const listarAdministracion = async (actividades=[]) => {
    for(actividad of actividades){
        const administracion = await Actividad_administracion.findByPk(actividad.id);
        if(administracion.listar){
            if(!actividad.nombre){
                throw new Error(`Se deben enunciar las actividades ${actividad}`);
            }
        }
    }
};

//---------------------\\ Representaciones //---------------------\\
const noExisteRepresentacionById = async (id) => {
    const representacion = await Tipo_representacion.findByPk(id);
    if(!representacion){
        throw new Error(`No existe representacion con ese id ${id}`);
    }
};

const listarRepresentacion = async (actividades=[]) => {
    for(actividad of actividades){
        const representacion = await Tipo_representacion.findByPk(actividad.id);
        if(representacion.listar){
            if(!actividad.nombre){
                throw new Error(`Se deben enunciar las actividades ${actividad.id}`);
            }
        }
    }
};

//---------------------\\ Actividad Otra //---------------------\\
const noExisteOtraActividadById = async (id) => {
    const actividad = await Actividad_otra.findByPk(id);
    if(!actividad){
        throw new Error(`No existe actividad otra con ese id ${id}`);
    }
};

const listarOtras = async (actividades=[]) => {
    for(actividad of actividades){
        const otra = await Actividad_otra.findByPk(actividad.id);
        if(otra.listar){
            if(!actividad.nombre){
                throw new Error(`Se deben enunciar las actividades ${actividad.id}`);
            }
        }
    }
};

//---------------------\\ CAI //---------------------\\
const noExisteCAIById = async (id) => {
    const cai = await Periodo_docente.findByPk(id);
    if(!cai){
        throw new Error(`No existe cai con ese id ${id}`);
    }
};

//---------------------\\ Firma //---------------------\\
const noExisteFirmaById = async (id) => {
    const firma = await Firma.findByPk(id);
    if(!firma){
        throw new Error(`No existe firma con ese id ${id}`);
    }
};

//---------------------\\ Notificacion //---------------------\\
const noExisteNotificacionById = async (id) => {
    const notificacion = await Notificacion.findByPk(id);
    if(!notificacion){
        throw new Error(`No existe notificacion con ese id ${id}`);
    }
};

const listarSinHorasActividad = async (actividades=[]) => {
    for(actividad of actividades){
            if((actividad.nombre) && (actividad.horas == 0)){
                throw new Error(`Se deben enunciar la cantidad de horas ${actividad}`);
            }
    }
};

module.exports = {
    noExisteDepartamentoById,
    existeDepartamentoByNombre,
    noExisteRolById,
    noExisteRolByNombre,
    existeRolByNombre,
    noExistePeriodo,
    existeEstadobyNombre,
    noExisteEstadoById,
    existeAsignaturaByNombre,
    noExistenAsignaturasById,
    noExisteAsignaturaById,
    noExisteFacultadById,
    existeFacultadByNombre,
    noExistePlanEstudioById,
    noExisteProgramaById,
    existePlanEstudioByNombre,
    noExisteUsuarioById,
    existeAInvestigacionByNombre,
    noExisteAInvestigacionById,
    existeActividadExtensionByNombre,
    noExisteActividadExtensionById,
    listarExtension,
    existeActividadAdministracionByNombre,
    noExisteAAdministracionById,
    listarAdministracion,
    noExisteRepresentacionById,
    listarRepresentacion,
    noExisteOtraActividadById,
    listarOtras,
    noExisteCAIById,
    noExisteFirmaById,
    listarSinHorasActividad
}