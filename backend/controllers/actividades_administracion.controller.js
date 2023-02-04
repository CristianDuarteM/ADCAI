const { Op } = require("sequelize");

const { Actividad_administracion } = require("../models");

const listarActividadAdministracion = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)
        && (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const {habilitada} = req.query;
        let query = {}
        if(habilitada == "si"){
            query = {
                estado: true
            }
        }
        const actividades_administracion = await Actividad_administracion.findAll({
            where: query,
            attributes: { exclude: ["createdAt", "updatedAt"]},
        });
        res.status(200).json(actividades_administracion);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const buscarActividadAdministracionById = async (req, res) => {
    const {id} = req.params;
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)
        && (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const actividad_administracion = await Actividad_administracion.findByPk(id, {
            attributes: { exclude: ["createdAt", "updatedAt"]}
        });
        res.status(200).json(actividad_administracion);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const registrarActividadAdministracion = async (req, res) => {
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        let {nombre, descripcion = "", listar} = req.body;
        nombre = nombre.trim();
        if(nombre.length === 0){
            return res.status(400).json({
                msg: "El nombre de la actividad no puede ser solo espacios en blanco"
            });
        }
        const actividad_administracion = await Actividad_administracion.create({
            nombre: nombre.toUpperCase(),
            descripcion,
            listar
        });
        res.status(201).json({
            msg: "Actividad de administración creada con éxito",
            actividad_administracion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const actualizarActividadAdministracion = async (req, res) => {
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
            req.body.nombre = req.body.nombre.trim();
            if(req.body.nombre.length === 0){
            return res.status(400).json({
                msg: "El nombre de la actividad no puede ser solo espacios en blanco"
            });
            }
        }
        const actividad_administracion = await Actividad_administracion.findByPk(id);
        await actividad_administracion.update(req.body);
        res.status(201).json({
            msg: "Actividad de administracion actualizada con éxito",
            actividad_administracion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const eliminarActividadAdministracion = async (req, res) => {
    const {id} = req.params;
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const actividad_administracion = await Actividad_administracion.findByPk(id);
        //await actividad_administracion.destoy();
        await actividad_administracion.update({
            estado: false
        });
        res.status(201).json({
            msg: "Actividad de administracion deshabilitada con éxito",
            actividad_administracion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

module.exports = {
    listarActividadAdministracion,
    buscarActividadAdministracionById,
    registrarActividadAdministracion,
    actualizarActividadAdministracion,
    eliminarActividadAdministracion
};