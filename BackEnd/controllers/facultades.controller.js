const { Op } = require("sequelize");

const { Facultad } = require("../models");

const listarFacultades = async (req, res) => {
    const {limite = 20, desde = 0} = req.query;
    try {
        const facultades = await Facultad.findAndCountAll({
            attributes: { exclude: ["createdAt", "updatedAt"]},
            offset: Number(desde),
            limit: Number(limite)
        });
        res.json(facultades);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const buscarFacultadById = async (req, res) => {
    const {id} = req.params;
    try {
        const facultad = await Facultad.findByPk(id, {
            attributes: { exclude: ["createdAt", "updatedAt"]}
        });
        if(!facultad){
            return res.json({facultad: {}});
        }
        res.json({facultad: facultad});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const registrarFacultad = async (req, res) => {
    const {nombre, descripcion =""} = req.body;
    if(req.usuario.Rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const existeFacultad = await Facultad.findOne({
            where: {
                nombre
            }
        });
        if(existeFacultad){
            return res.status(400).json({
                msg: `La facultad ${nombre} ya se encuentra registrada.`
            });
        }
        const facultad = await Facultad.create({nombre, descripcion});
        res.status(201).json({
            msg: "Facultad creada con exito",
            facultad
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const actualizarFacultad = async (req, res) => {
    const {id} = req.params;
    const {nombre} = req.body;
    if(req.usuario.Rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        if(nombre){
            const existeFacultad = await Facultad.findOne({
                where: {
                    nombre
                }
            });
            if(existeFacultad){
                return res.status(400).json({
                    msg: `Existe una facultad registrada con ese nombre ${nombre}`
                });
            }
        }
        const facultad = await Facultad.findByPk(id);
        if(!facultad){
            return res.status(400).json({
                msg: `No existe facultad con ese id`
            });
        }
        await facultad.update(req.body);
        res.status(201).json({
            msg: "Facultad actualizada con exito",
            facultad
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const eliminarFacultad = async (req, res) => {
    const {id} = req.params;
    /*if(req.usuario.Rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }*/
    try {
        const facultad = await Facultad.findByPk(id);
        if(!facultad){
            return res.status(400).json({
                msg: `No existe facultad con ese id`
            });
        }
        await facultad.update({
            estado: false
        });
        res.status(201).json({
            msg: "Facultad eliminada con exito",
            facultad
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

module.exports = {
    listarFacultades,
    buscarFacultadById,
    registrarFacultad,
    actualizarFacultad,
    eliminarFacultad
}