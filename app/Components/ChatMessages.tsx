"use client";

import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Chat } from "./ChatContainer";

const ChatMessages: React.FC = () => {
  const [chatData, setChatData] = useState<Chat[]>([]);
  const currentUser = "67a678e6d74d084b48b2b0a2"; // Replace with actual user ID

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/chats");
        if (!response.ok) throw new Error("Failed to fetch chats");
        const data: Chat[] = await response.json();
        setChatData(data);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="flex flex-col gap-2 p-4">
      {chatData
        .filter((msg) => msg.senderId === currentUser || msg.receiverId === currentUser)
        .map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.senderId === currentUser ? "justify-end" : "justify-start"}`}
          >
            <Typography variant="body2" className="border-2 border-blue-400 p-2 rounded-md">
              {msg.content}
            </Typography>
          </div>
        ))}
    </div>
  );
};

export default ChatMessages;
