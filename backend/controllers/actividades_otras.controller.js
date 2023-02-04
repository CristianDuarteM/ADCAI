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
        const {habilitada} = req.query;
        let query = {}
        if(habilitada == "si"){
            query = {
                estado: true
            }
        }
        const actividades = await Actividad_otra.findAll({
            where: query,
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
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const {id} = req.params;
        const {nombre} = req.body;
        if(nombre){
            req.body.nombre = nombre.toUpperCase();
            req.body.nombre = req.body.nombre.trim();
            if(req.body.nombre.length === 0){
                return res.status(400).json({
                    msg: "El nombre de la actividad no puede ser solo espacios en blanco"
                });
            }
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