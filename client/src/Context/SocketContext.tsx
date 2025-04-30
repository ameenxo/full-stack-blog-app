"use client"
// contexts/SocketContext.js
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext"; // or wherever your user context is
import { ChatUser } from "@/types/message/chatUserType";
import { ChatMessage } from "@/types/message/chatMessageType";



interface ReceivedMessageType {
    from: {
        userId: string,
        userName: string,
        avatar: string,
    },
    message: {
        _id: string,
        sender: string,
        receiver: string,
        text: string,
        isRead: boolean,
        timestamp: number,
    }
}

interface SocketContextType {
    socket: Socket | null;
    sendMessage: (receiverId: string, text: string, callback: (response: { success: boolean; message?: string, data?: ChatMessage }) => void) => void;
    receivedMessage: ReceivedMessageType | null;
    selectedUser: ChatUser | null;
    setSelectedUser: React.Dispatch<React.SetStateAction<ChatUser | null>>;
    chatUsers: ChatUser[];
    setChatUsers: React.Dispatch<React.SetStateAction<ChatUser[]>>;
    chatHistory: ChatMessage[];
    setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode; }) => {
    const { user } = useAuth()
    const [socket, setSocket] = useState<Socket | null>(null);
    const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null)
    const [receivedMessage, setReceivedMessage] = useState<ReceivedMessageType | null>(null);
    const [chatUsers, setChatUsers] = useState<ChatUser[]>([])
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
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
                alert("new message received")
                setReceivedMessage(message);
            });
            isListenerSet.current = true;
        }
    }, [socket]);
    const sendMessage = (receiverId: string, text: string, callback: (response: { success: boolean; message: string, data?: ChatMessage }) => void) => {
        if (socket) {
            socket.emit("sendMessage", { senderId: user?._id, receiverId, text }, callback);
        }
    };
    const value: SocketContextType = {
        socket,
        sendMessage,
        receivedMessage,
        selectedUser: selectedUser,
        setSelectedUser: setSelectedUser,
        chatHistory: chatHistory,
        setChatHistory: setChatHistory,
        chatUsers: chatUsers,
        setChatUsers: setChatUsers

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