const jwt = require("jsonwebtoken");
const { Usuario, Rol } = require("../models");

const validarJwt = async (req, res, next) => {
    const token = req.header("x-token");
    if(!token){
        return res.status(401).json({
            msg: `No hay token en la petición`
        });
    }
    try {
        const {id} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findByPk(id,{
            attributes: { exclude: ["createdAt", "updatedAt"]},
            include: {
                model: Rol,
                attributes: ["id", "nombre"],
                through: {
                    attributes: []
                }
            }
        });
        if(!usuario || !usuario.estaActivo){
            return res.status(401).json({
                msg: "Token no valido"
            });
        }
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: `Token no valido`
        });
    }
    
};

module.exports = {
    validarJwt
};
