const { Router } = require("express");
const { check } = require("express-validator");

const { validarJwt } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { noExistenAsignaturasById,
         noExisteAInvestigacionById, 
         noExisteActividadExtensionById, 
         listarExtension,
         noExisteAAdministracionById,
         listarAdministracion,
         noExisteRepresentacionById,
         listarRepresentacion,
         noExisteOtraActividadById,
         listarOtras,
         noExisteUsuarioById,
         noExisteCAIById,
         noExisteFirmaById,
         listarSinHorasActividad,
         noExisteDepartamentoById} = require("../helpers/db-validators");

const { listarCaisByUsuario,
        registrarCai,
        consultarCaiById,
        evaluarCaiDirector,
        evaluarCaiDecano,
        actualizarCai,
        generarPdfCai,
        generarPdfCaiPorDepartamento} = require("../controllers/cais.controller");

const router =Router();

router.get('/pdf/departamento/:id', [
    //validarJwt,
    check("id").custom(noExisteDepartamentoById),
    validarCampos
], generarPdfCaiPorDepartamento);

router.get('/pdf/:id', [
    //validarJwt,
    check("id").custom(noExisteCAIById),
    validarCampos
], generarPdfCai);



/*router.get('/pdf/departamento/:id', [
    /*validarJwt,
    check("id").custom(noExisteDepartamentoById),
    validarCampos
], generarPdfPorDepartamento);*/

router.get("/listar", [
    validarJwt,
    check("usuario", "El id del usuario es obligatorio").notEmpty(),
    check("usuario", "El id es invalido").isInt(),
    check("usuario").custom(noExisteUsuarioById),
    check("rol").notEmpty(),
    check("rol", "Debes enviarme un rol valido").isIn(["docente", "director", "decano"]),
    check("evaluar", "Debes indicarme si evaluar o no").isIn(["si", "no"]),
    validarCampos
], listarCaisByUsuario);

router.get("/:id", [
    validarJwt,
    check("id", "El id es ibligatorio").notEmpty(),
    check("id", "El id es invalido").isInt(),
    check("id").custom(noExisteCAIById),
    validarCampos
], consultarCaiById);

router.post("/", [
    validarJwt,
    check("dedicacion", "La dedicacion es obligatoria").notEmpty(),
    check("dedicacion", "La dedicacion no debe ser mayor a  2 caracteres").isLength({max: 2}),
    check("asignaturas.*", "Id invalido de la asignatura").optional().isInt(),
    check("asignaturas").optional().custom(noExistenAsignaturasById),
    check("investigacion.*.id", "Debes ingresarme el id de actividades de investigacion").notEmpty(),
    check("investigacion.*.id", "El id es invalido en las actividades de investigacion").isInt(),
    check("investigacion.*.id").custom(noExisteAInvestigacionById),
    check("investigacion.*.horas", "Debes ingresarme la hora de actividades de investigacion").notEmpty(),
    check("investigacion.*.horas", "Las horas deben ser un numero en de actividades de investigacion").isNumeric(),
    check("extension.*.id", "Debes ingresarme el id de actividades de extension").notEmpty(),
    check("extension.*.id", "El id es invalido en actividades de extension").isInt(),
    check("extension.*.id").custom(noExisteActividadExtensionById),
    //check("extension").optional().custom(listarExtension),
    check("extension").optional().custom(listarSinHorasActividad),
    check("extension.*.horas", "Debes ingresarme la hora de actividades de extension").notEmpty(),
    check("extension.*.horas", "Las horas deben ser un numero en actividades de extension").isNumeric(),
    check("extension.*.nombre", "Debe tener maximo 1000 caracteres").isLength({max: 1000}),
    check("administracion.*.id", "Debes ingresarme el id de actividades de administracion").notEmpty(),
    check("administracion.*.id", "El id es invalido en actividades de administracion").isInt(),
    check("administracion.*.id").custom(noExisteAAdministracionById),
    //check("administracion").optional().custom(listarAdministracion),
    check("administracion").optional().custom(listarSinHorasActividad),
    check("administracion.*.horas", "Debes ingresarme la hora de actividades de administracion").notEmpty(),
    check("administracion.*.horas", "Las horas deben ser un numero en actividades de administracion").isNumeric(),
    check("administracion.*.nombre", "Debe tener maximo 1000 caracteres").isLength({max: 1000}),
    check("representacion.*.id", "Debes ingresarme el id de actividades de representacion").notEmpty(),
    check("representaciones.*.id", "El id es invalido en actividades de administracion").isInt(),
    check("representaciones.*.id").custom(noExisteRepresentacionById),
    //check("representaciones").optional().custom(listarRepresentacion),
    check("representaciones").optional().custom(listarSinHorasActividad),
    check("representaciones.*.horas", "Debes ingresarme la hora de actividades de representacion").notEmpty(),
    check("representaciones.*.horas", "Las horas deben ser un numero en actividades de administracion").isNumeric(),
    check("representaciones.*.nombre", "Debe tener maximo 1000 caracteres en actividades de administracion").isLength({max: 1000}),
    check("otras.*.id", "Debes ingresarme el id de actividades de otras").notEmpty(),
    check("otras.*.id", "El id es invalido en actividades otras").isInt(),
    check("otras.*.id").custom(noExisteOtraActividadById),
    //check("otras").optional().custom(listarOtras),
    check("otras").optional().custom(listarSinHorasActividad),
    check("otras.*.horas", "Debes ingresarme la hora de actividades otras").notEmpty(),
    check("otras.*.horas", "Las horas deben ser un numero en actividades otras").isNumeric(),
    check("otras.*.nombre", "Debe tener maximo 1000 caracteres en actividades otras").isLength({max: 1000}),
    check("observaciones", "La observacion no debe ser mayor a  500 caracteres").isLength({max: 500}),
    //check("id_firma", "La firma es obligatoria").notEmpty(),
    check("id_firma", "El id_firma es invalido").optional().isInt(),
    check("id_firma").optional().custom(noExisteFirmaById),
    validarCampos
], registrarCai);

router.put("/evaluarDirector/:id",[ 
    validarJwt,
    check("id", "El id es ibligatorio").notEmpty(),
    check("id", "El id es invalido").isInt(),
    check("id").custom(noExisteCAIById),
    check("aprobado", "El campo es obligatorio").notEmpty(),
    check("aprobado", "El campo no debe boolean").isBoolean(),
    check("docencia", "El campo no debe ser mayor a  1000 caracteres").isLength({max: 1000}),
    check("investigacion", "El campo no debe ser mayor a  1000 caracteres").isLength({max: 1000}),
    check("extension", "El campo no debe ser mayor a  1000 caracteres").isLength({max: 1000}),
    check("administracion", "El campo no debe ser mayor a  1000 caracteres").isLength({max: 1000}),
    check("representacion", "El campo no debe ser mayor a  1000 caracteres").isLength({max: 1000}),
    check("otras", "El campo no debe ser mayor a  1000 caracteres").isLength({max: 1000}),
    validarCampos,
], evaluarCaiDirector);

router.put("/evaluarDecano/:id",[ 
    validarJwt,
    check("id", "El id es ibligatorio").notEmpty(),
    check("id", "El id es invalido").isInt(),
    check("id").custom(noExisteCAIById),
    check("aprobado", "El campo es obligatorio").notEmpty(),
    check("aprobado", "El campo no debe boolean").isBoolean(),
    check("docencia", "El campo no debe ser mayor a  1000 caracteres").isLength({max: 1000}),
    check("investigacion", "El campo no debe ser mayor a  1000 caracteres").isLength({max: 1000}),
    check("extension", "El campo no debe ser mayor a  1000 caracteres").isLength({max: 1000}),
    check("administracion", "El campo no debe ser mayor a  1000 caracteres").isLength({max: 1000}),
    check("representacion", "El campo no debe ser mayor a  1000 caracteres").isLength({max: 1000}),
    check("otras", "El campo no debe ser mayor a  1000 caracteres").isLength({max: 1000}),
    validarCampos,
], evaluarCaiDecano);

router.put("/:id_cai", [
    validarJwt,
    check("id_cai", "El id del cai es obligatorio").notEmpty(),
    check("id_cai", "El id del cai es invalido").isInt(),
    check("id_cai").custom(noExisteCAIById),
    check("dedicacion", "La dedicacion es obligatoria").notEmpty(),
    check("dedicacion", "La dedicacion no debe ser mayor a  2 caracteres").isLength({max: 2}),
    check("asignaturas.*", "Id invalido de la asignatura").optional().isInt(),
    check("asignaturas").optional().custom(noExistenAsignaturasById),
    check("investigacion.*.id", "Debes ingresarme el id de actividades de investigacion").notEmpty(),
    check("investigacion.*.id", "El id es invalido en las actividades de investigacion").isInt(),
    check("investigacion.*.id").custom(noExisteAInvestigacionById),
    check("investigacion.*.horas", "Debes ingresarme la hora de actividades de investigacion").notEmpty(),
    check("investigacion.*.horas", "Las horas deben ser un numero en de actividades de investigacion").isNumeric(),
    check("extension.*.id", "Debes ingresarme el id de actividades de extension").notEmpty(),
    check("extension.*.id", "El id es invalido en actividades de extension").isInt(),
    check("extension.*.id").custom(noExisteActividadExtensionById),
    //check("extension").optional().custom(listarExtension),
    check("extension").optional().custom(listarSinHorasActividad),
    check("extension.*.horas", "Debes ingresarme la hora de actividades de extension").notEmpty(),
    check("extension.*.horas", "Las horas deben ser un numero en actividades de extension").isNumeric(),
    check("extension.*.nombre", "Debe tener maximo 1000 caracteres").isLength({max: 1000}),
    check("administracion.*.id", "Debes ingresarme el id de actividades de administracion").notEmpty(),
    check("administracion.*.id", "El id es invalido en actividades de administracion").isInt(),
    check("administracion.*.id").custom(noExisteAAdministracionById),
    //check("administracion").optional().custom(listarAdministracion),
    check("administracion").optional().custom(listarSinHorasActividad),
    check("administracion.*.horas", "Debes ingresarme la hora de actividades de administracion").notEmpty(),
    check("administracion.*.horas", "Las horas deben ser un numero en actividades de administracion").isNumeric(),
    check("administracion.*.nombre", "Debe tener maximo 1000 caracteres").isLength({max: 1000}),
    check("representacion.*.id", "Debes ingresarme el id de actividades de representacion").notEmpty(),
    check("representaciones.*.id", "El id es invalido en actividades de administracion").isInt(),
    check("representaciones.*.id").custom(noExisteRepresentacionById),
    //check("representaciones").optional().custom(listarRepresentacion),
    check("representaciones").optional().custom(listarSinHorasActividad),
    check("representaciones.*.horas", "Debes ingresarme la hora de actividades de representacion").notEmpty(),
    check("representaciones.*.horas", "Las horas deben ser un numero en actividades de administracion").isNumeric(),
    check("representaciones.*.nombre", "Debe tener maximo 1000 caracteres en actividades de administracion").isLength({max: 1000}),
    check("otras.*.id", "Debes ingresarme el id de actividades de otras").notEmpty(),
    check("otras.*.id", "El id es invalido en actividades otras").isInt(),
    check("otras.*.id").custom(noExisteOtraActividadById),
    //check("otras").optional().custom(listarOtras),
    check("otras").optional().custom(listarSinHorasActividad),
    check("otras.*.horas", "Debes ingresarme la hora de actividades otras").notEmpty(),
    check("otras.*.horas", "Las horas deben ser un numero en actividades otras").isNumeric(),
    check("otras.*.nombre", "Debe tener maximo 1000 caracteres en actividades otras").isLength({max: 1000}),
    check("observaciones", "La observacion no debe ser mayor a  500 caracteres").isLength({max: 500}),
    //check("id_firma", "La firma es obligatoria").notEmpty(),
    check("id_firma", "El id_firma es invalido").optional().isInt(),
    check("id_firma").optional().custom(noExisteFirmaById),
    validarCampos
], actualizarCai);

module.exports = router;