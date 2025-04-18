import connectDb from "../../../../config/db";
import authSeller from "@/lib/authSeller"
import { getAuth } from "@clerk/nextjs/dist/types/server"
import Product from "../../../../models/Product"
import { NextResponse } from "next/server"

export async function GET(req) {
    try{

        const {userId} = getAuth(req)
        const isSeller = await authSeller(userId)

        if(!isSeller){
            return NextResponse.json({success: false, message: "You are not authorized to view this product"})
        }

        await connectDb
        const products = await Product.find({})
        return NextResponse.json({success: true, message: "Product fetched successfully", products})
    }

    catch(error){
        return NextResponse.json({success: false, message: error.message})
    }
}