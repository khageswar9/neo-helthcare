import express from 'express';
import data from'../cummonfun/readfile.js';
import pushdata from'../cummonfun/writefile.js';
import sha256 from'sha256'
const router = express.Router();

router.post("/login", async (req, res) => {
    try{
        const user = data.find(user => user.name === req.body.name && user.password === sha256(req.body.password))
        if(user){
            res.send("login up sucess")
        }else{
            res.send({message : "wrong email or password"})
        }
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})
router.post("/signup", async (req, res) => {
    try{
        var signupdata = {
            "name": req.body.name , 
            "password":sha256(req.body.password)
        }
        const user = data.find(user => user.name === req.body.name)
       if(!user){
        if(await pushdata(signupdata)){
            res.send("sign up sucess")
        }else{
            res.send({message : "Somthing went wrong plz try again"})
        }
       }else{
        res.send({message : "The user already exist"})
       }
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})

export default router;