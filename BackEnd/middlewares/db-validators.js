const { Departamento, Rol, Periodo, Estado, Asignatura, Plan_estudio } = require("../models");

//---------------------\\ Departamento //---------------------\\
const existeDepartamento = async (id_departamento) => {
    const existeDepartamento = await Departamento.findByPk(id_departamento);
    if(!existeDepartamento){
        throw new Error("No existe departamento con ese id");
    }
};

//---------------------\\ Rol //---------------------\\
const noExisteRol = async (rol="") => {
    const existeRol = await Rol.findOne({
        where: {
            nombre: rol
        }
    });
    if(!existeRol){
        throw new Error(`No existe rol con ese nombre ${rol}`);
    }
};


const existeRol = async (rol="") => {
    const existeRol = await Rol.findOne({
        where: {
            nombre: rol
        }
    });
    if(existeRol){
        throw new Error(`Existe rol con ese nombre ${rol}`);
    }
};

//---------------------\\ Periodo //---------------------\\
const noExistePeriodo = async (periodo) => {
    const existePeriodo = await Periodo.findByPk(periodo);
    if(!existePeriodo){
        throw new Error("No existe periodo con ese id");
    }
};

//---------------------\\ Estado //---------------------\\
const existeEstado = async (estado="") => {
    const existeEstado = await Estado.findOne({
        where: {
            nombre: estado
        }
    });
    if(existeEstado){
        throw new Error(`Existe estado con ese nombre ${estado}`);
    }
};

//---------------------\\ Asignatura //---------------------\\
const existeAsignaturaByNombre = async (nombre="", req) => {
    const existeAsignatura = await Asignatura.findOne({
        where: {
            nombre: nombre.toUpperCase(),
            id_programa: req.body.id_programa
        }
    });
    if(existeAsignatura){
        throw new Error(`Ya existe una asignatura con ese nombre: ${nombre} en ese programa academico ${req.body.id_programa}`);
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

module.exports = {
    existeDepartamento,
    noExisteRol,
    existeRol,
    noExistePeriodo,
    existeEstado,
    existeAsignaturaByNombre,
    noExisteAsignaturaById,
    noExisteProgramaById
}