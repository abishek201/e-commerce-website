import mongoose from "mongoose"; //importing mongo db as mongoose 


const MONGODB_URI = process.env.MONGODB_CONNECTION; // conecting env url

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local"); // if any problem in url it show this message
}

let cached = (global as any).mongoose; // checks the mongo db connection is alerady is avaiable

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }; // if not assing value of this 
}

async function dbConnect() {  // if data base is connected already return this 
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!).then((mongoose) => { // if not it will attempent to connect the data base
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;   // wait for connection once it connected saves in the cached.conn
  } catch (e) {
    cached.promise = null;             // if any error like password aor any thing happens it will reset the value of cached to null
    throw e;
  }

  return cached.conn;
}

export default dbConnect;






 