const {Router} = require("express");
const { check } = require("express-validator");
const { cargarEvidencia, mostrarEvidencia, cargarSinFirma } = require("../controllers/evidencias.controller");
const { noExisteCAIById } = require("../helpers/db-validators");
const { validarArchivoSubir } = require("../middlewares/validar-archivo-subir");
const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.post("/sinFirma/:id", [
    validarJwt,
    check("id", "El id es obligatorio").notEmpty(),
    check("id", "Id invalido").isInt(),
    check("id").custom(noExisteCAIById),
    check("rol", "El rol es obligatorio").notEmpty(),
    check("rol", "Debes enviarme un rol valido: DOCENTE, DIRECTOR, DECANO").isIn(["DOCENTE", "DIRECTOR", "DECANO"]),
    validarArchivoSubir,
    validarCampos
], cargarSinFirma);

router.post("/:id", [
    validarJwt,
    check("id", "El id es obligatorio").notEmpty(),
    check("id", "Id invalido").isInt(),
    check("id").custom(noExisteCAIById),
    validarArchivoSubir,
    validarCampos
], cargarEvidencia);

router.get("/:id", [
    validarJwt,
    check("id", "El id es obligatorio").notEmpty(),
    check("id", "Id invalido").isInt(),
    check("id").custom(noExisteCAIById),
    validarCampos
], mostrarEvidencia);

module.exports = router;