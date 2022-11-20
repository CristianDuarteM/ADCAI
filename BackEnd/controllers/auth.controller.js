const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");
const { Usuario, Rol } = require("../models");

const signInGoogle = async (req, res) => {
    const {id_token} = req.body;
    try {
        const {nombre_apellido, correo} = await googleVerify(id_token);
        console.log(id_token);
        //Verificar correo
        const usuario = await Usuario.findOne({
            where:{correo},
            include: {
                model: Rol,
                attributes: ["id", "nombre"],
                through: {
                    attributes: []
                }
            },
            attributes: ["id", "nombre_apellido", "codigo", "telefono", "id_departamento", "id_firma", "estaActivo"]
        });
        if(!usuario || !usuario.estaActivo){
            return res.status(401).json({
                msg: `No tienes autorizacion para ingresar`
            });
        }
        if(!usuario.codigo){
            await usuario.update({nombre_apellido});
            //Generar jwt
            const token = await generarJWT(usuario.id);
            return res.status(200).json({
                esCompleto: false,
                token,
                usuario
            });
        }
        //Generar jwt
        const token = await generarJWT(usuario.id);
        res.json({
            esCompleto: true,
            token,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "El token no se pudo verificar"
        });
    }
};

module.exports = {
    signInGoogle
};