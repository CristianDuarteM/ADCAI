const { Op } = require("sequelize");

const { Actividad_extension } = require("../models");

const listarActividadExtension = async (req, res) => {
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
        const actividades_extension = await Actividad_extension.findAndCountAll({
            where: query,
            attributes: { exclude: ["createdAt", "updatedAt"]},
        });
        res.status(200).json(actividades_extension);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const buscarActividadExtensionById = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)
        && (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {id} = req.params;
    try {
        const actividad_extension = await Actividad_extension.findByPk(id, {
            attributes: { exclude: ["createdAt", "updatedAt"]}
        });
        res.status(200).json(actividad_extension);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const registrarActividadExtension = async (req, res) => {
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
        const actividad_extension = await Actividad_extension.create({
            nombre: nombre.toUpperCase(),
            descripcion,
            listar
        });
        res.status(201).json({
            msg: "Actividad de extensión creada con éxito",
            actividad_extension
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const actualizarActividadExtension = async (req, res) => {
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
        const actividad_extension = await Actividad_extension.findByPk(id);
        await actividad_extension.update(req.body);
        res.status(201).json({
            msg: "Actividad de extensión actualizada con éxito",
            actividad_extension
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const eliminarActividadExtension = async (req, res) => {
    const {id} = req.params;
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const actividad_extension = await Actividad_extension.findByPk(id);
        //await actividad_extension.destoy();
        await actividad_extension.update({
            estado: false
        });
        res.status(201).json({
            msg: "Actividad de extensión deshabilitada con éxito",
            actividad_extension
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

module.exports = {
    listarActividadExtension,
    buscarActividadExtensionById,
    registrarActividadExtension,
    actualizarActividadExtension,
    eliminarActividadExtension
};