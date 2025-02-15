import { chat } from "@/utils/model";
import { cookies } from "next/headers";

export async function POST(request: Request){
    try {
        const {senderId, receiverId, content, status} = await request.json();
        const newChat = new chat({
            senderId,
            receiverId,
            content,
            status
          })
          await newChat.save();
          return new Response(JSON.stringify({
            "message":"chat saved"
          }))
    } catch (error) {
        return new Response(JSON.stringify({"message": `An error has occurred: ${error}`}));
    }
    
 
 }


export async function GET() {
  try {
    const cookieStore =await cookies();
    const userId = cookieStore.get("id");

    if (!userId) {
      return new Response(JSON.stringify({ message: "User not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const chats = await chat.find({
      $or: [
        { senderId: userId.value },
        { receiverId: userId.value }
      ]
    });

    if (!chats || chats.length === 0) {
      return new Response(JSON.stringify({ message: "No chats found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(chats), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: `An error occurred: ${error}` }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
