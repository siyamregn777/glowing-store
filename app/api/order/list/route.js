import { getAuth } from "@clerk/nextjs/server"
import connectDb from "../../../../config/db"
import Product from "../../../../models/Product"
import Address from "../../../../models/Address"
import order from "../../../../models/Order"

export async function GET(request) {
    try{
        const {userId} = getAuth()
        await connectDb()

        Address.length
        Product.length

        const orders = await Order.find(userId).populate('address items.product')

        return NextResponse.json({success:true, orders})
    }
    catch(err){
        console.log(err)
        return NextResponse.json({success:true, message: err.message})
    }
}