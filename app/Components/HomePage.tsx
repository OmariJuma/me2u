"use client";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { FilterList } from "@mui/icons-material";
import { useIsVisibleStore } from "@/utils/store";

import StatusContainer from "./StatusContainer";
import ChatContainer from "./ChatContainer";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function HomePage() {
  const [isSmall, setIsSmall] = useState(false);
  const isVisible = useIsVisibleStore((state) => state.isVisible);
  const chatData = useIsVisibleStore((state) => state.chatData);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSmall(true);
      } else {
        setIsSmall(false);
      }
    };
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="my-2 mx-5">
      <StatusContainer />
      <div className="flex flex-row items-center justify-between pt-6 sm:w-full md:w-1/3 lg:w-1/4">
        <Typography variant="h5" className="font-extrabold">
          Chats
        </Typography>
        <FilterList />
      </div>
      <div className={`${!isSmall && "flex flex-row gap-3 h-[80vh]"}`}>
        {/* Left Chat List Panel */}
        <ChatContainer />

        {/* Right Chat Messages Panel */}
        {!isSmall && isVisible && (
          <div className="md:w-2/3 lg:w-3/4 overflow-y-auto h-full">
            <ChatMessages />
            <ChatInput senderId="67a678e6d74d084b48b2b0a2" receiverId="67a67a81d74d084b48b2b0aa"/>
          </div>
        )}
      </div>
    </section>
  );
}
