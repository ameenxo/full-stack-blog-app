"use client"
// contexts/SocketContext.js
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext"; // or wherever your user context is

interface ServerToClientEvents {
    receiveMessage: (msg: string) => void;
    // add more if needed
}
interface ClientToServerEvents {
    sendMessage: (msg: string) => void;
    // add more if needed
}
interface SocketProviderProps {
    children: ReactNode;
}
type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents> | null;

const SocketContext = createContext<TypedSocket | null>(null);

export const SocketProvider = ({ children }: SocketProviderProps) => {
    const { user } = useAuth()
    const [socket, setSocket] = useState<TypedSocket | null>(null);

    useEffect(() => {
        if (user) {
            const socketInstance = io(process.env.NEXT_PUBLIC_SERVER_API_URL, {
                withCredentials: true,
                transports: ["websocket"],
            });

            setSocket(socketInstance);
            return () => {
                socketInstance.disconnect();
                setSocket(null);
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