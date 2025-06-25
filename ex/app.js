const express=require("express")
const app=express();
const port=3000;
///this discuss middleware which is nothing but a functiion that has three object req,res,next it runs for all the routes if
///path is not defined if path is defined it will run for all routes starts with that route
app.use(express.urlencoded({extended:true}));//parse data from url dent by forms 
app.use(express.json());//parse data sent by website in jsom format
app.use(express.static("public"));//serves static files from public folde
//custom middleware
function custommiddleware(req,res,next){
    res.send(`request is made from route${req.url}`)
    next();
    
}
 
app.use(custommiddleware);

app.get("/",(req,res)=>{
    res.send("hii")
})
app.get("/submit",(req,res)=>{
    res.send("frmo submit")
})
app.get("/submit/form",(req,res)=>{
    res.send("from submit/form")
})
app.use((req, res) => {
    res.status(404).send("Page not found");
});
app.listen(port,()=>{
    console.log(`site is live at ${port}`)
})