const mongoose =require('mongoose');

const Db='mongodb+srv://ryadav007:DuY6QcYbwe.uCKj@cluster0.rj77i.mongodb.net/';
mongoose.connect(Db).then(()=>{
    console.log("connection successfull")
}).catch((err)=>{
    console.log(err)
});
