import mongoose from "mongoose";

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type: Number,
        required: true,
    },
    weight: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    available: {
        type: Boolean
    },
    user: Object,
    adopter: Object
}, {
    timestamps: true
});

//Export the model
const Pet = mongoose.model('Pet', userSchema);
export default Pet