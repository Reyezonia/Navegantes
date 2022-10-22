const express=require("express");
const app = express();

app.use(express.json());

//importar rutas
const productos=require("./routes/products")

app.use('/api',productos) //debatir donde va la lista de productos

module.exports = app

//aqui se registra lo que ya esta listo
const productos=require("./routes/ventas")
//modelo-controlador-apps 
//ruta de navegador app.use('/api',index) home 
