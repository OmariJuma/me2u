"use client";

import React, { useEffect, useState, useMemo } from "react";
import ChatItem from "./ChatItem";
import { useIsVisibleStore, useUserStore } from "@/utils/store";
import { Select, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { database, ref, onValue } from "@/utils/firebase";
import { set } from "mongoose";

export type Chat = {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
};

export type User = {
  _id: string;
  name: string;
  profilePicUrl: string;
};

const ChatContainer: React.FC = () => {
  const [chatData, setChatData] = useState<Chat[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  const { id: userId } = useUserStore((state) => state.userInfo) || {};
  const setReceiverId = useUserStore((state) => state.setReceiverId);
  const setIsActive = useIsVisibleStore((state) => state.updateIsVisible);
  const router = useRouter();

  // Fetch messages in real-time
  useEffect(() => {
    const chatRef = ref(database, "chats");

    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messages: Chat[] = Object.values(data);
        setChatData(messages);
      }
    });

    return () => {}; // Firebase handles cleanup automatically
  }, []);
  console.log(chatData);
  // Fetch users (For now, keeping the API call. Firebase Auth can be integrated later)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users"); // Fetch from Next.js API
        const usersData: User[] = await response.json();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Extract unique user IDs from chatData (excluding current user)
  const uniqueUserIds = new Set(
    chatData.map((chat) =>
      chat.senderId === userId ? chat.receiverId : chat.senderId
    )
  );

  // Get user objects based on unique IDs
  const uniqueUsers = users.filter((user) => uniqueUserIds.has(user._id));

  // Memoized sorted messages for efficiency
  const sortedMessages = useMemo(() => {
    return [...chatData].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [chatData]);

  // Function to get the last message exchanged with a user
  const getLastMessage = (userId: string) =>
    sortedMessages.find(
      (chat) => chat.senderId === userId || chat.receiverId === userId
    ) || null;

  return (
    <div className="flex flex-col items-start gap-4 mt-4 sm:w-full md:w-1/3 lg:w-1/4 overflow-y-auto h-full">
      {uniqueUsers.map((user) => {
        const lastMessage = getLastMessage(user._id);
        return (
            <ChatItem
              key={user._id}
              id={user._id}
              name={user.name}
              lastChat={lastMessage ? lastMessage.content : "No messages yet"}
              unreadChatsCount={
                chatData.filter(
                  (chat) =>
                    chat.senderId === user._id && chat.receiverId === userId
                ).length
              }
              time={
                lastMessage
                  ? new Date(lastMessage.timestamp).toLocaleTimeString()
                  : ""
              }
              imageLink={user.profilePicUrl || ""}
            />
        );
      })}

      <Select
        sx={{ width: "100%", mt: 2 }}
        displayEmpty
        value={selectedUserId}
        onChange={(e) => {
          const newUserId = e.target.value as string;
          setIsActive(true);
          // setSelectedUserId(newUserId);
          setReceiverId(newUserId);
          setSelectedUserId("");

          // router.push(`/chat/${newUserId}`);
        }}
        className="bg-white text-black"
      >
        <MenuItem disabled value="">
          <em>Start a new chat</em>
        </MenuItem>
        {users
          .filter((user) => user._id !== userId && !uniqueUserIds.has(user._id))
          .map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
            </MenuItem>
          ))}
      </Select>
    </div>
  );
};

export default ChatContainer;
