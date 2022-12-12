const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJwt } = require("../middlewares/validar-jwt");
const { noExisteRolByNombre, noExisteUsuarioById, noExisteDepartamentoById } = require("../helpers/db-validators");

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
    check("rol", "El rol es obligatorio").notEmpty(),
    check("rol").custom(noExisteRolByNombre),
    check("id_departamento", "El id del departamento es obligatorio").notEmpty(),
    check("id_departamento", "El id del departamento es invalido").isInt(),
    check("id_departamento").custom(noExisteDepartamentoById),
    check("realizaCai").optional().isBoolean(),
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
    check("correo", "Debe ser un correo valido").optional().isEmail(),
    check("nombre", "El nombre debe tener maximo 50 caracteres").optional().isLength({max:50}),
    check("apellido", "El apellido debe tener maximo 50 caracteres").optional().isLength({max:50}),
    check("codigo", "El codigo debe tener maximo 10 caracteres").optional().isLength({max:10}),
    check("telefono", "El telefono debe tener maximo 15 caracteres").optional().isLength({max:15}),
    check("realizaCai", "realizaCai debe ser boolean").optional().isBoolean(),
    check("id_departamento", "id_departamento es invalido").optional().isInt(),
    check("id_departamento").optional().custom(noExisteDepartamentoById),
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