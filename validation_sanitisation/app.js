const express=require("express")
const app=express();
const {body,validationResult}=require("express-validator")
const mysql=require("mysql2")
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))
const port=3000;
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"4nm21cs007",
    database:"registration"

})
db.connect((err)=>{
    if(err)
    {
        console.error(err)
    }else{
        console.log("Database is Connected")
    }
})
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/register.html")
})
app.post("/register",[body("name").trim().escape().notEmpty().withMessage("Name is Mandotary"),
    body("email").isEmail().withMessage("Enter a valid Email").normalizeEmail(),
    body("usn").trim().escape().notEmpty().withMessage("Mandatory")
],(req,res)=>{
    const errors=validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const{name,usn,email}=req.body;
    const sql="insert into user(name,usn,email)values(?,?,?)"
    db.query(sql,[name,usn,email],(err,result)=>{
        if(err)
        {
            console.error(err)
        }else{
            res.json(result)
        }
    })
    
    
})
app.get("/getuser",(req,res)=>{
    const sql="select *from user"
    db.query(sql,(err,result)=>{
        if(err)
        {
            console.error(err);
        }else{
            res.json(result)
        }
    })
})
app.listen(port,()=>{
    console.log(`Site Is Live At ${port} `)
})