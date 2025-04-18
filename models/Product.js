import mongoose from 'mongoose';
import { type } from 'os';

const  productSchema = new mongoose.Schema({
    userId: { type: String, required: true , ref : "user"},
    name :{type: String , require: true},
    description : {type: String , require: true},
    price : {type: Number , require: true},
    offerPrice : {type: Number , require: true},
    image : {type: Array , require: true},
    category : {type: String , require: true},
    date: {type: Number, required: true},

})

const Product = mongoose.models.product || mongoose.model("product", productSchema)

export default Product