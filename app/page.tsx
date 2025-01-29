"use client"
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import StatusContainer from "./Components/StatusContainer";
import { FilterList } from "@mui/icons-material";
import ChatContainer from "./Components/ChatContainer";
import ChatMessages from "./Components/ChatMessages";
import { useIsVisibleStore } from "@/utils/store";

export default function Home() {
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
      <div className={`${!isSmall && "flex flex-row gap-3"}`}>
        <ChatContainer />
        {!isSmall && isVisible && (
          <div className="md:w-2/3 lg:w-3/4">
            <ChatMessages />
          </div>
        )}
      </div>
    </section>
  );
}