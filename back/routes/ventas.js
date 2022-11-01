const express = require('express')
//importar
const router = express.Router();
//se crea un enrutador
//const{getVenta} = require('../controllers/ventasControllers')
const {getVenta, newVenta, getProductById, updateVenta, deleteventa} = require("../controllers/ventasController") 
//Traemos la respuesta json desde el controlador
//listar ventas servicio y demas


router.route("/ventas").get(getVentas)
//se traza ruta para ver la lista de ventas
module.exports = router;
//mostrar o exportar

router.route('/ventas').get(getVenta)//se traza ruta para ver la lista de ventas
router.route('/venta/nuevo').post(newVenta);//ruta para crear
router.route('/venta/:id').get(getProductById);//ruta para buscar
router.route('/venta/:id').put(updateVenta);//rurta para actualizar
router.route('/venta/:id').delete(deleteventa);//ruta para eliminar

module.exports = router; //mostrar o exportar

