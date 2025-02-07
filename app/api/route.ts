import {chat, user} from "@/utils/model";
import connectToDb from "@/utils/connectToDb";

export async function GET(request: Request) {
  try {
    return Response.json({ message: "Hello world" }); 
  } catch (error) {
    throw new Error(`${error}`)
  }
}
