const express=require("express")
const app=express();
app.use(express.urlencoded({extended:true}))
app.use(express.json)
// app.use((req,res,next)=>{
//     console.log(`Received from${req.url}`)
//     next()
// })

app.get("/",(req,res)=>{
//    res.sendFile(__dirname+"/index.html")
res.send("hii")
})
app.post('/submit',(req,res)=>{
    const {name,usn}=req.body;
    console.log(name)
    console.log(usn)
})
const port =5173;
app.listen(port,()=>{
    console.log(`server is live at ${port}`)
})