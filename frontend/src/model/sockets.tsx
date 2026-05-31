import { io, Socket } from "socket.io-client";
import { useEffect, useRef } from "react";
import { useLazyFetchMessagesQuery } from "./messages/messages.api";

const Sockets = () => {
  const socketRef = useRef<Socket | null>(null);
  const [fetchMessages] = useLazyFetchMessagesQuery();

  useEffect(() => {
    socketRef.current = io();

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("✅ Socket connected! ID:", socket.id);
    });

    socket.on("connect_error", (error) => {
      console.error("❌ Socket connection error:", error.message);
    });

    socket.on("newMessage", () => {
      fetchMessages();
    });

    return () => {
      socket.on("disconnect", (reason) => {
        console.log("🔌 Socket disconnected:", reason);
      });
      socketRef.current = null;
    };
  }, []);

  return null;
};

export default Sockets;
