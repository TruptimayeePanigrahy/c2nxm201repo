const mongoose= require("mongoose");

const blackschema=mongoose.Schema({
    token:String
},
{
    versionKey:false
})
const blackmodel=mongoose.model("blacklist",blackschema)
module.exports={blackmodel}