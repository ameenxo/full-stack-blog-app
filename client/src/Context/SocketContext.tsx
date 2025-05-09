"use client"
// contexts/SocketContext.js
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext"; // or wherever your user context is
import { ChatUser } from "@/types/message/chatUserType";
import { ChatMessage, ReceivedMessageType } from "@/types/message/chatMessageType";

interface SocketContextType {
    socket: Socket | null;
    sendMessage: (receiverId: string, text: string, callback: (response: { success: boolean; message?: string, data?: ChatMessage }) => void) => void;
    selectedUser: ChatUser | null;
    setSelectedUser: React.Dispatch<React.SetStateAction<ChatUser | null>>;
    chatUsers: ChatUser[];
    setChatUsers: React.Dispatch<React.SetStateAction<ChatUser[]>>;
    chatHistory: ChatMessage[];
    setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
    otherUsers: ChatUser[];
    setOtherUsers: React.Dispatch<React.SetStateAction<ChatUser[]>>;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode; }) => {
    const { user } = useAuth()
    const [socket, setSocket] = useState<Socket | null>(null);
    const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null)
    const [chatUsers, setChatUsers] = useState<ChatUser[]>([])
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [otherUsers, setOtherUsers] = useState<ChatUser[]>([])
    const isListenerSet = useRef(false);
    const selectedUserRef = useRef(selectedUser);

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
        selectedUserRef.current = selectedUser;
    }, [selectedUser]);
    useEffect(() => {
        if (socket && !isListenerSet.current) {
            socket.on("receiveMessage", (message: ReceivedMessageType) => {
                console.log("New message received:", message);
                const currentSelectedUser = selectedUserRef.current;
                if (currentSelectedUser && currentSelectedUser._id === message.from.userId) {
                    setChatHistory((prev) => [...prev, message.message]);
                } else {
                    setChatUsers((prevUsers) => {
                        const existingIndex = prevUsers.findIndex(
                            (user) => user._id === message.from.userId
                        );

                        if (existingIndex !== -1) {
                            const updatedUser = { ...prevUsers[existingIndex] };
                            const updatedUsers = [...prevUsers];
                            updatedUsers.splice(existingIndex, 1);
                            return [updatedUser, ...updatedUsers];
                        } else {
                            const newUser: ChatUser = {
                                _id: message.from.userId,
                                username: message.from.userName,
                                avatar: message.from.avatar,
                                bio: "", // Default value for bio
                                lastMessage: {
                                    isSender: false,
                                    text: message.message.text,
                                    timestamp: message.message.timestamp
                                }, // Default value for lastMessage
                                unreadCount: 1, // Default value for unreadCount
                            };
                            return [newUser, ...prevUsers];
                        }
                    });
                }
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
        selectedUser: selectedUser,
        setSelectedUser: setSelectedUser,
        chatHistory: chatHistory,
        setChatHistory: setChatHistory,
        chatUsers: chatUsers,
        setChatUsers: setChatUsers,
        otherUsers: otherUsers,
        setOtherUsers: setOtherUsers

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