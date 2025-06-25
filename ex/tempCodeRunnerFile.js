function custommiddleware((req,res,next)=>{
    console.log(`request is made from route${req.url}`)
    next();
    
})