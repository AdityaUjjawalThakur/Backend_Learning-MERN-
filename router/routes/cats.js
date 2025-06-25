const express=require("express")
const router=express.Router()
router.get("/",(req,res)=>{
    res.send("from cat homepage")
})
router.get("/meow",(req,res)=>{
    res.send("Cats Meow")
})
module.exports=router;
