import mongoose from "mongoose";

let catched = global.mongoose;

if(!catched){
    catched = global.mongoose= {conn:null ,promise:null}
}

async function connectDb() {
    if(catched.conn){
        return catched.conn
    }
    if(!catched.promise){
        const opts = {
            bufferCommands:false,
        }
        catched.promise = mongoose.connect(`${ process.env.MONGODB_URI}/qickcart`,opts).then((mongoose) => {
            return mongoose
        })
    }
    catched.conn = await catched.promise;
    return catched.conn;
    
}

export default connectDb;