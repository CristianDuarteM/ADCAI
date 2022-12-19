const { Op } = require("sequelize");

const { Asignatura, Plan_estudio } = require("../models");

/*const listarAsignaturas = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)
        && (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {limite = 20, desde = 0, } = req.query;
    try {
        const asignaturas = await Asignatura.findAndCountAll({
            attributes: { exclude: ["createdAt", "updatedAt"]},
            include: {
                model: Plan_estudio,
                attributes: ["id", "nombre"]
            },
            offset: Number(desde),
            limit: Number(limite)
        });
        res.status(200).json(asignaturas);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};*/

const buscarAsignaturaByPlan_Estudio = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)
        && (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const {id} = req.params;
        const {habilitada} = req.query;
        let query;
        if(habilitada == "si"){
            query = {
                id_programa: id,
                estado: true
            }
        } else {
            query = {
                id_programa: id
            };
        }
        const asignaturas = await Asignatura.findAll({
            where: query,
        });
        res.status(200).json(asignaturas);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const buscarAsignaturaById = async (req, res) => {
    const {id} = req.params;
    try {
        const asignatura = await Asignatura.findByPk(id, {
            attributes: { exclude: ["createdAt", "updatedAt"]}
        });
        res.status(200).json(asignatura);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const registrarVariasAsignaturas = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const materias = [];
        const {asignaturas} = req.body;
        for(let asignatura of asignaturas){
            asignatura.nombre = asignatura.nombre.toUpperCase();
            const existeMateria = await Asignatura.findOne({
                where: {
                    nombre: asignatura.nombre,
                    id_programa: asignatura.id_programa
                }
            });
            if(!existeMateria){
                const materia = await Asignatura.create(asignatura);
                materias.push(materia);
            }
        }
        res.status(201).json({
            msg: "Asignatura creado con éxito",
            materias
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const registrarAsignatura = async (req, res) => {
    const {nombre, descripcion ="", creditos, horas_teoricas, horas_practicas, id_programa} = req.body;
    if((req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const asignatura = await Asignatura.create({
            nombre: nombre.toUpperCase(),
            descripcion,
            creditos,
            horas_teoricas,
            horas_practicas,
            id_programa
        });
        res.status(201).json({
            msg: "Asignatura creado con éxito",
            asignatura
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const actualizarAsignatura = async (req, res) => {
    const {id} = req.params;
    const {nombre} = req.body;
    if((req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        if(nombre){
            req.body.nombre = nombre.toUpperCase();
        }
        const asignatura = await Asignatura.findByPk(id);
        await asignatura.update(req.body);
        res.status(201).json({
            msg: "Asignatura actualizada con éxito",
            asignatura
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const eliminarAsignatura = async (req, res) => {
    const {id} = req.params;
    if((req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const asignatura = await Asignatura.findByPk(id);
        //await asignatura.destoy();
        await asignatura.update({
            estado: false
        });
        res.status(201).json({
            msg: "Asignatura deshabilitada con éxito",
            asignatura
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

module.exports = {
    //listarAsignaturas,
    buscarAsignaturaByPlan_Estudio,
    buscarAsignaturaById,
    registrarAsignatura,
    registrarVariasAsignaturas,
    actualizarAsignatura,
    eliminarAsignatura
};