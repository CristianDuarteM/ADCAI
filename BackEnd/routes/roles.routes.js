const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos.middleware");

const { listarRoles, registrarRol, actualizarRol, eliminarRol } = require("../controllers/roles.controller");
const { existeRol } = require("../middlewares/db-validators");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", listarRoles);

router.post("/", [
    validarJwt,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("nombre").custom(existeRol),
    validarCampos
], registrarRol);

router.put("/", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    check("id", "El id es obligatorio").notEmpty(),
    validarCampos
], actualizarRol);

router.delete("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    validarCampos
], eliminarRol);

module.exports = router;