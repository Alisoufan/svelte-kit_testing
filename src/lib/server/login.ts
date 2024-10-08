import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { SECRET_JWT_KEY } from "$env/static/private";
import { email_regexp } from "./utils";
import { User_Model } from "./models";
import { MongoClient, Db } from 'mongodb';
import { connectToDatabase } from '$lib/server/db';

const { db } = await connectToDatabase();
const collection = db.collection('users'); // replace with your collection name

export async function login_user(
	email: string,
	password: string
): Promise<{ error: string } | { token: string; user: userMC }> {
	const user = await get_user(email, password);

	if ("error" in user) {
		return { error: user.error };
	}

	const token = jwt.sign({ id: user.id }, SECRET_JWT_KEY);

	return { token, user };
}

async function get_user(
	email: string,
	password: string
): Promise<{ error: string } | userMC> {
	if (!email) {
		return { error: "Email is required." };
	}

	if (!email.match(email_regexp)) {
		return { error: "Please enter a valid email." };
	}

	const user = await collection.findOne({ email });

	if (!user) {
		return { error: "Email could not be found." };
	}

	if (!password) {
		return { error: "Password is required." };
	}

	const password_is_correct = await bcrypt.compare(
		password,
		user.password
	);

	if (!password_is_correct) {
		return { error: "Password is not correct." };
	}

	const id = user._id.toString();

	const name = user.name;

	return { id, email, name };
}
