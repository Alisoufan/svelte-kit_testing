import mongoose from "mongoose";

const User_Schema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	autherizedAccess: { type: Boolean, required: true ,default:false},
	CreatedAt: { type: Date, required: true ,default : new Date()},
	LastLogin: { type: Date, required: false },

});

const User_Model_Logs_Schema = new mongoose.Schema({
	id: { type: String, required: true, unique: true , default : crypto.randomUUID()},
	email: { type: String, required: true},
	ssoEmail: { type: String, required: false},
	name: { type: String, required: true },
	dateAndTime: { type: Date, required: true },
	result: { type: String, required: true },
	ip: { type: String, required: true },
	hostName: { type: String, required: true },
	
});

export const User_Model_Logs = mongoose.model("UsersLogs", User_Model_Logs_Schema);

export const User_Model = mongoose.model("User", User_Schema);
