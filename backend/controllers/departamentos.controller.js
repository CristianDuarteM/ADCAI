const { Op } = require("sequelize");

const { Facultad, Departamento, Usuario_rol, Rol, Usuario} = require("../models");
const enviarCorreo = require("../services/mailer");
const { registrarNotificacion } = require("./notificaciones.controller");

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
    if((req.usuario.rols.filter(rol => rol.nombre === "DOCENTE").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DIRECTOR").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "DECANO").length !== 1) &&
        (req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1)){
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
    let bandera = false;
    try {
        let {nombre, descripcion ="", id_facultad, correoDirector, realizaCai} = req.body;
        let director = await Usuario.findOne({
            where:{
                correo: correoDirector
            }
        });
        nombre = nombre.trim();
        if(nombre.length === 0){
            return res.status(400).json({
                msg: "El nombre no puede ser solamente espacios en blanco"
            });
        }
        const departamento = await Departamento.create(
            {
                nombre: nombre.toUpperCase(),
                descripcion,
                id_facultad
            });
        bandera = true;
        const rolDirector = await Rol.findOne({
            where: {
                nombre: "DIRECTOR"
            }
        });
        const rolDocente = await Rol.findOne({
            where: {
                nombre: "docente"
            }
        });
        if(director){
            const existeRolDirectorAsignado = await Usuario_rol.findOne({
                where:{
                    id_usuario: director.id,
                    id_rol: rolDirector.id
                }
            });
            if(existeRolDirectorAsignado){
                return res.status(400).json({
                    msg: "Un docente no puede ser director de dos departamentos"
                });
            };
            if(director.id_departamento){
                return res.status(400).json({
                    msg: "Un docente no puede ser director de un departamento al que no esta asociado"
                });
            }
            await director.update({
                id_departamento: departamento.id,
                realizaCai
            });
            const existeRolDocente = await Usuario_rol.findOne({
                where:{
                    id_usuario: director.id,
                    id_rol: rolDocente.id
                }
            });
            if(!existeRolDocente){
                await director.addRols(rolDocente);
            }
            await director.addRols(rolDirector);
            enviarCorreo(correoDirector, `Has sido asignado como Director de Departamento puede ingresar al siguiente link: `);
            registrarNotificacion(director.id, "Has sido asignado como Director de Departamento", "DIRECTOR");
        } else {
            director = await Usuario.create({
                correo: correoDirector,
                id_departamento: departamento.id,
                realizaCai
            });
            await director.addRols(rolDocente);
            await director.addRols(rolDirector);
            enviarCorreo(correoDirector, `Has sido registrado en ADCAI \n Por favor complete su registro ingresando al siguiente link: `);
            enviarCorreo(correoDirector, `Has sido asignado como Director de Departamento puede ingresar al siguiente link: `);
            registrarNotificacion(director.id, "Has sido asignado como Director de Departamento", "DIRECTOR");
        }
        await departamento.update({
            director: director.id
        });
        res.status(201).json({
            msg: "Departamento creado con éxito",
            departamento
        });
    } catch (error) {
        if(bandera){
            const departamento = await Departamento.findAll();
            await departamento.pop().destroy();
        }
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const actualizarDepartamento = async (req, res) => {
    if(req.usuario.rols.filter(rol => rol.nombre === "ADMIN").length !== 1){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    try {
        const {id} = req.params;
        const {nombre, descripcion, correoDirector, realizaCai} = req.body;
        if(req.body.nombre){
            req.body.nombre = req.body.nombre.toUpperCase();
            req.body.nombre = req.body.nombre.trim();
            if(req.body.nombre.length === 0){
                return res.status(400).json({
                    msg: "El nombre no puede ser solamente espacios en blanco"
                });
            }
        }
        const departamento = await Departamento.findByPk(id);
        const rolDirector = await Rol.findOne({
            where: {
                nombre: "DIRECTOR"
            }
        });
        const rolDocente = await Rol.findOne({
            where: {
                nombre: "DOCENTE"
            }
        });
        if(departamento.director){
            await Usuario_rol.destroy({
                where:{
                    id_usuario: departamento.director,
                    id_rol: rolDirector.id
                }
            });
        }
        if(correoDirector){
            let usuario = await Usuario.findOne({
                where: {
                    correo: correoDirector
                }
            });
            if(usuario){
                let usuarioRol = await Usuario_rol.findOne({
                    where: {
                        id_rol: rolDirector.id,
                        id_usuario: usuario.id
                    }
                });
                if(usuarioRol){
                    return res.status(400).json({
                        msg: "Un docente no puede ser director de dos departamentos"
                    });
                }
                if(usuario.id_departamento){
                    if(usuario.id_departamento !== departamento.id){
                        return res.status(400).json({
                            msg: "Un usuario no puede ser director de un departamento al que no esta asociado"
                        });
                    }
                } else {
                    await usuario.update({
                        id_departamento: departamento.id
                    });
                }
                if(realizaCai){
                    await usuario.update({
                        realizaCai
                    });
                }
                const usuarioDocente = await Usuario_rol.findOne({
                    where: {
                        id_usuario: usuario.id,
                        id_rol: rolDocente.id
                    }
                });
                if(!usuarioDocente){
                    await usuario.addRols(rolDocente);
                }
                await usuario.addRols(rolDirector);
                enviarCorreo(correoDirector, `Has sido asignado como Director de departamento puede ingresar al siguiente link: `);
                registrarNotificacion(usuario.id, "Has sido asignado como Director de departamento", "DIRECTOR");
            } else {
                usuario = await Usuario.create({
                    correo: correoDirector,
                    realizaCai,
                    id_departamento: departamento.id,
                });
                await usuario.addRols(rolDocente);
                await usuario.addRols(rolDirector);
                enviarCorreo(correoDirector, `Has sido registrado en ADCAI \n Por favor complete su registro ingresando al siguiente link: `);
                enviarCorreo(correoDirector, `Has sido asignado como Director de departamento puede ingresar al siguiente link: `);
            }
            req.body.director = usuario.id;
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