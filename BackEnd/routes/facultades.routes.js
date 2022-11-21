const {Router} = require("express");
const { check } = require("express-validator");

const { registrarFacultad,
        actualizarFacultad,
        eliminarFacultad,
        listarFacultades, 
        buscarFacultadByNombre,
        buscarFacultadById} = require("../controllers/facultades.controller");

const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", [
    validarJwt
], listarFacultades);

router.get("/buscar", [
    validarJwt
], buscarFacultadByNombre);

router.get("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    validarCampos
], buscarFacultadById);

router.post("/", [
    validarJwt,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos
],registrarFacultad);

router.put("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    validarCampos
], actualizarFacultad);

router.delete("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    validarCampos
], eliminarFacultad);

module.exports = router;