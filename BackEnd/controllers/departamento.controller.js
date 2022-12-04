const { Op } = require("sequelize");

const { Facultad, Departamento} = require("../models");

const listarDepartamentos = async (req, res) => {
    const {limite = 20, desde = 0} = req.query;
    try {
        const departamentos = await Departamento.findAndCountAll({
            attributes: { exclude: ["createdAt", "updatedAt"]},
            include: {
                model: Facultad,
                attributes: ["id", "nombre"]
            },
            offset: Number(desde),
            limit: Number(limite)
        });
        res.json(departamentos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const buscarDepartamentoByFacultad = async (req, res) => {
    const {id} = req.params;
    try {
        const existeFacultad = await Facultad.findByPk(id);
        if(!existeFacultad){
            return res.status(400).json({
                msg: "No existe facultad registrada con ese id"
            });
        }
        const departamentos = await Departamento.findAll({
            where: {
                id_facultad: id
            },
            attributes: { exclude: ["createdAt", "updatedAt"]},
        });
        res.json(departamentos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const buscarDepartamentoById = async (req, res) => {
    const {id} = req.params;
    try {
        const departamento = await Departamento.findByPk(id, {
            attributes: { exclude: ["createdAt", "updatedAt"]},
            include: {
                model: Facultad,
                attributes: ["id", "nombre"]
            }
        });
        if(!departamento){
            return res.json({departamento: {}});
        }
        res.json({departamento: departamento});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const registrarDepartamento = async (req, res) => {
    const {nombre, descripcion ="", id_facultad} = req.body;
    if(req.usuario.Rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const existeDepartamento = await Departamento.findOne({
            where: {
                nombre
            }
        });
        if(existeDepartamento){
            return res.status(400).json({
                msg: `El departamento ${nombre} ya se encuentra registrado.`
            });
        }
        const existeFacultad = await Facultad.findByPk(id_facultad);
        if(!existeFacultad){
            return res.status(400).json({
                msg: `No se encuentra facultad con ese id`
            });
        }
        const departamento = await Departamento.create({nombre, descripcion, id_facultad});
        res.status(201).json({
            msg: "Departamento creado con exito",
            departamento
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const actualizarDepartamento = async (req, res) => {
    const {id} = req.params;
    const {id_facultad, nombre} = req.body;
    if(req.usuario.Rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        if(id_facultad){
            const existeFacultad = await Facultad.findByPk(id_facultad);
            if(!existeFacultad){
                return res.status(400).json({
                    msg: `No se encuentra facultad con ese id`
                });
            }
        }
        if(nombre){
            const existeDepartamento = await Departamento.findOne({
                where: {
                    nombre
                }
            });
            if(existeDepartamento){
                return res.status(400).json({
                    msg: `Existe un deparamento registrado con ese nombre ${nombre}`
                });
            }
        }
        const departamento = await Departamento.findByPk(id);
        if(!departamento){
            return res.status(400).json({
                msg: `No existe departamento con ese id`
            });
        }
        await departamento.update(req.body);
        res.status(201).json({
            msg: "departamento actualizada con exito",
            departamento
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const eliminarDepartamento = async (req, res) => {
    const {id} = req.params;
    /*if(req.usuario.Rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }*/
    try {
        const deparamento = await Departamento.findByPk(id);
        if(!deparamento){
            return res.status(400).json({
                msg: `No existe departamento con ese id`
            });
        }
        await deparamento.update({
            estado: false
        });
        res.status(201).json({
            msg: "Departamento eliminado con exito",
            deparamento
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

module.exports = {
    listarDepartamentos,
    buscarDepartamentoByFacultad,
    buscarDepartamentoById,
    registrarDepartamento,
    actualizarDepartamento,
    eliminarDepartamento
}