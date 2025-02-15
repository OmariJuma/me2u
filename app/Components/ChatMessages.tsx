"use client";

import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useUserStore } from "@/utils/store";
import { database, ref, onValue } from "@/utils/firebase";

interface Chat {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

const ChatMessages: React.FC = () => {
  const [chatData, setChatData] = useState<Chat[]>([]);
  const { id: userId } = useUserStore((state) => state.userInfo);
  const receiverId = useUserStore((state) => state.receiverId);

  useEffect(() => {
    if (!userId || !receiverId) return; // ✅ Prevent running with undefined values

    console.log("🔥 Fetching messages for conversation between:", userId, receiverId);

    const chatRef = ref(database, "chats");

    // ✅ Listen for real-time updates
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        console.warn("⚠️ No chat messages found in Firebase.");
        setChatData([]);
        return;
      }

      const messages: Chat[] = Object.values(data);

      console.log("📩 All Messages from Firebase:", messages);

      // ✅ Filter messages correctly
      const filteredMessages = messages.filter(
        (msg) =>
          (msg.senderId === userId && msg.receiverId === receiverId) ||
          (msg.senderId === receiverId && msg.receiverId === userId)
      );

      console.log("✅ Filtered Messages:", filteredMessages);
      setChatData(filteredMessages);
    });

    return () => unsubscribe(); // ✅ Cleanup listener when component unmounts
  }, [userId, receiverId]);

  return (
    <div className="flex flex-col gap-2 p-4 mb-10">
      {chatData.length === 0 && (
        <p className="text-gray-500 text-center">No messages yet...</p>
      )}

      {chatData.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.senderId === userId ? "justify-end" : "justify-start"
          }`}
        >
          <Typography
            variant="body2"
            className={`border-2 p-2 rounded-md ${
              msg.senderId === userId ? "bg-blue-400 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {msg.content}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
