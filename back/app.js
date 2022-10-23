const express = require("express");
const app = express();

app.use(express.json());

<<<<<<< HEAD
//Importar rutas
const productos=require("./routes/products")
=======
//importar rutas
const productos= require("./routes/products")
>>>>>>> 62f8723f9483d56f28e2b3cc054e8289f45af67b

app.use('/api',productos) //Sujeto a decision (ruta del navegador)

<<<<<<< HEAD
module.exports=app
=======
/**aqui se registra lo que ya esta listo*/
const ventas = require('./routes/ventas')
app.use('/api', ventas)
//modelo-controlador-apps 
/**ruta de navegador app.use('/api',index) home */
module.exports = app
>>>>>>> 62f8723f9483d56f28e2b3cc054e8289f45af67b
