// const mongoose=require('mongoose')
// const userSchema=new mongoose.Schema({
//     firstName:{
//         type: String,
//         required: true,
//         trim: true,
//     },
//     lastName:{
//         type: String,
//         required: true,
//         trim: true,
//     },
//     password:{
//         type: String,
//         required: true,
//         minlength: 6,
        
//     },
//     email:{
//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true,
//         trim: true,
//         match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
//     }
// })
// const User=mongoose.model("users",userSchema)
// module.exports=User


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    minlength: 8,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
  },
  uid: {
    type: String,
    unique: true, // Ensures that each uid is unique
    sparse: true, // Allows `uid` to be optional when using email/password
  }
});

const User = mongoose.model("users", userSchema);
module.exports = User;
