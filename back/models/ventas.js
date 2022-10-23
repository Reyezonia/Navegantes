const mongoose=require("mongoose")

const ventasSchema=mongoose.Schema({
    producto:{
        type:String,
        required:[true,"Por favor registra el nombre del producto."],
        trim:true,
        maxLength:[120,"El nombre del producto no debe exceder los 120 caracteres."]
    },
    precio:{
        type: Number,
        required:[true,"Por favor registre el precio del producto."],
        maxLength:[8, "El precio del producto no puede estar por encima de 99'999.999"],
        default: 0.0
    },
    totalVenta:{
        type: Number,
        required:[true,"Por favor registre el precio total de la venta."],
        maxLength:[8, "El total no puede estar por encima de 99'999.999"],
        default: 0.0
    },
    categoria:{
        type:String,
        required:[true,"Por favor seleccione la categoria del producto."],
        enum:{
            values:[
                "Alimento seco",
                "Alimento humedo",
                "Accesorios",
                "Cuidado e Higiene",
                "Medicamentos",
                "Snacks",
                "Juguetes"
            ]
        }
    },
    vendedor:{
        type:String,
        required:[true,"Por favor registre el vendedor de producto"]
    },
    fechaVenta:{
        type:Date,
        default:Date.now
    }
  
})
  
  module.exports=mongoose.model("ventas",ventasSchema)