const express = require("express");
const app = express();

app.use(express.json());


//Importar rutas
const productos=require("./routes/products")

app.use('/api',productos) //Sujeto a decision (ruta del navegador)


module.exports=app

/**aqui se registra lo que ya esta listo*/
const ventas = require('./routes/ventas')
app.use('/api', ventas)
//modelo-controlador-apps 
/**ruta de navegador app.use('/api',index) home */

//Importar rutas
const productos=require("./routes/products")

app.use('/api', productos) // Sugeto a decision (ruta del navegador)

module.exports = app
