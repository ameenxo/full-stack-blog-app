"use client"
// contexts/SocketContext.js
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext"; // or wherever your user context is



interface ReceivedMessageType {
    senderId: string;
    username: string;
    avatar: string;
    count: number;
    lastMessage: {
        text: string;
        timestamp: string;
    };
}
interface SocketProviderProps {
    children: ReactNode;
}
interface SocketContextType {
    socket: Socket | null;
    sendMessage: (receiverId: string, text: string, callback: (response: { success: boolean; message?: string }) => void) => void;
    receivedMessage: ReceivedMessageType | null;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: SocketProviderProps) => {
    const { user } = useAuth()
    const [socket, setSocket] = useState<Socket | null>(null);
    const [receivedMessage, setReceivedMessage] = useState<ReceivedMessageType | null>(null)
    const isListenerSet = useRef(false);

    useEffect(() => {
        if (user) {
            const newSocket = io(process.env.NEXT_PUBLIC_SERVER_API_URL, {
                withCredentials: true,
                transports: ["websocket"],
                query: { userId: user._id }
            });
            newSocket.on("connect", () => {
                console.log("Socket connected:", newSocket.id);
            });
            newSocket.on("disconnect", () => {
                console.log("Socket disconnected");
            });

            setSocket(newSocket);
            return () => {
                newSocket.disconnect();
            };

        }
    }, [user]);
    useEffect(() => {
        if (socket && !isListenerSet.current) {
            socket.on("receiveMessage", (message: ReceivedMessageType) => {
                console.log("New message received:", message);
                setReceivedMessage(message);
            });
            isListenerSet.current = true;
        }
    }, [socket]);
    const sendMessage = (receiverId: string, text: string, callback: (response: { success: boolean; message?: string }) => void) => {
        if (socket) {
            socket.emit("sendMessage", { senderId: user?._id, receiverId, text }, callback);
        }
    };
    const value: SocketContextType = {
        socket,
        sendMessage,
        receivedMessage,
    };
    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

export function useSocket() {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within an SocketProvider");
    }
    return context
}