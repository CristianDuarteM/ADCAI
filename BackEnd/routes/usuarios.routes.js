const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJwt } = require("../middlewares/validar-jwt");
const { noExisteRol } = require("../middlewares/db-validators");

const { registrarUsuarios,
        actualizarUsuario,
        borrarUsuario,
        listarUsuarios,
        buscarUsuarios,
        buscarUsuarioById,
        listarUsuariosByDepartamento,
        agregarRolToUsuario,
        eliminarRolToUsuario} = require("../controllers/usuarios.controller");

const router = Router();

router.get("/", [
    validarJwt
], listarUsuarios);

router.get("/departamento/:id", [
    //validarJwt,
    check("id", "El id del departamento no es valido").isInt(),
    validarCampos
], listarUsuariosByDepartamento);

router.get("/buscar", [
    validarJwt
], buscarUsuarios);

router.get("/:id", [
    //validarJwt,
    check("id", "El id no es valido").isInt(),
    validarCampos
], buscarUsuarioById);

router.post("/", [
    //validarJwt,
    check("correos", "Debe ingresar al menos un correo").notEmpty(),
    check("correos.*", "Deben ser correos validos").isEmail(),
    check("rol", "El rol es obligatorio").notEmpty(),
    check("id_departamento", "El id del departamento es obligatorio").notEmpty(),
    check("id_departamento", "El id del departamento es invalido").isInt(),
    validarCampos
], registrarUsuarios);

router.post("/agregarrolusuario", [
    //validarJwt,
    check("id_departamento_facultad", "El departamento es obligatorio").notEmpty(),
    check("correo", "Debe ingresar un correo valido").isEmail(),
    check("correo", "El correo es obligatorio").notEmpty(),
    check("rol", "El rol es obligatorio").notEmpty(),
    check("rol").custom(noExisteRol),
    validarCampos
], agregarRolToUsuario);

router.put("/:id", [
    validarJwt,
    check("id", "El id es invalido").isInt(),
    check("correo", "Debe ser un correo valido").isEmail(),
    validarCampos
], actualizarUsuario);

router.delete("/:id", [
    validarJwt,
    check("id", "Id Invalido").isInt(),
    validarCampos
], borrarUsuario);

router.delete("/eliminar/rolusuario", [
    //validarJwt
    check("id_departamento_facultad", "El departamento es obligatorio").notEmpty(),
    check("id_usuario", "Debe ingresar un correo valido").isInt(),
    check("id_usuario", "El id del usuario es obligatorio").notEmpty(),
    check("rol", "El rol es obligatorio").notEmpty(),
    check("rol").custom(noExisteRol),
    validarCampos
], eliminarRolToUsuario);

router.get("/hola/hola", (req, res) => {
    res.json({
        msg: "asdfasdfsdf"
    });
});

module.exports = router;