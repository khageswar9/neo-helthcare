import express from 'express';
import data from'../cummonfun/readfile.js';
import pushdata from'../cummonfun/writefile.js';
import sha256 from'sha256'
import deleteData from '../cummonfun/deletefile.js';
import updatedata from'../cummonfun/updatefile.js';
const router = express.Router();



router.get("/get", async (req, res) => {
    try{
       res.send( data)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})

router.post("/create", async (req, res) => {
    try{
        var signupdata = {
            "name": req.body.name , 
            "password":sha256(req.body.password)
        }
        const user = data.find(user => user.name === req.body.name)
       if(!user){
        if(await pushdata(signupdata)){
            res.send("User creation sucess")
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

router.patch("/update", async (req, res) => {
    try{
        const usercheck = data.find(user => user.name === req.body.name || user.password === sha256(req.body.password))
        if(usercheck ){
           const user = [{
            "name": req.body.name , 
            "password":sha256(req.body.password)
           }]
           if(await updatedata(user)){
            res.send("User update sucess")
        }else{
            res.send({message : "Somthing went wrong plz try again"})
        }
       }else{
        res.send({message : "The user not exist"})
       }
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})

router.delete("/delete", async (req, res) => {
    try{
        const usercheck = data.find(user => user.name === req.body.name && user.password === sha256(req.body.password))
        if(usercheck ){
           const user = data.filter((user) =>{return user.name != usercheck.name})
           if(await deleteData(user)){
            res.send("User delete sucess")
        }else{
            res.send({message : "Somthing went wrong plz try again"})
        }
       }else{
        res.send({message : "The user not exist"})
       }
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})
export default router;