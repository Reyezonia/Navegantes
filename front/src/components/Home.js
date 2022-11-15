import React, { Fragment, useEffect } from 'react'

export const Home = () => {
    return (
        <Fragment>
             <h1 id='encabezado_productos'>Ultimos Productos</h1>
             
            <section id='Productos' className='container mt-5'>
                <div className='row'>
                    {/* Producto 1 */}
                    <div className='col-sm-12 col-md-6 col-lg-3 my-3'>
                        <div className='card p-3 rounded'>
                            <img className='card-img-top mx-auto' src='./images/ropa1.jpg' alt='ropa1'></img>
                            <div className='card-body d-flex flex-column'>
                                <h5 id='titulo producto'><a href='http://localhost:3000'>Ropa deportiva 1</a></h5>
                                <div className='rating mt-auto'>
                                    <div className='rating-outer'>
                                        <div className='rating-inner'></div>
                                    </div>
                                    <span id='No_de_opiniones'> 5 Reviews</span>
                                </div>
                                <p className='card-text'>$72.000</p><a href='http://localhost:3000' id='view_btn' className='btn btn-block'>
                                    Ver detalle
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Producto 2 */}
                    <div className='col-sm-12 col-md-6 col-lg-3 my-3'>
                        <div className='card p-3 rounded'>
                            <img className='card-img-top mx-auto' src='./images/ropa2.jpg' alt='ropa2'></img>
                            <div className='card-body d-flex flex-column'>
                                <h5 id='titulo producto'><a href='http://localhost:3000'>Ropa deportiva 2</a></h5>
                                <div className='rating mt-auto'>
                                    <div className='rating-outer'>
                                        <div className='rating-inner'></div>
                                    </div>
                                    <span id='No_de_opiniones'> 2 Reviews</span>
                                </div>
                                <p className='card-text'>$82.000</p><a href='http://localhost:3000' id='view_btn' className='btn btn-block'>
                                    Ver detalle
                                        </a>
                                    </div>
                                </div>
                            </div>

                    {/* Producto 3 */}
                    <div className='col-sm-12 col-md-6 col-lg-3 my-3'>
                        <div className='card p-3 rounded'>
                            <img className='card-img-top mx-auto' src='./images/ropa3.jpg' alt='ropa2'></img>
                            <div className='card-body d-flex flex-column'>
                                <h5 id='titulo producto'><a href='http://localhost:3000'>Ropa deportiva 3</a></h5>
                                <div className='rating mt-auto'>
                                    <div className='rating-outer'>
                                        <div className='rating-inner'></div>
                                    </div>
                                    <span id='No_de_opiniones'> 12 Reviews</span>
                                </div>
                                <p className='card-text'>$42.000</p><a href='http://localhost:3000' id='view_btn' className='btn btn-block'>
                                    Ver detalle
                                </a>
                            </div>
                        </div>
                    </div>


                    {/* Producto 4 */}
                    <div className='col-sm-12 col-md-6 col-lg-3 my-3'>
                        <div className='card p-3 rounded'>
                            <img className='card-img-top mx-auto' src='./images/ropa4.jpg' alt='ropa4'></img>
                            <div className='card-body d-flex flex-column'>
                                <h5 id='titulo producto'><a href='http://localhost:3000'>Ropa deportiva 4</a></h5>
                                <div className='rating mt-auto'>
                                    <div className='rating-outer'>
                                        <div className='rating-inner'></div>
                                    </div>
                                    <span id='No_de_opiniones'> 72 Reviews</span>
                                </div>
                                <p className='card-text'>$80.000</p><a href='http://localhost:3000' id='view_btn' className='btn btn-block'>
                                    Ver detalle
                                </a>
                            </div>
                        </div>
                    </div>


                        </div>
                    </section>

                    </Fragment>
                )
    }
                export default Home




    // const { loading, products, error} = useSelector(state => state.products)
    // const alert= useAlert();


    // const dispatch = useDispatch();
    // useEffect(()=>{
    //     if(error){
    //         return alert.error(error)
    //     }

    //     dispatch(getProducts());
    // }, [dispatch])

//   return (
//     <Fragment>
//         {/* {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>:(
//             <Fragment>
//                 <MetaData title='Lo mejor para tu salud'></MetaData> */}
//         <h1 id='encabezado_productos'>Ultimos Productos</h1>


//         <section id='productos' className='container mt-5'>
//             <div className='row'>
//                 {/*Producto 1*/}
//                 <div className ='col-sm-12 col-md-6 col-lg-3 my-3'>
//                 <div className='card p-3 rounded'>
//                 <img className='card-img-top mx-auto' src='./images/ropa1.jpg</img>'
//                     <div className='card-body d-flex flex-column'>
//                         <h5 id="titulo_producto"><a href
                        
                        
                        
                        
                        
                        
                        
//                     </div>


                
//                 {// {products && products.map(producto =>( 
//                     //<div key={producto._id} className='col-sm-12 col-md-6 col-lg-3 my-3'>
//                     //<div className='card p-3 rounded'>
//                     //<img className='card-img-top mx-auto' src={producto.imagen[0].url} alt={producto.imagen[0].public_id}></img>
//                     {/* <img className='card-img-top mx-auto' src={producto.imagen[0].public_id}></img> */}
//                     //<div className='card-body d-flex flex-column'>
//                     //<h5 id="titulo_producto"><Link to={`/producto/${producto._id}`}>{producto.nombre}</Link></h5>    
//                     //<div className='rating mt-auto'>
//                       //  <div className='rating-outer'>
//                         //    {/* Estrellistas para el front */}
//                           //  <div className='rating-inner' style={{ width: `${(producto.calificacion / 5) * 100}%` }}></div> 
//                         //</div>
//                         //<span id="No_de_opiniones"> {producto.numCalificaciones} Reviews</span>
//                      //</div> 
//                      //<p className='card-text'>${producto.precio}</p><Link to={`/producto/${producto._id}`} id="view_btn" className='btn btn-block'>
//                        // Ver detalle 
//                         //</Link>
//                      //</div> 
//                  //</div> 
//              //</div> ))} }
               
//         //</div> 
//         </section>

//             </Fragment>
//         )}
        
//  </Fragment>
//   )
// }
// export default Home
