"use client";
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import axios from "axios";
import { AuthContextType, LoginResponse } from "@/types/authContext";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { ApiResponse } from "@/types/api-response";
import { AuthError } from "@/types/error";

// Create context with a default value of null
const AuthContext = createContext<AuthContextType | null>(null);

// Define Props for AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}

// Provider Component
export function AuthProvider({ children }: AuthProviderProps) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [authError, setAuthError] = useState<AuthError | null>(null);

    // Check if user is already logged in (on page refresh)
    useEffect(() => {
        checkUser();
    }, []);

    // check user already logged in or not
    const checkUser = () => {
        if (user) {
            return;
        }
        axios.get<ApiResponse<User>>("http://localhost:2025/user/me", { withCredentials: true })
            .then((res) => {
                if (res.data.error) {
                    setUser(null);
                    setAuthError(null);
                    alert("You are not logged in");
                    router.push("/login");
                    return
                }
                if (res.status === 200 && res.data.data) {
                    setUser(res.data.data);
                    setAuthError(null);
                    router.push('/');
                    return
                } else {
                    setUser(null);
                    setAuthError(null);
                    alert("You are not logged in");
                    router.push("/login");
                    return;
                }
            })
            .catch((error) => {
                if (error.response) {
                    setAuthError({ error: true, message: error.response.data.message });
                    return
                } else {
                    setAuthError(null);
                    return
                }

            });
    }

    // Login function

    const login = async (email: string, password: string): Promise<LoginResponse> => {
        try {
            const res = await axios.post<ApiResponse<User>>("http://localhost:2025/user/login", { emailOrUsername: email, password }, { withCredentials: true });
            if (res.data.error) {
                return res.data;
            }
            if (res.status === 200 && res.data.data) {
                setUser(res.data.data);
                setAuthError(null);
                router.push('/');
                return res.data;
            } else {
                return res.data;
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data
            }
            return {
                error: true,
                message: error instanceof Error ? error.message : "An unknown error occurred"
            };
        }

    };

    // Logout function
    const logout = async (): Promise<void> => {
        try {
            const res = await axios.post<ApiResponse<null>>(
                "http://localhost:2025/user/logout",
                {},
                { withCredentials: true }
            );


            if (res.status === 200 && !res.data.error) {
                setUser(null);
                setAuthError(null);
                alert(res.data.message);
                router.push('/login');

            } else {
                setAuthError({ error: true, message: res.data.message });
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setAuthError({
                    error: true,
                    message: error.response?.data?.message || "Server error occurred"
                });
            } else {
                setAuthError({
                    error: true,
                    message: error instanceof Error ? error.message : "An unknown error occurred"
                });
            }
        }
    };



    return (
        <AuthContext.Provider value={{ user, login, logout, authError, setAuthError }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook to use auth context
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
