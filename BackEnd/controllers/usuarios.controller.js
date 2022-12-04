const { Op } = require("sequelize");

const {Rol, Usuario, Departamento, Usuario_rol, Facultad} = require("../models/index");

const enviarCorreo = require("../services/mailer");

const listarUsuarios = async (req, res) => {
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
    let {correos, rol, id_departamento} = req.body;
    /*if((rol.toUpperCase() === "DOCENTE") && 
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
    }*/
    try {
        const usuarios = [];
        rol = await Rol.findOne({
            where:{
            nombre: rol
            }
        });
        if(!rol){
            return res.status(400).json({
                msg: "El rol que ingreso no existe"
            });
        }
        const existeDepartamento = await Departamento.findByPk(id_departamento);
        if(!existeDepartamento){
            return res.status(400).json({
                msg: "El id_departamento que ingreso no existe"
            });
        }
        for(let correo of correos){
            const existeUsuario = await Usuario.findOne({
                where: {
                    correo
                }
            });
            if(!existeUsuario){
                const usuario = await Usuario.create({correo, id_departamento});
                await usuario.addRols(rol);
                usuarios.push(usuario);
                enviarCorreo(correo, `Por favor complete su registro ingresando al siguiente link: `);
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

const agregarRolToUsuario = async (req, res) => {
    let {id_departamento_facultad, correo, rol} = req.body;
    /*if(req.usuario.Rols.filter(rol => (rol.nombre === "ADMIN")).length !== 1){
        return res.status(401).json({
            msg: `No se encuentra autorizado`
        });
    }*/
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

const eliminarRolToUsuario = async (req, res) => {
    let {id_departamento_facultad, id_usuario, rol} = req.body;
    /*if(req.usuario.Rols.filter(rol => (rol.nombre === "ADMIN")).length !== 1){
        return res.status(401).json({
            msg: `No se encuentra autorizado`
        });
    }*/
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
};

module.exports = {
    listarUsuarios,
    listarUsuariosByDepartamento,
    buscarUsuarios,
    buscarUsuarioById,
    registrarUsuarios,
    agregarRolToUsuario,
    actualizarUsuario,
    borrarUsuario,
    eliminarRolToUsuario
}