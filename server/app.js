const mongoose=require('mongoose');
const mongodb=require('mongodb')
const dotenv=require('dotenv');
const express =require("express");
const app=express();
dotenv.config({path:'./config.env'});
require('./db/conn');

app.use(express.json());
 app.use(require('./router/auth'));




//midlewarefuntion
const middleware = (req,res, next)=>{
  console.log("hwllo form the middle ware")
  next();
};


//Home
app.get('/',(req,res)=>{
    res.send('hello from the backendside') 
});


//aboutUs
app.get('/about',middleware,(req,res)=>{
    res.send('hello from the about-Us side') 
});

//contectUs

app.get('/contect',(req,res)=>{
    res.send('hello from the contect-Us side') 
});

//signin

app.get('/signin',(req,res)=>{
    res.send('hello from the signin side') 
});

//signUp
app.get('/signup',(req,res)=>{
    res.send('hello from the sign-Up side') 
});

app.listen(5000,()=>{
    console.log('server is listening on port number 5000')
});  