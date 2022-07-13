import path from'path';
import fs from"fs";
import data from'./readfile.js';

var directories = path.join("__dername"+"./data.json");
function updatedata(value){
    for(let i=0;i<data.length;i++){
        var y = data[i].name === value[0].name
        var z = data[i].password === value[0].password
        if(y == false && z==false){
            value.push(data[i])
        }else if(data==false && y==true){
            value.map((e)=>{
                if(e.name === data[i].name){
                    e.password += data[i].password; 
                }else{
                    return
                }
            })
        }
      else if(y==false && data==true){
            value.map((e)=>{
                if(e.password === data[i].password){
                    e.name += data[i].name; 
                }else{
                    return
                }
            })
        }
    }

    var updatedata = new Promise((resolve,reject)=>{
            fs.writeFile('data.json',JSON.stringify(value),function(err){
              if(err) throw err;
              else{
                 resolve(true);
                }
            })
    })
    .then((d)=>{
        return d;
    })
    .catch((err)=>{
        return err;
    })
      return updatedata
}




export default updatedata
