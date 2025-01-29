// app/Components/ChatMessages.tsx
import React from "react";
import { useIsVisibleStore } from "@/utils/store";
import { Typography } from "@mui/material";
import { chats } from "./ChatContainer";

const ChatMessages: React.FC = () => {
  const messages = chats;
  const chatData = useIsVisibleStore((state) => state.chatData);
  return (
    <div className="flex flex-col gap-2 p-4">
      {messages
        .filter((msg) => (msg.from === chatData.name || msg.to === chatData.name))
        .map((msg, index) => (
          <div key={index} className={`flex ${msg.from === chatData.name ? "justify-start" : "justify-end"}`}>
            <Typography variant="body2" className="border-2 border-blue-400 p-2 rounded-md">
              {msg.lastChat}
            </Typography>
          </div>
        ))}
    </div>
  );
};

export default ChatMessages;