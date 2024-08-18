import { User_Model_Logs } from "./models";
import { connectToDatabase } from '$lib/server/db';





export async function saveLog(
    email: string,
    ssoEmail?: string,
    name?: string,
    dateAndTime?: string,
    result?: string,
    ip?: string,
    hostname?: string,
): Promise<{ error: string }> {
    const newID =  crypto.randomUUID();
    const User_Logs = new User_Model_Logs({
        id: newID,
        email: email,
        ssoEmail: ssoEmail ? ssoEmail : "null",
        name: name ? name : "null",
        dateAndTime: dateAndTime,
        result: result ? result : "null",
        ip: ip ? ip : "null",
        hostName: hostname ? hostname : "null",
    });
  
   
  
    const { db } = await connectToDatabase();
    const collection = db.collection('userslogs'); // replace with your collection name

   
    try {

        await collection.insertOne(User_Logs );
      //  await User_Logs.save();

       
        return { error: "" };
    } catch (err) {

        
        return { error: err?.toString() as string };
    }
}