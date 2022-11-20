const nodemailer = require("nodemailer");

const enviarCorreo = (correo) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAILCORREO,
            pass: process.env.MAILCONTRASENNA
        }
    });

    const mail_options = {
        from: "Administracion CAI",
        to: correo,
        subject: `Registro ADCAI`,
        text: `Por favor complete su registro ingresando al siguiente link: ${process.env.FRONTURL}`
    };

    transporter.sendMail(mail_options, (error, info) => {
        if(error){
            console.log(error);
        } else {
            console.log("Correo enviado existosamente" + info.response);
        }
    });
};

module.exports = enviarCorreo;