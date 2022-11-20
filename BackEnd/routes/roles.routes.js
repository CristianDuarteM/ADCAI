const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos.middleware");

const { listarRoles, registrarRol, actualizarRol, eliminarRol } = require("../controllers/roles.controller");

const router = Router();

router.get("/", listarRoles);

router.post("/", [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos
], registrarRol);

router.put("/", [
    check("id", "El id no es valido").isInt(),
    check("id", "El id es obligatorio").notEmpty(),
    validarCampos
], actualizarRol);

router.delete("/:id", [
    check("id", "El id no es valido").isInt(),
    validarCampos
], eliminarRol);



module.exports = router;