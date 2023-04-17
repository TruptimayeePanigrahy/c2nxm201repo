const mongoose= require("mongoose");

const userschema=mongoose.Schema({
name:String,
email:{type:String,unique:true,require:true},
password:{type:String,require:true},
role:
  {type:String,Defalut:"User",enum:["User","Moderator"]}


})
const usermodel=mongoose.model("user",userschema)


module.exports={usermodel}