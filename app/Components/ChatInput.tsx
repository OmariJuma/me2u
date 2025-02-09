"use client";

import React, { useState } from "react";

interface ChatInputProps {
  senderId: string;
  receiverId: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ senderId, receiverId }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return; // Prevent sending empty messages

    const chatBody = {
      senderId,
      receiverId,
      content: message,
      messageType: "text",
      status: "sent",
    };

    try {
      const response = await fetch("/api/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatBody),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setMessage(""); // Clear input after successful send
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 md:w-2/3 lg:w-3/4 bg-gray-200 p-2 flex items-center gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-grow text-black px-4 py-2 border-3 border rounded-md focus:outline-none placeholder:text-gray-600"
      />
      <button
        onClick={sendMessage}
        disabled={!message.trim()}
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-600 "
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
