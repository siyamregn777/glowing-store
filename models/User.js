import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({
    _id:{type:string ,required:true},
    name: {type: String, required: true},
    email: {type: String, required: true ,unique},
    imageUrl:{type:string ,require:true},
    cartItems:{tyepe:Object ,default:{}}, // {productId:quantity}   
},{minimize:false})

const User = mongoose.model.user || mongoose.model("user", userSchema);

export default User;