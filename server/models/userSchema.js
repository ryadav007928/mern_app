const jwt=require('jsonwebtoken');
const mongoose =require('mongoose');
const bcryptjs=require('bcryptjs');


const userSchema = new mongoose.Schema({

      name :{
        type:String,
        require:true
      },
      email :{
        type:String,
        require:true
      },
      phone :{
        type:Number,
        require:true
      },
      work :{
        type:String,
        require:true
      },
      password :{
        type:String,
        require:true
      },
      cpassword :{
        type:String,
        require:true
      },
    userID: {
    type: String,  // This will store the random user ID
    //required: true,
    //unique: true
  }
});
// we are hashing the passwords
 userSchema.pre('save',  function(){
  if(this.isModified('password'))
    {
    
    this.password=bcryptjs.hashSync(this.password,12);
    this.cpassword=bcryptjs.hashSync(this.cpassword,12);
   
  }
//  next();
 })
//we are generating token

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    // Generate a random userID using uuid
    this.userID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  next();
});

 //we are creating collection
const User =mongoose.model('USER', userSchema);

module.exports=User