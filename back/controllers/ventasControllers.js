const venta = require("../models/venta")
const fetch =(url)=>import('node-fetch').then(({default:fetch})=>fetch(url)); //Usurpación del require

//Ver la lista de ventas
exports.getVenta = async (req, res, next) =>{
       //pedir, responder y accionar
    const ventas = await venta.find();
    if (!ventas){
        return res.status(404).json({
            success:false,
            error:true
        })
    }

    res.status(200).json({
        success:true,
        cantidad: ventas.length,
        ventas
    })
}

//Venta por ID
exports.getVentaById= async (req, res, next)=>{
    const venta= await venta.findById(req.params.id)
    
    if (!venta){
            return res.status(404).json({
            success:false,
            message: 'No encontramos la venta',
            error:true
        })
    }
    res.status(200).json({
        success:true,
        message:"Aqui debajo encuentras información sobre la venta: ",
        venta
    })
}

//Update
exports.updateVenta = async (req,res,next) =>{
    let venta = await venta.findById(req.params.id) //Variable de tipo modificable
    if (!venta){ //Verifico que el objeto no existe para finalizar el proceso
            return res.status(404).json({
            success:false,
            message: 'No encontramos esa venta'
        })
    }
    //Si el objeto si existia, entonces si ejecuto la actualización
    venta = await venta.findByIdAndUpdate(req.params.id, req.body, {
        new:true, //Valido solo los atributos nuevos o actualizados
        runValidators:true
    });
    //Respondo Ok si se actualiza
    res.status(200).json({
        success:true,
        message:"Venta actualizada correctamente",
        venta
    })
}


//Eliminar
exports.deleteventa= async (req,res,next) =>{
    const venta = await venta.findById(req.params.id) //Variable de tipo modificable
    if (!venta){ //Verifico que el objeto no existe para finalizar el proceso
            return res.status(404).json({ //Si el objeto no existe, return termina el metodo
            success:false,
            message: 'No encontramos la venta'
        })
    }

    await venta.remove();//Eliminamos el proceso
    res.status(200).json({
        success:true,
        message:"Venta eliminada correctamente"
    })
}

//Crear nueva venta /api/venta
exports.newVenta = async(req,res,next)=>{
    const venta = await venta.create(req.body);

    res.status(201).json({
        success:true,
        venta
    })
}


//FETCH
//Ver todos las ventas
function verVentas(){
    fetch('http://localhost:4000/api/ventas')
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
}

//verVentas(); LLamamos al metodo para probar la consulta

//Ver por id
function verVentaPorID(id){
    fetch('http://localhost:4000/api/venta/'+id)
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
}

//verventaPorID('63456a8d9163cb9dbbcaa235'); Probamos el metodo con un id