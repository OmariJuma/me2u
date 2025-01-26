"use client";
import React from "react";
import ChatItem from "./ChatItem";
import { Container } from "@mui/material";

const chats = [
  {
    imageLink: "https://avatar.iran.liara.run/public/1",
    name: "Alice",
    lastChat: "Hey, how are you?",
    time: "10:30 AM",
    unreadChatsCount: 2,
    from: "Alice",
    to: "Bob",
  },
  {
    imageLink: "https://avatar.iran.liara.run/public/2",
    name: "Bob",
    lastChat: "I'm good, thanks!",
    time: "10:32 AM",
    unreadChatsCount: 0,
    from: "Bob",
    to: "Alice",
  },
  {
    imageLink: "https://avatar.iran.liara.run/public/3",
    name: "Charlie",
    lastChat: "Are we still on for tonight?",
    time: "9:15 AM",
    unreadChatsCount: 1,
    from: "Charlie",
    to: "David",
  },
  {
    imageLink: "https://avatar.iran.liara.run/public/4",
    name: "David",
    lastChat: "Yes, see you at 8!",
    time: "9:17 AM",
    unreadChatsCount: 0,
    from: "David",
    to: "Charlie",
  },
  {
    imageLink: "https://avatar.iran.liara.run/public/5",
    name: "Eve",
    lastChat: "Can you send me the report?",
    time: "8:45 AM",
    unreadChatsCount: 3,
    from: "Eve",
    to: "Frank",
  },
  {
    imageLink: "https://avatar.iran.liara.run/public/6",
    name: "Frank",
    lastChat: "Sure, give me a minute.",
    time: "8:50 AM",
    unreadChatsCount: 0,
    from: "Frank",
    to: "Eve",
  },
  {
    imageLink: "https://avatar.iran.liara.run/public/7",
    name: "Grace",
    lastChat: "Happy Birthday!",
    time: "7:30 AM",
    unreadChatsCount: 5,
    from: "Grace",
    to: "Heidi",
  },
  {
    imageLink: "https://avatar.iran.liara.run/public/8",
    name: "Heidi",
    lastChat: "Thank you!",
    time: "7:35 AM",
    unreadChatsCount: 0,
    from: "Heidi",
    to: "Grace",
  },
  {
    imageLink: "https://avatar.iran.liara.run/public/9",
    name: "Ivan",
    lastChat: "Let's catch up soon.",
    time: "6:00 AM",
    unreadChatsCount: 1,
    from: "Ivan",
    to: "Judy",
  },
  {
    imageLink: "https://avatar.iran.liara.run/public/10",
    name: "Judy",
    lastChat: "Absolutely!",
    time: "6:05 AM",
    unreadChatsCount: 0,
    from: "Judy",
    to: "Ivan",
  },
];
const ChatContainer: React.FC = () => {
  return (
    <div className="flex flex-col items-start gap-4 mt-4 sm:w-full md:w-1/3 lg:w-1/4">
      {chats.map((chat,id) => (
        <ChatItem
        key={id.toString()}
          name={chat.name}
          lastChat={chat.lastChat}
          unreadChatsCount={chat.unreadChatsCount}
          time={chat.time}
          imageLink={chat.imageLink}
        
        />
      ))}
    </div>
  );
};

export default ChatContainer;
