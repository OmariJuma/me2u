// app/Components/ChatItem.tsx
import { useIsVisibleStore, useUserStore } from "@/utils/store";
import { Badge, Typography } from "@mui/material";
import Image from "next/image";

interface chatProps {
  id: string;
  imageLink: string;
  name: string;
  lastChat: string;
  time: string;
  unreadChatsCount: number;
}

const ChatItem: React.FC<chatProps> = ({
  id,
  imageLink,
  name,
  lastChat,
  time,
  unreadChatsCount,
}) => {
  const updateIsVisible = useIsVisibleStore((state) => state.updateIsVisible);
  const setReceiverId = useUserStore((state) => state.setReceiverId);
  
  
  return (
    <div
      className="flex items-center justify-between py-2 w-full hover:animate-pulse hover:border-2 p-2 border-gray-300 rounded-md"
      onClick={() => {
        setReceiverId(id);
        updateIsVisible(true);
      }}
    >
      {/* Profile Image */}
      <div className="w-1/4">
        <Image width={60} height={60} src={imageLink} alt={name} className="rounded-full" />
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
          <Badge badgeContent={unreadChatsCount} color="info" className="mt-1" />
        )}
      </div>
    </div>
  );
};

export default ChatItem;