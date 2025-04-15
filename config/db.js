// import mongoose from "mongoose";

// let catched = global.mongoose;

// if(!catched){
//     catched = global.mongoose= {conn:null ,promise:null}
// }

// async function connectDb() {
//     if(catched.conn){
//         return catched.conn
//     }
//     if(!catched.promise){
//         const opts = {
//             bufferCommands:false,
//         }
//         catched.promise = mongoose.connect(`${ process.env.MONGODB_URI}/qickcart`,opts).then((mongoose) => {
//             return mongoose
//         })
//     }
//     catched.conn = await catched.promise;
//     return catched.conn;
    
// }

// export default connectDb;


import mongoose from "mongoose";

const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable not set');
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'qickcart',
    });
    connection.isConnected = db.connections[0].readyState;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default connectDb;