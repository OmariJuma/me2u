import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import connectToDb from "@/utils/connectToDb";
import { ToastContainer } from "react-toastify";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Me2U",
  description: "NextJs chat app with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  connectToDb()
    return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer/>
        <AppBar
          position="sticky"
          style={{
            backgroundColor: "var(--background)",
            color: "var(--foreground)'",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              className="flex flex-row justify-between sm:w-full md:w-1/3 lg:w-1/4"
            >
              <Typography
                variant="h4"
                component={"a"}
                className="ml-2 text-md"
                href="#"
              >
                Me2u
              </Typography>

              <SearchIcon color="primary" fontSize="large" />
            </Toolbar>
          </Container>
        </AppBar>
        {children}
      </body>
    </html>
  );
}
