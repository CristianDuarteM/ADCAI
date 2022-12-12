const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");
const { Usuario, Rol, Firma, Notificacion,  } = require("../models");

const signInGoogle = async (req, res) => {
    const {id_token} = req.body;
    let x;
    try {
        x = await googleVerify(id_token);
        console.log(x);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "El token no se pudo verificar"
        });
    }
    try {
        console.log(x);
        const {nombre, apellido, correo} = x;
        console.log(id_token);
        //Verificar correo
        const usuario = await Usuario.findOne({
            where:{correo},
            include: [
                {
                    model: Rol,
                    attributes: ["id", "nombre"],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Firma,
                    attributes: ["id", "ruta_firma"]
                },
            ],
            attributes: { exclude: ["createdAt", "updatedAt"]}
        });
        if(!usuario || !usuario.estaActivo){
            return res.status(401).json({
                msg: `No tienes autorización para ingresar`
            });
        }
        if(!usuario.codigo){
            await usuario.update({nombre, apellido});
            //Generar jwt
            const token = await generarJWT(usuario.id);
            const notifiacaiones = await Notificacion.findOne({
                where:{
                    id_usuario: usuario.id,
                    leido: false
                }
            });
            let tieneNotificaciones = false;
            if(notifiacaiones){
                tieneNotificaciones = true;
            }
            return res.status(200).json({
                esCompleto: false,
                token,
                usuario,
                tieneNotificaciones
            });
        }
        const notifiacaiones = await Notificacion.findOne({
            where:{
                id_usuario: usuario.id,
                leido: false
            }
        });
        let tieneNotificaciones = false;
        if(notifiacaiones){
            tieneNotificaciones = true;
        }
        //Generar jwt
        const token = await generarJWT(usuario.id);
        res.json({
            esCompleto: true,
            token,
            usuario,
            tieneNotificaciones
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
};

module.exports = {
    signInGoogle
};