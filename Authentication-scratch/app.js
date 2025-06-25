const express=require('express')
const app=express();
const mysql=require("mysql2")
const bcrypt=require("bcrypt")
const session=require('express-session')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('view engine','ejs')
app.set("views","./views")
app.use(session({secret:'thisismysecret'}))
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"4nm21cs007",
    database:"register"
})
db.connect((err)=>{
    if(err)
    {
        console.error(err)
    }else{
        console.log("Sucessfully Connected to database")
    }
})
app.get("/register",(req,res)=>{
    res.render('register')
})
app.post("/register",async(req,res)=>{
    const{name,email,password}=req.body;
    
    
    const hashedPassword= await bcrypt.hash(password,12);
    // console.log(name)
    const sql="insert into user(name,email,password)values(?,?,?)"
    db.query(sql,[name,email,hashedPassword],(err,result)=>{
        if(err)
        {
            console.error(err)
        }else{
            res.send("Registered Sucessfully")
        }

    })

   

})
app.get("/login",(req,res)=>{
   

    res.render("login")
})
app.post("/login",(req,res)=>{
    const{name,password}=req.body;
    req.session.username=name;
    const sql="select *from user where name =?"
    db.query(sql,[name],(err,result)=>{
        if(err)
        {
            console.error(err)
        }else{
            res.send("credential matched you are loggedin")
        }

    })
   
    
})
app.get("/logout",(req,res)=>{
    req.session.username=null;
    res.redirect("/login")
})

app.get("/check",(req,res)=>{
    console.log(req.session.username)
    if(req.session.username)
    {
        res.send("you are Logged in")
    }else{
        res.send("Login first")
    }
})
app.listen(3000,(req,res)=>{
    console.log("site is live")
})