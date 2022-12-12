const { Op } = require("sequelize");

const { Actividad_otra } = require("../models");

const listarOtraActividad = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)
        && (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const actividades = await Actividad_otra.findAll({
            where:{
                estado: true
            },
            attributes: { exclude: ["createdAt", "updatedAt"]},
        });
        res.status(200).json(actividades);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const buscarOtraActividadById = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)
        && (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {id} = req.params;
    try {
        const actividad = await Actividad_otra.findByPk(id, {
            attributes: { exclude: ["createdAt", "updatedAt"]}
        });
        res.status(200).json(actividad);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const registrarOtraActividad = async (req, res) => {
    const {nombre, descripcion = "", listar} = req.body;
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const actividad = await Actividad_otra.create({
            nombre: nombre.toUpperCase(),
            descripcion,
            listar
        });
        res.status(201).json({
            msg: "Actividad otra creada con éxito",
            actividad
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const actualizarOtraActivdad = async (req, res) => {
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
        const actividad = await Actividad_otra.findByPk(id);
        await actividad.update(req.body);
        res.status(201).json({
            msg: "Actividad Otra actualizada con éxito",
            actividad
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const eliminarOtraActividad = async (req, res) => {
    const {id} = req.params;
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const actividad = await Actividad_otra.findByPk(id);
        //await actividad_administracion.destoy();
        await actividad.update({
            estado: false
        });
        res.status(201).json({
            msg: "Actividad otra deshabilitada con éxito",
            actividad
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

module.exports = {
    listarOtraActividad,
    buscarOtraActividadById,
    registrarOtraActividad,
    actualizarOtraActivdad,
    eliminarOtraActividad
};