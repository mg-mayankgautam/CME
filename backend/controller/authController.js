// require('dotenv').config();
// const userDB=require("../models/usersDB.js")


module.exports.adminlogin=async(req,res)=>{

    console.log(req.body);
   let ID=req.body.ID;
   let Pwd=req.body.Pwd

}

module.exports.adminInfo=async(req,res)=>{

    console.log(req.user, 'here')
}