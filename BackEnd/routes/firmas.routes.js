const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJwt } = require("../middlewares/validar-jwt");

const { registrarFirma, 
        cargarFirma,
        mostrarFirma,
        //eliminarFirma
     } = require("../controllers/firmas.controller");
const { validarArchivoSubir } = require("../middlewares/validar-archivo-subir");

const router = Router();

router.post("/", [
    validarJwt,
    validarArchivoSubir,
    validarCampos
], cargarFirma);

router.get("/", [
    validarJwt,
], mostrarFirma);

/*router.post("/", [
    validarJwt,
], registrarFirma);/

/*router.delete("/", [
    validarJwt,
], eliminarFirma);*/

module.exports = router;