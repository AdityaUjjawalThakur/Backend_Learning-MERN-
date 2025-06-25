const express=require("express")
const app=express();
const cookieParser = require("cookie-parser");
app.use(cookieParser("thisismysecreatkey"))//for signed cookie put secret
//cookies is basically we can store data on our browser which can be sent to sever with every 
//request in express we need to setup cookie parser and then we have access to cookie 
//req.cookies we can have signed cookikes which is basically to chec it cookie has been
//tanpered 
app.get("/",(req,res)=>{
    const name=req.cookies.user;
    res.send(`Welcome ${name}`)
})
app.get("/set",(req,res)=>{
    res.cookie("user","Aditya Thakur",{signed:true})
    res.send("hii")
})
app.get("/dashboard",(req,res)=>{
    const cookie=req.cookies.user;

    console.log(cookie)
    res.send(req.signedCookies)
    

})
app.listen(3000,()=>{
    console.log("site is live")
})