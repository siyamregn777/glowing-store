import { getAuth } from "@clerk/nextjs/server"
import authSeller from "../../../../lib/authSeller";
import connectDb from "../../../../config/db";
import { NextResponse } from "next/server";
import Address from "../../../../models/Address";


export async function GET(request) {
    try{
        const {userId} = getAuth();
        const isSeller = await authSeller(userId);
        if(!isSeller){
            return NextResponse.json({success:false, message: "You are not a seller"})
        }
         await connectDb()

         Address.length

         const orders = await Order.find({}).populate('address items.product')

         return NextResponse.json({success:true, orders})
    }
    catch(err){
        console.log(err)
        return NextResponse.json({success:true, message: err.message})
    }
}