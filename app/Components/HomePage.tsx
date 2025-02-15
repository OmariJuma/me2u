"use client";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { FilterList } from "@mui/icons-material";
import { useIsVisibleStore, useUserStore } from "@/utils/store";

import StatusContainer from "./StatusContainer";
import ChatContainer from "./ChatContainer";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

interface HomePageProps {
  userId: RequestCookie; 
  userName: RequestCookie;
}

export default function HomePage({ userId, userName }: HomePageProps) {
  const [isSmall, setIsSmall] = useState(false);
  const isVisible = useIsVisibleStore((state) => state.isVisible);
  const setUserInfo = useUserStore((state) => state.setUserInfo); // ✅ Fix: Renamed correctly
  const receiverId = useUserStore((state) => state.receiverId);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Fix: Move user info state update inside useEffect
  useEffect(() => {
    if (userId && userName) {
      setUserInfo({
        id: userId.value.toString(),
        name: userName.value.toString(),
        profilePicUrl: "",
      });
      console.log("🔥 Updated User:", userId.value.toString(), "Receiver:", receiverId);
    }
  }, [userId, userName, setUserInfo, receiverId]); // ✅ Add dependencies

  return (
    <section className="my-2 mx-5">
      <StatusContainer />
      <div className="flex flex-row items-center justify-between pt-6 sm:w-full md:w-1/3 lg:w-1/4">
        <Typography variant="h5" className="font-extrabold">Chats</Typography>
        <FilterList />
      </div>
      <div className={`${!isSmall && "flex flex-row gap-3 h-[80vh]"}`}>
        {/* Left Chat List Panel */}
        <ChatContainer />

        {/* Right Chat Messages Panel */}
        {!isSmall && isVisible && (
          <div className="md:w-2/3 lg:w-3/4 overflow-y-auto h-full">
            <ChatMessages />
            <ChatInput senderId={userId.value.toString()} receiverId={receiverId} />
          </div>
        )}
      </div>
    </section>
  );
}
