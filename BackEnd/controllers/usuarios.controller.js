const {Rol} = require("../models/index");
const {Usuario} = require("../models/index");
const enviarCorreo = require("../services/mailer");

const registrarUsuarios = async (req, res) => {
    let {correos, rol} = req.body;
    if((rol.toLowerCase() === "docente") && 
        ((req.usuario.Rols.filter(rol => (rol.nombre === "admin")).length !== 1) && (req.usuario.Rols.filter(rol => (rol.nombre === "director")).length !== 1))
    ){
        return res.status(401).json({
            msg: `No se encuentra autorizado`
        });
    }
    if(((rol.toLowerCase() === "decano") || (rol.toLowerCase() === "director")) && 
        (req.usuario.Rols.filter(rol => rol.nombre === "admin").length !== 1)
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
                msg: `El usuario con el id ${id} no existe`
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
    if((req.usuario.Rols.filter(rol => (rol.nombre === "admin")).length !== 1) && (req.usuario.Rols.filter(rol => (rol.nombre === "director")).length !== 1)){
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
    registrarUsuarios,
    actualizarUsuario,
    borrarUsuario
}