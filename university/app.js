const express=require("express")
const path=require("path")
const app=express();
const mysql=require("mysql2")
const {body,validationResult}=require("express-validator") 
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
const PORT=3000;
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"4nm21cs007",
    database:"university"
})
db.connect((err)=>{
    if(err)
    {
        console.error(err);

    }else{
        console.log("You are connected to Database")
    }
})
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public")
})
app.post("/students",[body("name").trim().escape().notEmpty().withMessage("name cannot be empty"),
    body("usn").trim().escape().notEmpty().withMessage("usn is compulsary"),
]
    ,(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({ errors: errors.array() });
        }
    const{name,usn,batch}=req.body;
    const sql="insert into students(usn,name,batch) values(?,?,?)"
    db.query(sql,[usn,name,batch],(err,result)=>{
        if(err)
        {
            console.log(err);
        }else{
            console.log("Inserted sucesssfully")
        }
    })
    db.query("select *from students ",(err,result)=>{
        if(err)
        {
            console.error(err)
        }else{
            res.json(result)
        }

    })
    


})
app.get("/data",(req,res)=>{
    db.query("select * from students",(err,result)=>{
        console.log(result)
        res.render("detail",{students:result})
    })
})
app.get("/edit",(req,res)=>{
    res.sendFile(__dirname+"/public/edit.html")
})
app.post("/edit",(req,res)=>{
    const {name,usn,batch}=req.body
    const sql="update students set name=?,usn=?,batch =? where usn=?"
    db.query(sql,[name,usn,batch,usn],(err,result)=>{
        if(err)
        {
            console.error(err)
        }else{
            res.json(result)
        }
    })
})
app.get("/delete",(req,res)=>{
    res.sendFile(__dirname+"/public/delete.html")
})
app.post("/delete",(req,res)=>{
    const{usn}=req.body
    const sql="delete from students where usn=?"
    db.query(sql,[usn],(err,result)=>{
        
        if(err)
            {
                console.err(err)
    
            }else{
                res.send("Sucess fully deleted")
            }

    })
    
})
app.listen(PORT,()=>{
    console.log("site is live ")
})