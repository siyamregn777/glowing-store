import connectDb from "../../../../config/db";
import User from "../../../../models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(req) {
    try{
        const {userId} = getAuth(req)

        const {cartData} = await req.json()

        await connectDb()
        const user = await User.findById(userId)

        user.cartItems = cartData
        await user.save()

      return  NextResponse.json({success: true})


    }
    catch(error){
        return NextResponse.json({success: false, message: error.message})
    }
}