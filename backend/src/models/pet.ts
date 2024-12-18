import mongoose from "mongoose";

var petSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type: Number,
        required: true,
    },
    description: {
      type: String,
    },
    weight: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    available: {
      type: Boolean,
    },
    user: Object,
    adopter: Object,
}, {
    timestamps: true
});

const Pet = mongoose.model('Pet', petSchema);
export default Pet

