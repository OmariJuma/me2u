import { useEffect, useRef, useState } from "react";

export const useWebSocket = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:3000/api/ws"); // Connect to Next.js WebSocket

    socketRef.current.onopen = () => {
      console.log("✅ WebSocket Connected");
      setIsConnected(true);
    };

    socketRef.current.onmessage = (event) => {
      console.log("📩 Received:", event.data);
    };

    socketRef.current.onerror = (error) => {
      console.error("❌ WebSocket Error:", error);
    };

    socketRef.current.onclose = () => {
      console.warn("⚠️ WebSocket Disconnected");
      setIsConnected(false);
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const sendMessage = (message: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn("⚠️ Cannot send message, WebSocket not open");
    }
  };

  return { sendMessage, isConnected };
};
