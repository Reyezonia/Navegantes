const mongoose=require("mongoose")

const productosSchema=mongoose.Schema({
    nombre:{
        type:String,
        require:[true,"Por favor registra el nombre del producto."],
        trim:true,
        maxLength:[120,"El nombre del producto no debe exceder los 120 caracteres."]
    },
    precio:{
        type: Number,
        require: [true,"Por favor registre el precio del producto."],
        maxLength:[8, "El precio del producto no puede estar por encima de 99'999.999"],
        default: 0.0
    },
    descripción:{
        type:String,
        require:[true,"Por favor registre una descripcion para el producto."]
    },
    calificacion:{
        type: Number,
        default:0
    },
    imagen:[
        {
            public_id:{
                type:String,
                require:true,
            },
            url:{
                type:String,
                require:true
            }
        }
    ],
    categoria:{
        type: String,
        require:[true,"Por favor seleccione la categoria del producto."],
        enum:{
            values:[
                "Hombre",
                "Mujer",
                "Niños",
                "Calzado",
                "Mochilas",
                "Accesorios",
                "Suplementos Alimenticios"

            ]
        }
    },
    vendedor:{
        type: String,
        require:[true,"Por favor registre el vendedor de producto"]
    },
    inventario:{
        type: Number,
        require:[true, "Por favor registre el stock del producto"],
        maxLength:[5,"Cantidad maxima del producto no puede sobrepasar 99999"],
        default:0
    },
    numCalificación:{
        type: Number,
        default:0
    },
    opiniones:[
        {
            nombreCliente:{
                type:String,
                require:true,

            },
            rating:{
                type:Number,
                require:true
            },

        }
    ],
    fechaCreacion:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("productos",productosSchema)