const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJwt } = require("../middlewares/validar-jwt");
const { existeRolByNombre, 
        noExisteRolById } = require("../helpers/db-validators");

const { listarRoles,
        registrarRol,
        actualizarRol,
        eliminarRol } = require("../controllers/roles.controller");

const router = Router();

router.get("/", [
    validarJwt
], listarRoles);

router.post("/", [
    validarJwt,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("nombre", "El nombre debe tener 50 caracteres").isLength({max: 50}),
    check("nombre").custom(existeRolByNombre),
    check("descripcion", "La descripcion debe tener 150 caracteres").optional().isLength({max: 150}),
    validarCampos
], registrarRol);

router.put("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteRolById),
    check("nombre", "El nombre debe tener 50 caracteres").optional().isLength({max: 50}),
    check("nombre").optional().custom(existeRolByNombre),
    check("descripcion", "La descripcion debe tener 150 caracteres").optional().isLength({max: 150}),
    validarCampos
], actualizarRol);

router.delete("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteRolById),
    validarCampos
], eliminarRol);

module.exports = router;