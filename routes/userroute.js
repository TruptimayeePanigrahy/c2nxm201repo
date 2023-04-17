const express=require("express")
const userroute=express.Router()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {usermodel}=require("../models/usermodel")
const {blackmodel}=require("../models/blcaklist")
const {middleware}=require("../middleware/middleware")
require("dotenv").config()


userroute.post("/signup",async(req,res)=>{
const {name,email,password,role}=req.body
let user=await usermodel.findOne({email})
if(user){
    return res.status(400).send({msg:"user is already present,please login"})
}

const hashpassword=bcrypt.hashSync(password,8)
const newuser=new usermodel({name,email,password:hashpassword,role})
await newuser.save()
res.status(200).send({msg:"user created successfully!!"})

})
userroute.post("/login",async(req,res)=>{
    const {email,password}=req.body
     const userdata=await usermodel.findOne({email})

     if(!userdata){
        return res.status(400).send({msg:"user not found ,please sign up"})
     }

     const comparepass=bcrypt.compare(password,userdata.password)
     if(!comparepass){
        return res.status(400).send({msg:"Wrong password"})
     }
     let token=jwt.sign({id:userdata._id,role:userdata.role},process.env.secrete,{expiresIn:"1m"})
     let refreshtoken=jwt.sign({id:userdata._id,role:userdata.role},process.env.refreshsecrete,{expiresIn:"3m"})
     res.cookie("token",token,{maxAge:20000*60})
     res.cookie("refreshtoken",refreshtoken,{maxAge:20000*60*5})
     res.status(200).send({msg:"Login successfull!!"})


})
userroute.get("/logout",async(req,res)=>{
    try {
        let {token,refreshtoken}=req.cookies
    let blacktoken=new blackmodel({token})
    let blackrefreshtoken=new blackmodel({refreshtoken})
    await blacktoken.save()
    await blackrefreshtoken.save()
    res.status(200).send({msg:"logout successfully!!"})
    } catch (error) {
        console.log(error)
    }

})
userroute.get("/refresh",async(req,res)=>{
    
try {
    let {refreshtoken}=req.cookies
    let blcaklist=await blackmodel.findOne({refreshtoken})
    if(blcaklist){
        return res.status(400).send({msg:"token is on blacklist"})
    }
    let decoded=jwt.verify(refreshtoken,process.env.refreshsecrete)
    if(!decoded){
        return res.status(400).send({msg:"refreshtoken is invalid"})

    }
    let {id,role}=decoded
    let token=jwt.sign({id,role},process.env.secrete,{expiresIn:"1m"})
    res.cookie("token",token,{maxAge:20000*60})
    res.status(200).send({msg:"token is refreshed"})
} catch (error) {
    console.log(error)
}
})



userroute.get("/get",middleware,(req,res)=>{
    res.send("get data")
})















module.exports={userroute}