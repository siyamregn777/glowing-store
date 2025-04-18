
import mongoose from 'mongoose';

const addressSchem = new mongoose.Schema({
    userId: { type: String, required: true,  },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    pincode: { type: Number, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },

})

const Address = mongoose.models.address || mongoose.model("address", addressSchem)
export default Address