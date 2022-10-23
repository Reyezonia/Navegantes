const app = require ("./app")
//recibe cons del importable
const connectDatabase = require("./config/database");

//Setear el archivo de conffiguración
const dotenv = require("dotenv");
//archivo de config principal
dotenv.config({path: 'back/config/config.env'})

//Configurar base de datos
connectDatabase();

//llamamos a server
//respuesta del servidor o escuchar al servidor
const server = app.listen(process.env.PORT, () =>{
    console.log(`Servidor iniciando en el puerto: ${process.env.PORT} en modo:${process.env.NODE_ENV}`)
})
//se declara y se trata el resultado