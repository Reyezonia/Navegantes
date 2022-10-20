const express=require("express")
const router=express.Router();

const{getProducts} = require("../controllers/productsControllers")

router.route('/productos').get(getProducts) //establecemos desde la ruta queremos ver el get products

module.exports=router;

