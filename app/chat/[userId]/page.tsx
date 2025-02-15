import ChatContainer from "@/app/Components/ChatContainer";
import ChatInput from "@/app/Components/ChatInput";
import ChatMessages from "@/app/Components/ChatMessages";
import { cookies } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  // "use server"
  const userId =  (await params).userId;
  const cookieStore = await cookies();
  const currentUserId = cookieStore.get("id");
  return (
    <>
     <div className={"flex flex-row gap-3 h-[80vh]"}>
        {/* Left Chat List Panel */}
        {/* <ChatContainer /> */}

        {/* Right Chat Messages Panel */}
          
          <div className="md:w-2/3 lg:w-3/4 overflow-y-auto h-full">
            <ChatMessages />

        <ChatInput
          senderId={currentUserId?.value?.toString() ?? ""}
          receiverId={userId}
        />
          </div>
      </div>
    
    
    </>
  );
}
