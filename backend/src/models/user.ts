import mongoose from "mongoose";

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password: { 
        type:String, 
        required:true, 
    },
    image: {
        type: String,
    }, 
    phone: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;