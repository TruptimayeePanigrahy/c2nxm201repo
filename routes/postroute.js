const express=require("express")
const postroute=express.Router()


const {auth}=require("../middleware/auth")
const {middleware}=require("../middleware/middleware")
const { postmodel } = require("../models/postmodel")

postroute.get("/getdata",middleware,async(req,res)=>{
    try {
        let data=await postmodel.find()
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})
postroute.post("/post",middleware,async(req,res)=>{
    try {
        let data=req.body
        data.userid=req.id
        let newdata=new postmodel(data)
        await newdata.save()
        res.status(200).send("post added")
    } catch (error) {
        console.log(error)
    }
})
postroute.put("/update/:id",middleware,async(req,res)=>{
    try {
        let data=req.body
        let {id}=req.params
        let newdata=await postmodel.findById(id)
        if(req.id==newdata.userid){
            newdata.updateOne(data)
            res.status(200).send("post updated")
        }else{
            res.status(400).send("something went wrong")
        }
    } catch (error) {
        console.log(error)
    }
})
postroute.delete("/delete/:id",middleware,async(req,res)=>{
    try {
       
        let data=req.body
        let {id}=req.params
        let newdata=await postmodel.findById(id)
        if(req.id==newdata.userid||req.role=="Moderator"){
            newdata.deleteOne(data)
            res.status(200).send("post deleted")
        }else{
            res.status(400).send("something went wrong!!")
        }
    } catch (error) {
        console.log(error)
    }
})

postroute.delete("/deleteone/:id",middleware,auth(["Moderator"]),async(req,res)=>{

try {
    let {id}=req.params
let deletedata=await postmodel.findByIdAndDelete(id)
res.status(200).send("post deleted by moderator")
} catch (error) {
    console.log(error)
}
})



module.exports={postroute}