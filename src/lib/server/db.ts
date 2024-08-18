import { SECRET_MONGODB_URI ,MONGODB_DATABASE_NAME } from "$env/static/private";
import { MongoClient, Db } from 'mongodb';
import mongoose from "mongoose";

let client: MongoClient;
let db: Db;

export async function connect_to_db() {
	try {
		return await mongoose.connect(SECRET_MONGODB_URI);
	} catch (err) {
		console.log(err);
	}
}

export async function connectToDatabase() {
    if (!client || !db) {
        const uri = SECRET_MONGODB_URI; // replace with your MongoDB connection string
        client = new MongoClient(uri);
        await client.connect();
        db = client.db(MONGODB_DATABASE_NAME); // replace with your database name
    }
    return { client, db };
}