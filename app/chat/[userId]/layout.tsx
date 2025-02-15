'use client';

import React from 'react';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatContainer from '@/app/Components/ChatContainer';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <AppBar position="static" className="bg-white text-black shadow-sm">
        <Container maxWidth="xl">
          <Toolbar disableGutters className="flex justify-between">
            <Typography variant="h6" component="div">
              Chat
            </Typography>
            <SearchIcon color="primary" />
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      {/* <div className="flex flex-1 overflow-hidden"> */}
        {/* Chat List Sidebar */}
        {/* <aside className="w-full md:w-1/3 lg:w-1/4 border-r"> */}
          {/* <ChatContainer /> */}
        {/* </aside> */}

        {/* Chat Messages Area */}
        <section>
          {children}
        </section>
      {/* </div> */}
    </main>
  );
}