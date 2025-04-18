import { getAuth } from "@clerk/nextjs/server"
import connectDb from "../../../../config/db";
import User from "../../../../models/User";
import { NextResponse } from "next/server"


export async function Get(req){
    try{
        const {userId} = getAuth

        await connectDb()
        const user = await User.findById(userId)
        const{ cartItems } = user

        return NextResponse.json({success: true, cartItems})
    }
    catch(error){
        return NextResponse.json({success: false, message: error.message})

    }
   
}