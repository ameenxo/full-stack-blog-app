"use client"
// contexts/SocketContext.js
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext"; // or wherever your user context is


interface SocketProviderProps {
    children: ReactNode;
}

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: SocketProviderProps) => {
    const { user } = useAuth()
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (user && !socket) {
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

    return (
        <SocketContext.Provider value={socket}>
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