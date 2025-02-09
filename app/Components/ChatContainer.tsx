"use client";
import React, { useEffect, useState } from "react";
import ChatItem from "./ChatItem";

export type Chat = {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string; // Changed to string for easy sorting
  status: "sent" | "delivered" | "read";
};

export type User = {
  _id: string;
  name: string;
  profilePicUrl: string;
};

const ChatContainer: React.FC = () => {
  const [chatData, setChatData] = useState<Chat[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const currentUser = "67a678e6d74d084b48b2b0a2"; // Replace with actual user ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chatRes, userRes] = await Promise.all([
          fetch("/api/chats"),
          fetch("/api/users"),
        ]);

        const chatData: Chat[] = await chatRes.json();
        const usersData: User[] = await userRes.json();

        setChatData(chatData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Extract unique user IDs from chatData (excluding currentUser)
  const uniqueUserIds = new Set(
    chatData.flatMap(({ senderId, receiverId }) =>
      [senderId, receiverId].filter((id) => id !== currentUser)
    )
  );

  // Get user objects based on unique IDs
  const uniqueUsers = users.filter((user) => uniqueUserIds.has(user._id));

  // Function to get the last message exchanged with a user
  const getLastMessage = (userId: string) => {
    const messages = chatData
      .filter(
        (chat) =>
          (chat.senderId === currentUser && chat.receiverId === userId) ||
          (chat.senderId === userId && chat.receiverId === currentUser)
      )
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ); // Sort descending

    return messages.length > 0 ? messages[0] : null;
  };

  return (
    <div className="flex flex-col items-start gap-4 mt-4 sm:w-full md:w-1/3 lg:w-1/4 overflow-y-auto h-full">
      {uniqueUsers.map((user) => {
        const lastMessage = getLastMessage(user._id);
        return (
          <ChatItem
            key={user._id}
            name={user.name}
            lastChat={lastMessage ? lastMessage.content : "No messages yet"}
            unreadChatsCount={0} // You can replace this with actual unread message count logic
            time={
              lastMessage
                ? new Date(lastMessage.timestamp).toLocaleTimeString()
                : ""
            }
            imageLink={user.profilePicUrl || ""}
          />
        );
      })}
    </div>
  );
};

export default ChatContainer;
