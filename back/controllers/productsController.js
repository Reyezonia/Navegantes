const producto=require("../models/productos")
const fetch =(url)=>import('node-fetch').then(({default:fetch})=>fetch(url));//Usurpacion del require

//Ver lista de productos
exports.getProducts=async (req,res,next) =>{
    const productos= await producto.find();

    res.status(200).json({
        success:true,
        cantidad: productos.length,
        productos
    })
};

//Ver un producto por ID
exports.getProductById= async(req, res, next)=>{
    const product= await producto.findById(req.params.id)
    
    if (!product){
        return res.status(404).json({
            success:false,
            message: "No se encontro el producto"
        })
    }
    res.status(200).json({
        success: true,
        message: "Aqui encuentras informacion sobre tu producto: ",       
        product
    })
}

//Update un producto
exports.updateProduct= async (req, res, next) =>{
    let product = await producto.findById(req.params.id) //Variable de tipo modificable
    if (!product) { //verifico que el objeto no exista para finalizar el proceso y se notifica
        return res.status(404).json({
            success: false,
            message: "No se encontro el producto"
        })
    }
    //Si el objeto si existe, entonces si ejecuto la actualizacion
    product = await producto.findByIdAndUpdate(req.params.id, req.body, {
        new:true, // Valido solo los atributos nuevos o actualizados
        runValidators:true        
    });
    //Respondo si el producto si se actualizo
    res.status(200).json({
        success:true,
        message: "Producto actualizado correctamente",
        product

    })

}

//Eliminar un producto
exports.deleteProduct = async (req, res, next) => {
    const product = await producto.findById(req.params.id) //Variable de tipo modificable
    if (!product) { //verifico que el objeto no exista para finalizar el proceso y se notifica
        return res.status(404).json({ //Si el objeto no existe, return termina el metodo
            success: false,
            message: "No se encontro el producto"
        })
    }

    await product.remove();//Eliminar el proceso
    res.status(200).json ({
        success:true,
        message:"Producto eliminado correctamente",        
    })
}

//Crear nuevo producto /api/productos
exports.newProduct=async(req,res,next) =>{
    const product= await producto.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
}

// OPCION FETCH

//Ver todos los productos
function verProductos(){
    fetch('http://localhost:4000/api/productos')
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
}

//verProductos(); Llamamos al metodo creado para probar la consulta

//Ver por id
function verProductoPorID(id){
    fetch('http://localhost:4000/api/producto/'+id)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

//verProductoPorID('63598f901d63b2ae1b150386'); Probamos el metodo con id







