require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"4nm21cs007",
    database:"auth_db"
})

db.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.message);
    } else {
        console.log("Connected to MySQL database");
    }
});

const SECRET_KEY = "thisismysecreatkey"; // Change this to a strong secret

// User signup
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "All fields are required" });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], (err) => {
            if (err) return res.status(500).json({ message: "User already exists" });
            res.json({ message: "User registered successfully" });
        });
    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
});

// User login
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "All fields are required" });

    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ message: "Invalid credentials" });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    });
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(403).json({ message: "Token required" });

    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" });
        req.userId = decoded.id;
        next();
    });
};


// Protected route
app.get("/dashboard", verifyToken, (req, res) => {
    res.json({ message: "Welcome to your dashboard", userId: req.userId });
});

app.listen(3000, () => console.log("Server running on port 3000"));
