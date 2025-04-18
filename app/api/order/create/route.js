import { inngest } from "../../../../config/inngest";
import Product from "../../../../models/Product";
import User from "../../../../models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(request) {
    try{
        const {userId} = getAuth()
        const {address, items} = await request.json()

        if(!address ||  items.length === 0){
            return NextResponse.json({success:false,  message: "Please provide address and items"})  
        }

        //calculate total amount

        const amount= await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return await acc + product.offerPrice * item.quantity;
        },0)

        await inngest.send({
            name: "create-user-order",
            data: {
                userId: userId.userId,
                items: items,
                amount: amount,
                address: address,
                amount: amount + Math.floor(amount * 0.02 ),
                date: Date.now(),
            }
        })

        // clear user cart
        const user = await User.findById(userId)
        user.cartItems= {}
        await user.save()

        return NextResponse.json({success:true, message: "Order created successfully"})
    }
    catch(err){
        console.log(err)
        return NextResponse.json({success:true, message: err.message})
    }   
}