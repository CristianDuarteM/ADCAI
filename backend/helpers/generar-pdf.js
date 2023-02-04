const path = require("path");
const fs = require("fs");
const moment = require("moment");
const PdfPrinter = require('pdfmake');
const { fonts } = require('./fonts');


const createPdf = async (cai) => {
  const printer = new PdfPrinter(fonts);
  let asignaturas = [];
  /*------------------------\\ Asignaturas //------------------------*/
  let hmaterias = 0;
  for(asignatura of cai.asignaturas){
    asignaturas.push([asignatura.nombre, asignatura.plan_estudio.nombre, asignatura.creditos, asignatura.horas_teoricas, asignatura.horas_practicas]);
    hmaterias = hmaterias + asignatura.horas_teoricas + asignatura.horas_practicas;
  }
  /*------------------------\\ Investigaciones //------------------------*/
  let investigaciones = [];
  let hinvestigaciones = 0;
  for(investigacion of cai.actividad_investigacions){
    let nombre = investigacion.nombre.toLowerCase();
    investigaciones.push([nombre[0].toUpperCase() + nombre.slice(1), investigacion.descripcion_horas, investigacion.periodo_docente_actividad_investigacion.horas]);
    hinvestigaciones += investigacion.periodo_docente_actividad_investigacion.horas
  }
  /*------------------------\\ Extensiones //------------------------*/
  let extensiones = [];
  let hextension = 0;
  let i =0;
  for(ex of cai.actividad_extensions){
    ++i;
    extensiones.push({
                        margin: [40, 0, 2, 0],
                        columns:[
                          {width: 350, text: `${i}. ${ex.nombre}`},
                          {alignment: "center", text: `${ex.periodo_docente_actividad_extension.horas}`}
                        ]
                      });
    extensiones.push({ margin: [40, 0, 0, 0], text: `${ex.descripcion}`});
    hextension = hextension + ex.periodo_docente_actividad_extension.horas;
    if(ex.listar){
      if(ex.periodo_docente_actividad_extension.nombre){
        extensiones.push({margin: [40, 3, 0, 3], text: `Identificar el proyecto de Extensión: ${ex.periodo_docente_actividad_extension.nombre}`});
      } else {
        extensiones.push({margin: [40, 3, 0, 3], text: `Identificar el proyecto de Extensión: ______________________________________`});
      }
    }
  }
  /*------------------------\\ Administraciones //------------------------*/
  let administraciones = [];
  let hadministracion = 0;
  let q =0;
  for(ex of cai.actividad_administracions){
    ++q;
    administraciones.push({
                        margin: [40, 0, 2, 0],
                        columns:[
                          {width: 350, text: `${q}. ${ex.nombre} (Enunciarlo)`},
                          {alignment: "center", text: `${ex.periodo_docente_actividad_administracion.horas}`}
                        ]
                      });
    administraciones.push({text: `${ex.descripcion}`});
    hadministracion = hadministracion + ex.periodo_docente_actividad_administracion.horas;
    if(ex.listar){
      if(ex.periodo_docente_actividad_administracion.nombre){
        administraciones.push({margin: [40, 3, 0, 3], text: `${ex.periodo_docente_actividad_administracion.nombre}`});
      } else {
        administraciones.push({margin: [40, 10, 0, 3], text: `___________________________________________________________________________`});
      }
    }
  }
  /*------------------------\\ Representaciones //------------------------*/
  let representaciones = [];
  let hrepresentacion = 0;
  let w =0;
  for(ex of cai.tipo_representacions){
    ++w;
    representaciones.push({bold: true, margin: [40,0,0,0],width: 100, text: `${w}. ${ex.nombre}: `});
    representaciones.push({
                            margin: [40,5,0,5],
                            columns:[
                              {width: 430, text: `${ex.descripcion}`},
                              {width: "auto", text: `${ex.periodo_docente_representacion.horas}`}
                            ]
                          });
    hrepresentacion = hrepresentacion + ex.periodo_docente_representacion.horas;
    if(ex.listar){
      if(ex.periodo_docente_representacion.nombre){
        representaciones.push({margin: [40,0,0,0], text: `${ex.periodo_docente_representacion.nombre}`});
      } else {
        representaciones.push({margin: [40,0,0,0], text: `_________________________________________`});
      }
    }
  }
  /*------------------------\\ Otras //------------------------*/
  let otras = [];
  let hotras = 0;
  let e =0;
  for(ex of cai.actividad_otras){
    ++e;
    otras.push({margin: [40,5,20,0], bold: true, text: `${e}. ${ex.nombre}`});
    otras.push(
      {
        margin: [40,5,0,0],
        columns:[
          {width: 430, text: `${ex.descripcion}`},
          {text: `${ex.periodo_docente_otra.horas}`}
        ]
      }
    ),
    hotras = hotras + ex.periodo_docente_otra.horas;
    if(ex.listar){
      if(ex.periodo_docente_otra.nombre){
        otras.push({margin: [40,0,0,0], text: `${ex.periodo_docente_otra.nombre}`});
      } else {
        otras.push({margin: [40,0,0,0], text: `_________________________________________`});
      }
    }
  }
  /*------------------------\\ Observacion //------------------------*/
  let observacion;
  if(cai.observacion){
    observacion = { margin: [40,0,0,0], text: `${cai.observacion}` };
  } else {
    observacion = { margin: [40,20,0,0], text: `_________________________________________________________________________` };
  }
  
  
  /*------------------------\\ Notas //------------------------*/
  let notas = [];
  for(ex of cai.notas){
    notas.push({alignment: "center", fontSize:9, margin: [0,5,30,0], text: `Notas: ${ex.descripcion}`});
  }
  /*------------------------\\ Firmas //------------------------*/
  let firmas = [];
  let roles = [];
  if(cai.periodo_docente_firmas.length !== 0){
    for(ex of cai.periodo_docente_firmas){
      const pathFirma = path.join(__dirname, "../uploads", "firmas", ex.firma.ruta_firma);
      if(fs.existsSync(pathFirma)){
        firmas.push({ margin:[60, 30, 0, 0], width: 90, height:50, image: `${pathFirma}`});
      } else {
        firmas.push({ margin:[10, 50, 10, 0], text: `____________________`});
      }
    }
    for(ex of cai.periodo_docente_firmas){
        roles.push({margin:[65, 5, 0, 0], text: `${ex.rol}`});
    }  
  } else {
    for(ex of [1,2,3]){
        firmas.push({ margin:[10, 50, 10, 0], text: `____________________`});
    }
    roles.push({margin:[65, 5, 0, 0], text: `DOCENTE`});
    roles.push({margin:[65, 5, 0, 0], text: `DIRECTOR`});
    roles.push({margin:[65, 5, 0, 0], text: `DECANO`});
  }
  const docDefinition = {
    pageMargins: [ 40, 50, 40, 30 ],
    pageSize: 'LETTER',
    header: {
        text: "UNIVERSIDAD FRANCISCO DE PAULA SANTANDER \n DISTRIBUCIÓN CARGA ACADÉMICA INTEGRAL",
        bold: true,
        fontSize: 14,
        alignment: "center",
        margin: [0, 11, 0, 0]
    },
    footer:{
      text: `FECHA ${moment(cai.fecha_diligenciamiento).format("DD/MM/YYYY")}`,
      alignment: "center",
    },
    content: [
      {
        columns: [
          { margin: [20,3,0,0], width:300, fontSize: 12, text: `DEPARTAMENTO: ${cai.usuario.departamento.nombre}`},
          { fontSize: 12, text: `SEMESTRE: ${cai.periodo.semestre}`},
        ]
      },
      {
        columns: [
          { fontSize: 12, margin: [20,3,0,0], width:300, text: `PROFESOR: ${cai.usuario.nombre} ${cai.usuario.apellido}`},
          { fontSize: 12, text: `CÓDIGO: ${cai.usuario.codigo}`},
        ]
      },
      { fontSize: 12, margin: [20,3,0,0], text:`DEDICACIÓN: ${cai.dedicacion.toUpperCase()} ` },
      {
        style: 'asignaturas',
        fontSize: 10,
        table: {
          
          body: [
            ['ASIGNATURAS', "PLAN DE ESTUDIOS", "CR", "H.T.", "H.P."],
            ...asignaturas,
            ["", "", "", "Total", `${hmaterias}`]
          ],
        }
      },
      { text: `1. ACTIVIDADES DE DOCENCIA`, style: 'subheader' },
      {
        columns: [
          { style: "docencia", width:400, text: `1.1 Horas lectivas semanales (HL = Total HT + Total HP)`},
          { style: "docencia", text: `${hmaterias}`}
        ]
        
      },
      {
        columns: [
          { style: "docencia", width:400, text: `1.2 Preparación horas lectivas semanales (PHL = 0.75 HL)`},
          { style: "docencia", text: `${(hmaterias*0.75).toFixed(1)}`}
        ]
      },
      {
        columns: [
          { style: "docencia", width:400, text: `1.3 Asesoría académica a estudiantes semanal (AE = 0.3 HL)`},
          { style: "docencia", text: `${(hmaterias*0.3).toFixed(1)}`}
        ]
      },
      {
        columns: [
          { style: "docencia", width:400, text: `1.4 Evaluación a estudiantes semanal (EE = 0.3 HL)`},
          { style: "docencia", text: `${(hmaterias*0.3).toFixed(1)}`}
        ]
      },
      {
        columns: [
          { style: "docencia", width:400, bold: true, text: `SUBTOTAL HORAS DOCENCIA`},
          { style: "docencia", text: `${cai.horas_lectivas_semanales}`}
        ]
      },
      { text: "2. ACTIVIDADES DE INVESTIGACIÓN (Acuerdo 056 de 2012*) (Acuerdo 057 de 2012)**", style: 'subheader' },
      {
        style: 'investigacion',
        table: {
          body: [
            ...investigaciones,
          ],
        },
      },
      { margin: [340, 0, 0, 0], bold: true, text: `SUBTOTAL INVESTIGACIÓN ${cai.horas_investigacion}`},
      { text: "3. ACTIVIDADES DE EXTENSIÓN", style: 'subheader' },
      ...extensiones,
      { margin: [370, 0, 5, 0], bold: true, text: `SUBTOTAL EXTENSIÓN ${cai.horas_extension}` },
      { text: "4. ADMINISTRACIÓN", style: 'subheader' },
      ...administraciones,
      { text: "5. REPRESENTACIONES", style: 'subheader' },
      ...representaciones,
      { margin: [310,0,5,0], bold: true, text: `SUBTOTAL REPRESENTACIÓN ${cai.horas_representacion}` },
      { text: "6. OTRAS ACTIVIDADES", style: 'subheader' },
      ...otras,
      { margin: [350, 0, 0, 0], bold: true, text: `SUBTOTAL ACTIVIDADES ${cai.horas_otras}` },
      { margin: [335, 3, 0, 0], bold: true, text: `TOTAL HORAS SEMANALES ${cai.horas_totales}` },
      { margin: [40,0,0,0], bold: true, text: `OBSERVACIONES: ` },
      observacion,
      ...notas,
      {
        columns:[
          ...firmas
        ],
        columnGap: 80
      },
      {
        columns:[
          ...roles
        ]
      }
    ],
    styles: {
      header: {
        fontSize: 14,
        alignment: 'center',
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 12,
        bold: true,
        margin: [20, 5, 0, 5],
      },
      asignaturas: {
        with: "auto",
        margin: [40, 10, 0, 0],
      },
      docencia: {
        margin: [40, 0, 0, 0],
      },
      investigacion: {
        margin: [30, 5, 20, 5],
        fontSize: 10
      },
    },
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  //pdfDoc.pipe(fs.createWriteStream(__dirname + "../uploads/cais" + cai.usuario.codigo + ".pdf"));
  //pdfDoc.end();
  return new Promise((resolve, reject) => {
    try {
      const chunks = [];
      let writing = fs.createWriteStream("./uploads/cais/" + cai.usuario.codigo + ".pdf");
      pdfDoc.pipe(writing);
      pdfDoc.end();
      //pdfDoc.on('data', (chunk) => chunks.push(chunk));
      //pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      writing.on("finish", function (){
          resolve(cai.usuario.codigo + ".pdf");
      });
      
    } catch (err) {
      reject(err);
    }
  });
};


const errorPdfHtmlTemplate = (error) => `
<h2>There was an error displaying the PDF document.</h2>
Error message: ${error}`;

module.exports = {
  createPdf,
  errorPdfHtmlTemplate
}