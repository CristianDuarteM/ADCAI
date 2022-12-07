const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJwt } = require("../middlewares/validar-jwt");

const { registrarFirma,
        eliminarFirma } = require("../controllers/firmas.controller");

const router = Router();

router.post("/", [
    validarJwt,
    check("ruta_firma", "La ruta de la firma es obligatoria").notEmpty(),
    validarCampos
], registrarFirma);

router.delete("/", [
    validarJwt,
], eliminarFirma);

module.exports = router;