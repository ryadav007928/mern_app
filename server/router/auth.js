const jwt=require('jsonwebtoken')
const express =require('express');
const router =express.Router();
const bcryptjs=require('bcryptjs');
require('../db/conn');
const User=require('../models/userSchema');





router.get('/',(req,res)=>{
    res.send('hello from the backendside server router side') 
});
//post method with promicec
// router.post('/register',(req,res)=>{
//     // console.log(req.body);
//     // res.send(req.body);
//   const {name,email,phone,work,password,cpassword}= req.body;
//      if(!name || !email || !phone || !work || !password || !cpassword)
//      {
//       return  res.status(422).json({error : "Ple fill the feild properly"})
//      }
//         User.findOne({email : email})
//         .then((userexits)=>{
//            if(userexits){
//            return res.status(422).json({error :"user is alredy present in data base"})
//            }; 

//            const user= User({name,email,phone,work,password,cpassword})
//            user.save().then(()=>{
//             res.status(201).json({messge : " user registration successful"})
//            }).catch((err)=>{ res.status(500).json({errr: "faild to Register"})
//         }).catch((err)=>{console.log(err)})
//         })
        
// })

//post method with async await
router.post('/register',async(req,res)=>{

      const {name,email,phone,work,password,cpassword}=req.body;
      if(!name || !email || !phone || !work || !password || !cpassword)
      {
        return  res.status(422).json({error : "Ple fill the feild properly"});
      }
      try{
         const userexits=await  User.findOne({email :email})
         if(userexits)
         {
            return res.status(422).json({error :"user is alredy present in data base"})
         }
         else if(password != cpassword)
         {
            return res.status(422).json({error :"password and confirpassword are not same"})
         }
         const user=User({name,email,phone,work,password,cpassword});
      
         await  user.save();
         const userlogin=await User.findOne({email : email})
        
        //const token=await userlogin.genateAuthtoken();
       
        
         
            res.status(201).json({massge : " user registration successful"})
         
       
      }
      catch(err){
        console.log(err)
      }
});
//signin 
router.post('/signin',async(req,res)=>{
  try{
    const {email,password}=req.body
    if(!email || !password)
    {
        res.status(400).json({error :"all field fill neccesary"})
    }
    const userlogin=await User.findOne({email : email})

   if(userlogin){

    const varifypwd= await bcryptjs.compare(password,userlogin.password)
   
    const  token= await userlogin.genateAuthtoken();
    res.cookie("jwtoken",token,{
        expires:new Date(Date.now() + 2592000000),
        httpOnly:true
    })

    if(!varifypwd)
    {
       res.status(401).json({massge :"invalid credentials"});
    }
  
    else{
        res.status(200).json({massge : "login successfull"});
    }
   }
   else{
    res.status(401).json({massge :"invalid credentials"});
   }
  }
  catch(err){
console.log(err)
  }


})

module.exports=router;