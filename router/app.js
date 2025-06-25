const express=require("express")
const app=express()
const dotenv=require("dotenv")
const dogrouters=require("./routes/dogs")
const catrouter=require("./routes/cats")
dotenv.config()
const {body,validationResult}=require("express-validator")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/",dogrouters)
app.use("/",catrouter)

const port=process.env.PORT;
console.log(port)
app.listen(port,()=>{
    console.log(`site is live at ${port}`)
})

