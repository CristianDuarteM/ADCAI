const { Op } = require("sequelize");
const enviarCorreo = require("../services/mailer");

const {Rol,
        Usuario,
        Departamento,
        Usuario_rol,
        Facultad,
        Firma} = require("../models/index");
const { registrarNotificacion } = require("./notificaciones.controller");

const listarUsuarios = async (req, res) => {
    if( (req.usuario.rols.filter(rol => (rol.nombre === "ADMIN")).length !== 1) &&
        (req.usuario.rols.filter(rol => (rol.nombre === "DECANO")).length !== 1) &&
        (req.usuario.rols.filter(rol => (rol.nombre === "DIRECTOR")).length !== 1) &&
        (req.usuario.rols.filter(rol => (rol.nombre === "DOCENTE")).length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {limite = 20, desde = 0} = req.query;
    try {
        const usuarios = await Usuario.findAndCountAll({
            attributes: { exclude: ["createdAt", "updatedAt"]},
            offset: Number(desde),
            limit: Number(limite)
        });
        res.json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const listarUsuariosByDepartamento = async (req, res) => {
    if( (req.usuario.rols.filter(rol => (rol.nombre === "ADMIN")).length !== 1) &&
        (req.usuario.rols.filter(rol => (rol.nombre === "DECANO")).length !== 1) &&
        (req.usuario.rols.filter(rol => (rol.nombre === "DIRECTOR")).length !== 1) &&
        (req.usuario.rols.filter(rol => (rol.nombre === "DOCENTE")).length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {id} = req.params;
    const {limite = 20, desde = 0} = req.query;
    try {
        const existeDepartamento = await Departamento.findByPk(id);
        if(!existeDepartamento){
            return res.status(400).json({
                msg: "No existe departamento con ese id"
            });
        }
        const usuarios = await Usuario.findAndCountAll({
            where: {
                id_departamento: id
            },
            attributes: { exclude: ["createdAt", "updatedAt"]},
            offset: Number(desde),
            limit: Number(limite)
        });
        res.json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const buscarUsuarios = async (req, res) => {
    if( (req.usuario.rols.filter(rol => (rol.nombre === "ADMIN")).length !== 1) &&
        (req.usuario.rols.filter(rol => (rol.nombre === "DECANO")).length !== 1) &&
        (req.usuario.rols.filter(rol => (rol.nombre === "DIRECTOR")).length !== 1) &&
        (req.usuario.rols.filter(rol => (rol.nombre === "DOCENTE")).length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {codigo, nombre, correo, departamento, limite = 20, desde = 0} = req.query;
    let buscar;
    if(codigo){
        if(!Number.isInteger(codigo)){
            return res.status(400).json({
                msg: `El codigo debe ser numerico`
            });
        }
        buscar = {
                codigo: {
                    [Op.substring]: codigo
                },
            id_departamento: departamento
            };
    } else if(nombre) {
        buscar = {
            [Op.or]: [
                {
                    nombre: {
                        [Op.substring]: nombre
                    }
                },
                {
                    apellido: {
                        [Op.substring]: nombre
                    }
                }
            ],
            id_departamento: departamento
        };
    } else if(correo){
        buscar = {
            correo: {
                [Op.substring]: correo
            },
            id_departamento: departamento
        };
    } else {
        buscar = {
            id_departamento: departamento
        };
    }
    try {
        const usuarios = await Usuario.findAndCountAll({
            attributes: { exclude: ["createdAt", "updatedAt"]},
            where: buscar,
            offset: Number(desde),
            limit: Number(limite)
        });
        res.json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const buscarUsuarioById = async (req, res) => {
    if( (req.usuario.rols.filter(rol => (rol.nombre === "ADMIN")).length !== 1) &&
        (req.usuario.rols.filter(rol => (rol.nombre === "DECANO")).length !== 1) &&
        (req.usuario.rols.filter(rol => (rol.nombre === "DIRECTOR")).length !== 1) &&
        (req.usuario.rols.filter(rol => (rol.nombre === "DOCENTE")).length !== 1)){
        return res.status(401).json({
            msg: "No se encuentra autorizado"
        });
    }
    const {id} = req.params;
    try {
        const usuario = await Usuario.findByPk(id, {
            attributes: { exclude: ["createdAt", "updatedAt"]},
            include: {
                model: Rol,
                attributes: ["id", "nombre"],
                through: {
                    attributes: []
                }
            }
        });
        if(!usuario){
            return res.json({usuario: {}});
        }
        res.json({usuario: usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const registrarUsuarios = async (req, res) => {
    if( (req.usuario.rols.filter(rol => (rol.nombre === "ADMIN")).length !== 1) &&
        (req.usuario.rols.filter(rol => (rol.nombre === "DIRECTOR")).length !== 1)){
        return res.status(401).json({
            msg: `No se encuentra autorizado`
        });
    }
    try {
        let {correos, id_departamento} = req.body;
        const usuarios = [];
        const docente = await Rol.findOne({
            where:{
            nombre: "DOCENTE"
            }
        });
        const director = await Rol.findOne({
            where:{
            nombre: "DIRECTOR"
            }
        });
        const decano = await Rol.findOne({
            where:{
            nombre: "DECANO"
            }
        });
        for(let correo of correos){
            const existeUsuario = await Usuario.findOne({
                where: {
                    correo
                }
            });
            if(!existeUsuario){
                const usuario = await Usuario.create({
                    correo,
                    id_departamento
                });
                await usuario.addRols(docente);
                usuarios.push(usuario);
                enviarCorreo(correo, `Has sido registrado en ADCAI \n Por favor complete su registro ingresando al siguiente link: `);
                registrarNotificacion(usuario.id, "Bienvenido a ADCAI la aplicacion para gestionar las cargas cademicas integrales", "DOCENTE");
            } else {
                if(!existeUsuario.id_departamento){
                    await existeUsuario.update({
                        id_departamento,
                    });
                } else {
                    if(existeUsuario.id_departamento !== id_departamento){
                        const esDirector = await Usuario_rol.findOne({
                            where: {
                                id_usuario: existeUsuario.id,
                                id_rol: director.id
                            }
                        });
                        if(esDirector){
                            return res.status(400).json({
                                msg: `El usuario ${existeUsuario.correo} no se puede registrar en este departamento porque es director de otro departamento`
                            });
                        }
                        const depus = await Departamento.findByPk(existeUsuario.id_departamento)
                        const dep = await Departamento.findByPk(id_departamento)
                        if(depus.id_facultad !== dep.id_facultad){
                            return res.status(400).json({
                                msg: `El usuario ${existeUsuario.correo} no se puede registrar en este departamento porque es de una facultad diferente`
                            });
                        }
                        await existeUsuario.update({
                            id_departamento
                        });
                    }
                }
                if(existeUsuario.estaActivo !== true){
                    await existeUsuario.update({
                        estaActivo: true
                    });
                    enviarCorreo(correo, `Has sido habilitado en ADCAI: `);
                    registrarNotificacion(existeUsuario.id, "Has sido habilitado en ADCAI ", "DOCENTE");
                    usuarios.push(existeUsuario);
                }
            }
        }
        res.status(201).json({
            msg: `Usuarios registrados exitosamente`,
            usuarios
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};
/*
const agregarRolToUsuario = async (req, res) => {
    let {id_departamento_facultad, correo, rol} = req.body;
    if(req.usuario.rols.filter(rol => (rol.nombre === "ADMIN")).length !== 1){
        return res.status(401).json({
            msg: `No se encuentra autorizado`
        });
    }
    try {
        const usuario = await Usuario.findOne({
            where: {
                correo
            }
        });
        if(!usuario){
            usuario = await Usuario.create({correo});
            enviarCorreo(correo);
        }
        rol = await Rol.findOne({
            where: {
                nombre: rol
            }
        });
        const usuario_rol = await Usuario_rol.findOne({
            where: {
                id_usuario: usuario.id,
                id_rol: rol.id
            }
        });
        if(usuario_rol){
            return res.json({
                msg: "El usuario ya posee ese rol"
            });
        }
        if(rol.nombre === "DIRECTOR"){
            const departamento = await Departamento.findByPk(id_departamento_facultad);
            await departamento.update({
                director: usuario.id
            });
            const usuario_rol = await Usuario_rol.create({
                id_usuario: usuario.id,
                id_rol: rol.id
            });
            await usuario.update({
                id_departamento: departamento.id
            });
            enviarCorreo(correo, `Has sido asignado como Director de departamento puede ingresar al siguiente link: `);
            res.status(201).json({
                msg: "Usuario asignado con exito",
                usuario,
                usuario_rol
            });
        } else if(rol.nombre === "DECANO"){ 
            const facultad = await Facultad.findByPk(id_departamento_facultad);
            await facultad.update({
                decano: usuario.id
            });
            const usuario_rol = await Usuario_rol.create({
                id_usuario: usuario.id,
                id_rol: rol.id
            });
            enviarCorreo(correo, `Has sido asignado como Decano de facultad puede ingresar al siguiente link: `);
            res.status(201).json({
                msg: "Usuario asignado con exito",
                usuario,
                usuario_rol, 
            });
        } else {
            res.status(400).json({
                msg: "Solo puedes registrar director o decano"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};*/
const actualizarUsuario = async (req, res) => {
    if( (req.usuario.rols.filter(rol => (rol.nombre === "ADMIN")).length !== 1) &&
        (req.usuario.rols.filter(rol => (rol.nombre === "DECANO")).length !== 1) &&
        (req.usuario.rols.filter(rol => (rol.nombre === "DIRECTOR")).length !== 1) &&
        (req.usuario.rols.filter(rol => (rol.nombre === "DOCENTE")).length !== 1)){
        return res.status(401).json({
            msg: `No se encuentra autorizado`
        });
    }
    try {
        const {id} = req.params;
        const {nombre, apellido, codigo, id_departamento, realizaCai, id_firma} = req.body;
        const usuario = await Usuario.findByPk(id);
        const director = await Rol.findOne({
            where: {
                nombre: "DIRECTOR"
            }
        });
        if(id_departamento){
            if(usuario.id_departamento){
                if(usuario.id_departamento !== id_departamento){
                    const esDirector = await Usuario_rol.findOne({
                        where: {
                            id_usuario: usuario.id,
                            id_rol: director.id
                        }
                    });
                    if(esDirector){
                        return res.status(400).json({
                            msg: `El usuario ${usuario.correo} no se puede registrar en este departamento ${id_departamento} porque es director de otro departamento`
                        });
                    }
                    const depus = await Departamento.findByPk(usuario.id_departamento);
                    const dep = await Departamento.findByPk(id_departamento);
                    if(depus.id_facultad !== dep.id_facultad){
                        return res.status(400).json({
                            msg: `El usuario ${usuario.correo} no se puede registrar en este departamento ${id_departamento} porque es de una facultad diferente`
                        });
                    }
                    /*await existeUsuario.update({
                        id_departamento
                    });*/
                }
            }
        }
        await usuario.update(req.body);
        res.json({
            msg: `Actualizado con exito`,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const borrarUsuario = async (req, res) => {
    const {id} = req.params;
    if( (req.usuario.rols.filter(rol => (rol.nombre === "ADMIN")).length !== 1) &&
        (req.usuario.rols.filter(rol => (rol.nombre === "DIRECTOR")).length !== 1)){
        return res.status(401).json({
            msg: `No se encuentra autorizado`
        });
    }
    try {
        const usuario = await Usuario.findByPk(id);
        await usuario.update({
            estaActivo: false
        });
        res.json({
            msg: `Usuario deshabilitado con exito`,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};
/*
const eliminarRolToUsuario = async (req, res) => {
    let {id_departamento_facultad, id_usuario, rol} = req.body;
    if(req.usuario.rols.filter(rol => (rol.nombre === "ADMIN")).length !== 1){
        return res.status(401).json({
            msg: `No se encuentra autorizado`
        });
    }
    try {
        rol = await Rol.findOne({
            where: {
                nombre: rol
            }
        });
        const usuario_rol = await Usuario_rol.findOne({
            where: {
                id_usuario,
                id_rol: rol.id
            }
        });
        if(!usuario_rol){
            return res.json({
                msg: "No existe usuario con ese rol asociado"
            });
        }
        if(rol.nombre === "DIRECTOR"){
            const departamento = await Departamento.findByPk(id_departamento_facultad);
            await departamento.update({
                director: null
            });
            const usuario_rol = await Usuario_rol.findOne({
                where:{
                    id_usuario,
                    id_rol: rol.id
                }
            });
            await usuario_rol.destroy();
            res.status(201).json({
                msg: "rol eliminado del usuario con exito",
                usuario_rol
            });
        } else if(rol.nombre === "DECANO"){ 
            const facultad = await Facultad.findByPk(id_departamento_facultad);
            await facultad.update({
                decano: null
            });
            const usuario_rol = await Usuario_rol.findOne({
                where:{
                    id_usuario,
                    id_rol: rol.id
                }
            });
            await usuario_rol.destroy();
            res.status(201).json({
                msg: "rol eliminado del usuario con exito",
                usuario_rol,
            });
        } else {
            res.status(400).json({
                msg: "Solo puedes registrar director o decano"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};*/

module.exports = {
    listarUsuarios,
    listarUsuariosByDepartamento,
    buscarUsuarios,
    buscarUsuarioById,
    registrarUsuarios,
    //agregarRolToUsuario,
    actualizarUsuario,
    borrarUsuario,
    //eliminarRolToUsuario
}