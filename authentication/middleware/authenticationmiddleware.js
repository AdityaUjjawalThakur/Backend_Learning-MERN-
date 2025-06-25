const jwt = require("jsonwebtoken");
SECRET_KEY="2868f8834cfba99025135cb2cd8dd86513a8c8c08db791f2e1cbb97bccd3b8a9" 
const authMiddleware=(req,res,next)=>{
    const token = req.cookies.token;
    console.log("Received Token:", token);

    if (!token) {
        return res.status(403).send("Access Denied: No Token Found");
    }

    try {
        
        const verified = jwt.verify(token, SECRET_KEY); 
        console.log("Token Verified:", verified);
        req.user = verified;

        
        next()
    } catch (error) {
        console.error("Token Verification Failed:", error);
        return res.status(403).send("Access Denied: Invalid Token");
    }
    

}

module.exports = authMiddleware;
