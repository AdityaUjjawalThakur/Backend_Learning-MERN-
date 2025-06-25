const express=require("express")
const dotnev=require("dotenv")
const bcrypt=require("bcrypt")
const cookie=require("cookie")
const cors=require("cors")
const jwt=require("jsonwebtoken")
const {body,validationResult}=require("express-validator")
const bodyparser=require("body-parser")
const app=express();
const mysql=require("mysql2")
const cookieParser = require("cookie-parser");
app.use(cookieParser())
const authenticationtoken=require("./middleware/authenticationmiddleware")
dotnev.config();
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(bodyparser.json())
app.set("view engine","ejs")
app.set("views","./views")
const SECRET_KEY=process.env.SECRET_KEY;
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
        console.log(`sucessfully connected to database`)
    }
})

//encrypting passwords
// async function encryption(password)
// {
//     const hashedPassword=await bcrypt.hash(password,10);
//     console.log(`plain password is ${password}`)
//     console.log(`hashed password ${hashedPassword}`)
//     if(bcrypt.compare(password,hashedPassword))
//     {
//         console.log("correct match")
//     }else{
//         console.log("bhak bosdik")
//     }

// }
// encryption("aditya123")

app.get("/register",(req,res)=>{
    res.render("register")

})
app.post("/register",[body("name").trim().notEmpty().withMessage("Name can not be empty"),
    body("email").notEmpty().normalizeEmail().withMessage("Invalid Email Format"),
    body("password").notEmpty().withMessage("password Can Not Be Empty")
],async(req,res)=>{
    const validationerror=validationResult(req)
    if(!validationerror.isEmpty())
    {
        return res.json(validationerror)
    }
    console.error(validationerror)
    const {name,email,password}=req.body;
    console.log(`${name} ${email} ${password}`)
    const hashedPassword= await bcrypt.hash(password,10);//10 is salt value
    const sql="insert into user(name,email,password)values(?,?,?)"
    db.query(sql,[name,email,hashedPassword],(err,result)=>{
        if(err)
        {
            console.error(err);
            
        }else{
            res.send("Sucessfully Registered")
        }

    })


})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/login", async (req, res) => {
    const { name, password } = req.body;

    const sql = "SELECT * FROM user WHERE name = ?";
    
    db.query(sql, [name], async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect credentials" });
        }

        const token = jwt.sign({ username: name }, SECRET_KEY, { expiresIn: "1h" });

        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        res.send("sucess")
    });
});


app.get("/login/dashboard",authenticationtoken, (req, res) => {
    res.send(`Welcome ${req.user.username}`);
    
});
app.get("/secret",authenticationtoken,(req,res)=>{
    res.send(`you ${req.user.username}  will receive a letter`)
})

app.listen(process.env.PORT,()=>{
    console.log(`Server Is Live At ${process.env.PORT}`)
})

