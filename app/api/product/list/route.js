import connectDb from "../../../../config/db";
import Product from "../../../../models/Product"
import { NextResponse } from "next/server"

export async function GET(req) {
    try{

        await connectDb
        const products = await Product.find({})
        return NextResponse.json({success: true, message: "Product fetched successfully", products})
    }

    catch(error){
        return NextResponse.json({success: false, message: error.message})
    }
}