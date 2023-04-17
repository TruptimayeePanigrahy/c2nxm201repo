const mongoose=require("mongoose")

const postschema=mongoose.Schema({
    title:String,
    desc:String,
    about:String,
    userid:String
})

const postmodel=mongoose.model("post",postschema)

module.exports={postmodel}