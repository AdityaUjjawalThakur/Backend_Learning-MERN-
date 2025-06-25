const express=require("express");
const app=express();
const mysql = require("mysql2");
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const port =3000;
const db=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"4nm21cs007",
  database:"express_demo",
});
db.connect((err)=>{
  if(err)
  {
    console.log(err)
  }else{
    console.log(" Database connected sucessfully")
  }
})
app.get("/",(req,res)=>{
  const sql="SELECT *from users "
  
  db.query(sql,(err,results)=>{
    if(err)
    {
      console.error(err)
    }else{
      res.json(results)

      console.log(results)
    }
  })
  
})
app.get("/register",(req,res)=>{
  res.sendFile(__dirname+"/form.html")
})
app.post("/users",(req,res)=>{
  const {name,email}=req.body
  const sql="insert into users(name,email)values(?,?)"
  db.query(sql,[name,email],(err,result)=>{
    if(err)
    {
      console.error(err);
    }else{
      res.send(`data :${name,email} has been inserted sucessfully`)
    }
  })
  
})

app.listen(port,()=>{
  console.log(`site is live at ${port}`)
})