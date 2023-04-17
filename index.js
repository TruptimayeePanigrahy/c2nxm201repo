const express=require("express")
const mongoose=require("mongoose")
require("dotenv").config()
const {connection}=require("./db")
const { userroute } = require("./routes/userroute")
const cookies=require("cookie-parser")
const { postroute } = require("./routes/postroute")
const app=express()
app.use(express.json())

app.use(cookies())


app.use("/user",userroute)

app.use("/post",postroute)






app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connect to db...")
    } catch (error) {
        console.log(error)
    }
    console.log("server running..")
})