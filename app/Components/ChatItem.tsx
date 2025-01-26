import { Badge, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface chatProps {
  imageLink: string;
  name: string;
  lastChat: string;
  time: string;
  unreadChatsCount: number;
}
const ChatItem: React.FC<chatProps> = ({
  imageLink,
  name,
  lastChat,
  time,
  unreadChatsCount,
}) => {
  
  return (
    <Link className="flex items-center justify-between py-2 w-full hover:animate-pulse hover:border-2 p-2 border-gray-300 rounded-md" href={'/ChatPage'}
     >
      {/* Profile Image */}
      <div className="w-1/4">
        <Image
          width={60}
          height={60}
          src={imageLink}
          alt={name}
          className="rounded-full"
        />
      </div>
      {/* Chat Details */}
      <div className="w-1/2 overflow-ellipsis ml-1">
        <Typography variant="subtitle1" className="text-left font-medium">
          {name}
        </Typography>
        <Typography variant="body2" className="text-gray-500 truncate">
          {lastChat}
        </Typography>
      </div>
      {/* Time and Badge */}
      <div className="w-1/4 text-center">
        <Typography variant="body2" className="text-gray-400">
          {time}
        </Typography>
        {unreadChatsCount > 0 && (
          <Badge
            badgeContent={unreadChatsCount}
            color="info"
            className="mt-1"
          />
        )}
      </div>
    </Link>
  );
};

export default ChatItem;
