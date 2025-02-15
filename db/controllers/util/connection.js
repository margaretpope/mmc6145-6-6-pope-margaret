import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${process.env.npm_package_config_DB_NAME}`;
const uri = 'mongodb+srv://mmp298:<Cibnaq-3femky-zimvoj>@cluster0.ifhp4sg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// src: https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}
