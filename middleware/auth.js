
const auth=(permited)=>{
    return (req,res,next)=>{
        let userrole=req.role
        if(permited.includes(userrole)){
            next()
        }else{
            res.send("not authorized")
        }
    }
}

module.exports={
    auth
}