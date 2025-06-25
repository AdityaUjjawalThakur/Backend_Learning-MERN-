const express=require("express")
const app=express()
const session=require("express-session")
const passport=require("passport")
const bcrypt=require("bcryptjs")
const LocalStrategy=require("passport-local").Strategy;
const mysql=require("mysql2")

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(session({secret:"thisismysecreat"}))
app.use(passport.initialize())
app.use(passport.session());
app.set('view engine','ejs')
app.set("views","./views")

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"4nm21cs007",
    database:"auth_db"
})
db.connect((err)=>{
    if(err)
    {
        console.error(err)
    }else{
        console.log("Database Connected Sucessfully")
    }
})
passport.use(new LocalStrategy({usernameField:"name",passwordField:"password"},(username, password, done) => {
    const sql = "SELECT * FROM users WHERE username=?";
    db.query(sql, [username], (err, result) => {
        if (err) return done(err); // Database error

        const user = result[0];
        if (!user) return done(null, false, { message: "User not found" }); // User does not exist

        // Compare password only if user exists
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return done(err);
            if (!isMatch) return done(null, false, { message: "Incorrect password" });

            return done(null, user); // ✅ Success!
        });
    });
}));

passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((id, done) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
        if (err) return done(err);
        done(null, results[0]);
    });
});

app.get("/register",(req,res)=>{
    res.render("register")
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.get("/dashboard",(req,res)=>{
    res.json(req.user)
})

app.post("/register", async (req, res) => {
    const { name, password } = req.body;
    console.log(name)
    console.log(password)

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query("INSERT INTO users (username, password) VALUES (?, ?)", [name, hashedPassword], (err, result) => {
        if (err) console.error(err);
        res.send("User registered successfully!");
    });
});
app.post("/login", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login-failed"
}));


app.listen(3000,()=>{
    console.log("site is live at 3000")
})