import { NextApiRequest, NextApiesponse } from "next";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ noServer: true });

export default function GET(req: Next, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).end(); // This API route is not meant to be accessed directly
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

// Handle WebSocket connections when the Next.js server starts
if (!global.wssStarted) {
  global.wssStarted = true;

  wss.on("connection", (ws) => {
    console.log("✅ Client connected");

    ws.on("message", (message) => {
      console.log("📩 Received:", message.toString());
      ws.send(`Echo: ${message}`);
    });

    ws.on("close", () => console.log("⚠️ Client disconnected"));
    ws.on("error", (err) => console.error("❌ WebSocket Error:", err));
  });

  // Attach WebSocket to Next.js server
  process.on("request", (req: any, socket: any, head: any) => {
    if (req.url === "/api/ws") {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit("connection", ws, req);
      });
    }
  });

  console.log("🚀 WebSocket Server Running at ws://localhost:3000/api/ws");
}
