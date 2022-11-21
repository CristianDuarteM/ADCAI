const { Op } = require("sequelize");

const {Rol, Usuario} = require("../models/index");

const enviarCorreo = require("../services/mailer");

const listarUsuarios = async (req, res) => {
    const {limite = 20, desde = 0} = req.query;
    try {
        const usuarios = await Usuario.findAndCountAll({
            attributes: ["id", "codigo", "nombre", "apellido", "correo", "telefono", "esTiempoCompleto"],
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
    const {codigo, nombre, correo, limite = 20, desde = 0} = req.query;
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
                estaActivo: true
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
            estaActivo: true
        };
    } else {
        buscar = {
            correo: {
                [Op.substring]: correo
            },
            estaActivo: true
        };
    }
    try {
        const usuarios = await Usuario.findAndCountAll({
            attributes: ["id", "codigo", "nombre", "apellido", "correo", "telefono", "esTiempoCompleto"],
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
    const {id} = req.params;
    try {
        const usuario = await Usuario.findByPk(id, {
            attributes: ["id", "codigo", "nombre", "apellido", "correo", "telefono", "esTiempoCompleto"]
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
    let {correos, rol} = req.body;
    if((rol.toUpperCase() === "DOCENTE") && 
        ((req.usuario.Rols.filter(rol => (rol.nombre === "ADMIN")).length !== 1) && (req.usuario.Rols.filter(rol => (rol.nombre === "DIRECTOR")).length !== 1))
    ){
        return res.status(401).json({
            msg: `No se encuentra autorizado`
        });
    }
    if(((rol.toLowerCase() === "DECANO") || (rol.toLowerCase() === "DIRECTOR")) && 
        (req.usuario.Rols.filter(rol => rol.nombre === "ADMIN").length !== 1)
    ){
        return res.status(401).json({
            msg: `No se encuentra autorizado`
        });
    }
    try {
        const usuarios = [];
        rol = await Rol.findOne({
            where:{
            nombre: rol
            }
        });
        for(let correo of correos){
            const existeUsuario = await Usuario.findOne({
                where: {
                    correo
                }
            });
            if(!existeUsuario){
                const usuario = await Usuario.create({correo});
                await usuario.addRols(rol);
                usuarios.push(usuario);
                enviarCorreo(correo);
            }
        }
        res.status(201).json({
            msg: `Usuarios registrados`,
            usuarios
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

const actualizarUsuario = async (req, res) => {
    const {id} = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if(!usuario){
            return res.status(400).json({
                msg: `No existe usuario con ese id`
            });
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
    if((req.usuario.Rols.filter(rol => (rol.nombre === "ADMIN")).length !== 1) && (req.usuario.Rols.filter(rol => (rol.nombre === "DIRECTOR")).length !== 1)){
        return res.status(401).json({
            msg: `No se encuentra autorizado`
        });
    }
    try {
        const usuario = await Usuario.findByPk(id);
        if(!usuario){
            return res.status(400).json({
                msg: `No existe usuario con ese id`,
            });
        }
        await usuario.update({
            estaActivo: false
        });
        res.json({
            msg: `Usuario eliminado con exito`,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

module.exports = {
    listarUsuarios,
    buscarUsuarios,
    buscarUsuarioById,
    registrarUsuarios,
    actualizarUsuario,
    borrarUsuario
}