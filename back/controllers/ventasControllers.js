exports.getProducts=(req,res,next) =>{
    //pedir, responder y accionar
    res.status(200).json({
        //consulta usando el estado res
        sucess:true,
        message:"En esta ruta ud va a poder ver todos las ventas"
    })
}