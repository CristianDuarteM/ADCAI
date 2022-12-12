const {Router} = require("express");
const { check } = require("express-validator");


const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJwt } = require("../middlewares/validar-jwt");
const { existeActividadExtensionByNombre, 
        noExisteActividadExtensionById } = require("../helpers/db-validators");

const { registrarActividadExtension, 
        actualizarActividadExtension, 
        eliminarActividadExtension, 
        listarActividadExtension, 
        buscarActividadExtensionById } = require("../controllers/actividades_extension.controller");

const router = Router();

router.get("/", [
    validarJwt
], listarActividadExtension);

router.get("/:id", [
    validarJwt,
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteActividadExtensionById),
    validarCampos
], buscarActividadExtensionById);

router.post("/", [
    validarJwt,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("nombre", "El nombre debe tener maximo 400 caracteres").isLength({max:400}),
    check("nombre").custom(existeActividadExtensionByNombre),
    check("descripcion", "La descripcion debe tener 150 caracteres").optional().isLength({max:400}),
    check("listar", "Debe indicar si hay que especificar actividades" ).notEmpty(),
    check("listar", "Debe ser un campo boolean" ).isBoolean(),
    validarCampos
], registrarActividadExtension);

router.put("/:id", [
    validarJwt,
    check("id", "El id de la activiad de exntensión es obligatorio").notEmpty(),
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteActividadExtensionById),
    check("nombre", "El nombre debe tener maximo 400 caracteres").optional().isLength({max:400}),
    check("nombre").optional().custom(existeActividadExtensionByNombre),
    check("descripcion", "La descripcion debe tener 400 caracteres").optional().isLength({max:400}),
    check("listar", "Debe ser un campo boolean" ).optional().isBoolean(),
    validarCampos
], actualizarActividadExtension);

router.delete("/:id", [
    validarJwt,
    check("id", "El id de la activiad de extensión es obligatorio").notEmpty(),
    check("id", "El id no es valido").isInt(),
    check("id").custom(noExisteActividadExtensionById),
    validarCampos
], eliminarActividadExtension);

module.exports = router;