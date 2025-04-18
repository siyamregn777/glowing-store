import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
// import { get } from "http";
import authSeller from "../../../../lib/authSeller";
// import { rejects } from "assert";
import connectDb from "../../../../config/db";
import Product from "../../../../models/Product";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

}) 
export async function POST(req) {
    try {
        const {userId} = getAuth(req)
        const isSeller = await authSeller(userId)

        if(!isSeller){
            return NextResponse.json({success: false, message: "You are not authorized to add product"})
        }
        const formData = await req.formData()
        const name = formData.get("name")
        const price = formData.get("price")
        const description = formData.get("description")
        const category = formData.get("category")
        const offerPrice = formData.get("offerPrice")

        const files = formData.getAll("images")

        if(!files || files.length === 0){
            return NextResponse.json({success: false, message: "Please upload at least one image"})
        }

        const result = await Promise.all(files.map(async (file)=>{
            const arrayBuffer = await file.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)

            return  new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {resource_type: "auto"}, 
                    (error, result)=>{
                        if(error){
                            reject(error)
                        }
                        else{
                            resolve(result)
                        }
                    
                    }
                )
                stream.end(buffer)
            })
        })
    )

    const image = result.map(result => result.secure_url)

    await connectDb
    const newProduct = await Product.create({
        userId,
        name,
        price:Number(price),
        description,
        category,
        offerPrice,
        image,
        date: Date.now(),
    })
    return NextResponse.json({success: true, message: "Product added successfully", product: newProduct}) 

    } catch (err) {
        return NextResponse.json({success: false, message: err.message})
    }
}