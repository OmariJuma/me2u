import { chat } from "@/utils/model";

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
  const chats = await chat.find();
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
}