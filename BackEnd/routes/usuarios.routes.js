const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJwt } = require("../middlewares/validar-jwt");

const { registrarUsuarios, actualizarUsuario, borrarUsuario } = require("../controllers/usuarios.controller");

const router = Router();

router.post("/", [
    validarJwt,
    check("correos", "Debe ingresar al menos un correo").notEmpty(),
    check("correos.*", "Deben ser correos validos").isEmail(),
    check("rol", "El rol es obligatorio").notEmpty(),
    validarCampos
], registrarUsuarios);

router.put("/:id", [
    check("id", "El id es invalido").isInt(),
    check("correo", "Debe ser un correo valido").isEmail(),
    validarCampos
], actualizarUsuario);

router.delete("/:id", [
    validarJwt,
    check("id", "Id Invalido").isInt(),
    validarCampos
], borrarUsuario);

module.exports = router;