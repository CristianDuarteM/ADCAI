const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJwt } = require("../middlewares/validar-jwt");
const { noExisteRolByNombre, noExisteUsuarioById, noExisteDepartamentoById, noExisteFirmaById, existeUsuarioByCodigo } = require("../helpers/db-validators");

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
    validarJwt,
    check("id", "El id del departamento no es valido").isInt(),
    validarCampos
], listarUsuariosByDepartamento);

router.get("/buscar", [
    validarJwt
], buscarUsuarios);

router.get("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteUsuarioById),
    validarCampos
], buscarUsuarioById);

router.post("/", [
    validarJwt,
    check("correos", "Debe ingresar al menos un correo").notEmpty(),
    check("correos.*", "Deben ser correos validos").isEmail(),
    check("id_departamento", "El id del departamento es obligatorio").notEmpty(),
    check("id_departamento", "El id del departamento es invalido").isInt(),
    check("id_departamento").custom(noExisteDepartamentoById),
    validarCampos
], registrarUsuarios);
/*
router.post("/agregarrolusuario", [
    validarJwt,
    check("id_departamento_facultad", "El departamento es obligatorio").notEmpty(),
    check("correo", "Debe ingresar un correo valido").isEmail(),
    check("correo", "El correo es obligatorio").notEmpty(),
    check("rol", "El rol es obligatorio").notEmpty(),
    check("rol").custom(noExisteRolByNombre),
    validarCampos
], agregarRolToUsuario);
*/
router.put("/:id", [
    validarJwt,
    check("id", "El id es invalido").isInt(),
    check("id").custom(noExisteUsuarioById),
    //check("correo", "El correo no se puede cambiar").isEmpty(),
    check("nombre", "El nombre debe tener maximo 50 caracteres").isLength({max:50}),
    check("apellido", "El apellido debe tener maximo 50 caracteres").isLength({max:50}),
    check("codigo", "El codigo debe tener maximo 10 caracteres").isLength({max:10}),
    check("codigo", "Ya existe un usuario con ese codigo").optional().custom(existeUsuarioByCodigo),
    check("realizaCai", "realizaCai debe ser boolean").optional().isBoolean(),
    check("id_departamento", "id_departamento es invalido").optional().isInt(),
    check("id_departamento").optional().custom(noExisteDepartamentoById),
    check("id_firma", "id_firma es invalido").optional().isInt(),
    check("id_firma").optional().custom(noExisteFirmaById),
    validarCampos
], actualizarUsuario);

router.delete("/:id", [
    validarJwt,
    check("id", "Id Invalido").isInt(),
    check("id").custom(noExisteUsuarioById),
    validarCampos
], borrarUsuario);
/*
router.delete("/eliminar/rolusuario", [
    validarJwt
    check("id_departamento_facultad", "El departamento es obligatorio").notEmpty(),
    check("id_usuario", "Debe ingresar un correo valido").isInt(),
    check("id_usuario", "El id del usuario es obligatorio").notEmpty(),
    check("rol", "El rol es obligatorio").notEmpty(),
    check("rol").custom(noExisteRolByNombre),
    validarCampos
], eliminarRolToUsuario);
*/
module.exports = router;