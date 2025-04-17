import { Inngest } from "inngest";
import connectDb from "./db";
import User from "../models/User";
// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

export const syncUserCreation = inngest.createFunction(
    {
        id:'sync-user-from-clerk'
    },
    {
        event:'clerk/user.created',
    },
    async ({event}) => {
        const {id, first_name,last_name, email_addresses, image_Url} = event.data
        const userData = {
            _id:id,
            name:first_name + ' ' + last_name,
            email:email_addresses[0].email_address,
            imageUrl:image_Url,

        }
        await connectDb()
        await User.create(userData)
    }   
)
export const syncUserUpdation = inngest.createFunction(
    {
        id:'update-user-from-clerk'
    },
    {
        event:'clerk/user.updated',
    },
    async ({event}) => {
        const {id, first_name,last_name, email_addresses, image_Url} = event.data
        const userData = {
            _id:id,
            name:first_name + ' ' + last_name,
            email:email_addresses[0].email_address,
            imageUrl:image_Url,

        }
        await connectDb()
        await User.findByIdAndUpdate(id , userData)
    }
)

export const syncUserDeletion = inngest.createFunction(
    {
        id:'delete-user-from-clerk'
    },
    {
        event:'clerk/user.deleted',
    },
    async ({event}) => {
        const {id} = event.data
        await connectDb()
        await User.findByIdAndDelete(id)
    }
)