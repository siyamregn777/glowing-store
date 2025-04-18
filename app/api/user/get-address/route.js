import connectDb from "../../../../config/db";
import Address from "../../../../models/Address"
import { getAuth } from "@clerk/nextjs/server"


export async function GET(req) {
    try{

        const {userId} = getAuth

        await connectDb()
        const address = await Address.findById(userId)

        return NextResponse.json({success: true, address})

    }
    catch(error){
        return NextResponse.json({success: false, message: error.message})
    }
}