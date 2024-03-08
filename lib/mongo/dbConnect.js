import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
  if (connection.isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log('MongoDb connected');
  } catch (error) {
    console.log('Error connecting to MongoDb', error);
    throw new Error('Error connecting to MongoDb');
  }
}

export default dbConnect;
