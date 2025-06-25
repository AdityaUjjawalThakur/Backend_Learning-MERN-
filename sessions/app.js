//issue with cookies is that first of all it has size limit and it is client side 
//session is server side and do not have size limmit it server return session id in form of cookie 
//which is sent with every request to server 
const express=require("express")
const app=express();
const session=require("express-session")
app.use(session({secret:"thisismysecreat"}))
app.get("/home",(req,res)=>{
    // req.session.user={name:"aditya",usn:"4nm21cs007"}
    // console.log(req.session.user)
    //session is create when req.session is modified for first time 
    //sever send session id to browswe and browser send sessiion id with
    //every request to server and then server fetch data
    // Session is not created immediately when app.use(session({...})) is called.
//  Session is created when req.session is modified for the first time.
//  The browser stores the session ID in a cookie, and the server stores session data.
//  If a session exists, it is automatically used across different routes.
//  If you restart the server, the session is lost (unless using a session store like MySQL or Redis).
console.log(req.sessionID)    
if(req.session.count)
    {
        req.session.count+=1;
    }else{
        req.session.count=1;

    }
   
    res.send(`you have visited this site ${req.session.count} times`)
})
app.get("/cart",(req,res)=>{
    console.log(req.sessionID)//with every reqest sessionid is sent to server
    
    if(req.session.count)
        {
            req.session.count+=1;//using that session id data is retruved by server
        }else{
            req.session.count=1;
    
        }
    res.send(`you have visited this site ${req.session.count} times`)
})
app.listen(3000,()=>{
    console.log("site is live")
})