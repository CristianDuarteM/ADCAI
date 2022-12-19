const { Op } = require("sequelize");

const { Actividad_investigacion } = require("../models");

const listarActividadInvestigacion = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)
        && (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const {habilitada} = req.query;
        let query = {};
        if(habilitada == "si"){
            query = {
                estado: true
            };
        }
        const actividades_investigacion = await Actividad_investigacion.findAll({
            where:query,
            attributes: { exclude: ["createdAt", "updatedAt"]},
        });
        res.status(200).json(actividades_investigacion);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const buscarActividadInvestigacionById = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)
        && (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {id} = req.params;
    try {
        const actividad_investigacion = await Actividad_investigacion.findByPk(id, {
            attributes: { exclude: ["createdAt", "updatedAt"]}
        });
        res.status(200).json(actividad_investigacion);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const registrarActividadInvestigacion = async (req, res) => {
    const {nombre, descripcion = "", horas_minimas = 0, horas_maximas, descripcion_horas} = req.body;
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const actividad_investigacion = await Actividad_investigacion.create({
            nombre: nombre.toUpperCase(),
            descripcion,
            horas_minimas,
            horas_maximas,
            descripcion_horas
        });
        res.status(201).json({
            msg: "Actividad de investigación creada con éxito",
            actividad_investigacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const actualizarActividadInvestigacion = async (req, res) => {
    const {id} = req.params;
    const {nombre} = req.body;
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        if(nombre){
            req.body.nombre = nombre.toUpperCase();
        }
        const actividad_investigacion = await Actividad_investigacion.findByPk(id);
        await actividad_investigacion.update(req.body);
        res.status(201).json({
            msg: "Actividad de investigación actualizada con éxito",
            actividad_investigacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const eliminarActividadInvestigacion = async (req, res) => {
    const {id} = req.params;
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const actividad_investigacion = await Actividad_investigacion.findByPk(id);
        //await asignatura.destoy();
        await actividad_investigacion.update({
            estado: false
        });
        res.status(201).json({
            msg: "Actividad de investigación deshabilitada con éxito",
            actividad_investigacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

module.exports = {
    listarActividadInvestigacion,
    buscarActividadInvestigacionById,
    registrarActividadInvestigacion,
    actualizarActividadInvestigacion,
    eliminarActividadInvestigacion
};