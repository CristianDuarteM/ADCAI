# Título del proyecto: ADCAI (Administración de cargas academicas integrales)

#### ADCAI
***
## Índice
1. [Características](#características)
2. [Contenido del proyecto](#contenido-del-proyecto)
3. [Tecnologías](#tecnologías)
4. [IDE](#ide)
5. [Instalación](#instalación)
6. [Google cliente id y secret id](#google-cliente-id-y-secret-id)
7. [Ejecutar los contenedores](#ejecutar-los-contenedores)
8. [Contenedores e imagenes](#contenedores-e-imagenes)
9. [Autor(es)](#autores)
10. [Institución Académica](#institución-académica)
***


#### Características

  - Desarrollado con Node Js (Exress)
  - Orm (Sequelize)
  - Proyecto con generacion de archivos pdf
  - Angular
***
  #### Contenido del proyecto

| Archivo      | Descripción  |
|--------------|--------------|
| [Backend](https://github.com/CristianDuarteM/ADCAI/tree/develop) | Desarrollo del backend de la aplicacion |
| [Fronend](https://github.com/CristianDuarteM/ADCAI/tree/develop/FrontEnd) | Desarrollo de frontend de la aplicacion|

  
***
#### Tecnologías

  - Html5
  - CSS
  - JavaScript
  - Node js
  - Angular
  
  
  ***
#### IDE

- El proyecto se desarrolla usando Visual Studio Code, es un editor de texto para código en diferentes lenguajes.

  ***
#### Requisitos
- Docker CE
- Docker Compose 

***
### Instalación
- Descargar o clonar el repositorio
- Se debe crear un archivo .env que posea las siguientes variables de entorno: 
  ```
  PORT: Puerto que se utilizara para exponer el backend (ej. 8080)

  -----DB-----
  NOMBRE: Nombre de la base de datos que se va a utilizar
  USUARIO: Usuario de la base de datos
  CONTRASENNA=: Contraseña del usuario de la base de datos
  HOST: Direccion ip o punto de enlace para conectarse a la base de datos

  ----Correo----
  MAILCORREO: Direccion de correo electronico que se va a usar para enviar los correos desde la aplicacion.
  MAILCONTRASENNA: Contraseña del correo electronico

  ----Front----
  FRONTURL=Direccion url del frontend. (Los correos que envia la apliacacion a los usuarios, llevan anexados la url donde se encuentra la aplicación)

  ----jwt----
  SECRETORPRIVATEKEY: Token secreto para jwt (ejemplo. Tok3nF4ls0)

  ----Google----
  *GOOGLE_CLIENT_ID: Cliente id de google
  *GOOGLE_SECRET_ID: Id secreto del cliente
  ```
  
***  
### Google cliente id y secret id
- Se ingresa al siguiente enlace: https://console.cloud.google.com/apis/credentials/consent?project=balmy-platform-341416
- Se se selecciona el tipo interno o externo. Guardar y continuar.
- Se agrega la informacion de la aplicación. Guardar y continuar.
- Se configuran los tipos de permisos. Guardar y continuar.
- Se agrega la informacion de la aplicación. Guardar y continuar.
- Se añaden usuarios de prueba si se van a usar. Guardar y continuar.
- Se agrega la informacion de la aplicación. Guardar y continuar.

#### Se crean las credenciales
- Se dirige al siguiente enlace: https://console.cloud.google.com/apis/credentials?project=balmy-platform-341416
- Crear credenciales -> ID de cliente de OAuth -> Aplicación web
- Se da un nombre de cliente
- Se agregan: Orígenes autorizados de JavaScript (en este caso se refiere a la url donde nuestra aplicacion va a ser encontrada ejemplo: https://www.adcai.com)
- Crear. y nos procede a mostrar una pantalla de Se creó el cliente de OAuth en donde se nos muestra el id de cliente (GOOGLE_CLIENT_ID) y el id secreto (GOOGLE_SECRET_ID)

  ***  
### Ejecutar los contenedores

Para levantar todos los contenedores se debe ejecutar el siguiente comando:

```
docker compose up -d
```

  ***
### Contenedores e imagenes

El proyecto ADCAI cuenta con los siguientes repositorios e imagenes docker:

| Contenedor               | Imagen base  |
| ------------------------ | ------------ |
| adcai-backend            | backend      |
| adcai-frontend           | frontend     |
| adcai-bd                 | mysql:80.0.29|



***
### Autor(es)
Proyecto desarrollado por [Karen Beltran] (<karenbrigidbv@ufps.edu.co>) y [Cristian Duarte] (<cristianandresdm@ufps.edu.co>).


***
### Institución Académica   
Proyecto desarrollado en el curso de profundizacion de deasarrollo de software del  [Programa de Ingeniería de Sistemas] de la [Universidad Francisco de Paula Santander]


   [Programa de Ingeniería de Sistemas]:<https://ingsistemas.cloud.ufps.edu.co/>
   [Universidad Francisco de Paula Santander]:<https://ww2.ufps.edu.co/>
   
   ***
