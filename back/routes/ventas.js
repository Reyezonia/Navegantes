const express = require("express")
//importar
const router = express.Router();
//se crea un enrutador
const{getVentas} = require("../controllers/ventasControllers")
//listar ventas servicio

router.route('/ventas').get(getVentas)
//se traza ruta para ver la lista de ventas
module.exports = router;
//mostrar o exportar

