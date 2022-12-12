const { Op } = require("sequelize");

const { Facultad, Departamento, Usuario_rol, Rol, Usuario} = require("../models");
const enviarCorreo = require("../services/mailer");

const listarDepartamentos = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)
        && (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
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
        for(departamento of departamentos.rows){
            if(departamento.director){
                const director = await Usuario.findByPk(departamento.director, {
                    attributes: ["id","nombre", "apellido", "correo", "realizaCai"]
                });
                departamento.director = director
            }
        }
        res.status(200).json(departamentos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const buscarDepartamentoByFacultad = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)
        && (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {id} = req.params;
    try {
        const departamentos = await Departamento.findAll({
            where: {
                id_facultad: id
            },
            attributes: { exclude: ["createdAt", "updatedAt"]},
        });
        for(departamento of departamentos){
            if(departamento.director){
                const director = await Usuario.findByPk(departamento.director, {
                    attributes: ["id","nombre", "apellido", "correo", "realizaCai"]
                });
                departamento.director = director
            }
        }
        res.json(departamentos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const buscarDepartamentoById = async (req, res) => {
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1)
        && (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) && (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {id} = req.params;
    try {
        const departamento = await Departamento.findByPk(id, {
            attributes: { exclude: ["createdAt", "updatedAt"]},
            include: {
                model: Facultad,
                attributes: ["id", "nombre"]
            }
        });
        if(departamento.director){
            const director = await Usuario.findByPk(departamento.director, {
                attributes: ["id","nombre", "apellido", "correo", "realizaCai"]
            });
            departamento.director = director
        }
        res.json(departamento);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const registrarDepartamento = async (req, res) => {
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {nombre, descripcion ="", id_facultad, correoDirector, realizaCai} = req.body;
    try {
        let director = await Usuario.findOne({
            where:{
                correo: correoDirector
            }
        });
        if(!director){
            director = await Usuario.create({
                correo: correoDirector,
                realizaCai
            });
            const rolDocente = await Rol.findOne({
                where: {
                    nombre: "docente"
                }
            });
            await director.addRols(rolDocente);
            enviarCorreo(correoDirector, `Has sido registrado en ADCAI \n Por favor complete su registro ingresando al siguiente link: `);
        }
        const rolDirector = await Rol.findOne({
            where: {
                nombre: "director"
            }
        });
        const existeRolDirectorAsignado = await Usuario_rol.findOne({
            where:{
                id_usuario: director.id,
                id_rol: rolDirector.id
            }
        });
        if(!existeRolDirectorAsignado){
            await director.addRols(rolDirector);
            enviarCorreo(correoDirector, `Has sido asignado como Director de Departamento puede ingresar al siguiente link: `);
        }
        await director.update({
            realizaCai
        });
        const departamento = await Departamento.create(
            {
                nombre: nombre.toUpperCase(),
                descripcion,
                id_facultad,
                director: director.id
            });
        res.status(201).json({
            msg: "Departamento creado con éxito",
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
    const {correoDirector, realizaCai} = req.body;
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const departamento = await Departamento.findByPk(id);
        if(departamento.director && correoDirector){
            const rol = await Rol.findOne({
                where: {
                    nombre: "director"
                }
            });
            const usuarioRol = await Usuario_rol.findOne({
                where: {
                    id_rol: rol.id,
                    id_usuario: departamento.director
                }
            });
            if(usuarioRol){
                await usuarioRol.destroy();
            }
        }
        if(correoDirector){
            if(realizaCai === null){
                return res.status(400).json({
                    msg: "De especificar si el decano realiza el cai"
                });
            }
            let director = await Usuario.findOne({
                where:{
                    correo: correoDirector
                }
            });
            if(!director){
                director = await Usuario.create({
                    correo: correoDirector,
                    realizaCai
                });
                const rolDocente = await Rol.findOne({
                    where: {
                        nombre: "docente"
                    }
                });
                await director.addRols(rolDocente);
                enviarCorreo(correoDirector, `Por favor complete su registro ingresando al siguiente link: `);
            }
            const rolDirector = await Rol.findOne({
                where: {
                    nombre: "director"
                }
            });
            const existeRolDirectorAsignado = await Usuario_rol.findOne({
                where:{
                    id_usuario: director.id,
                    id_rol: rolDirector.id
                }
            });
            if(!existeRolDirectorAsignado){
                await director.addRols(rolDirector);
                enviarCorreo(correoDirector, `Has sido asignado como Director de departamento puede ingresar al siguiente link: `);
            }
            await director.update({
                realizaCai
            });
            req.body.director = director.id;
        }
        if(req.body.nombre){
            req.body.nombre = req.body.nombre.toUpperCase();
        }
        await departamento.update(req.body);
        res.status(201).json({
            msg: "Departamento actualizado con éxito",
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
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const departamento = await Departamento.findByPk(id);
        //await departamento.destroy();
        await departamento.update({
            estado: false
        });
        res.status(201).json({
            msg: "Departamento deshabilitado con éxito",
            departamento
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
};