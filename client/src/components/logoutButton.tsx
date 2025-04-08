"use client";
import { useAuth } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();
    const { logout, user } = useAuth();

    const handleLogOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        if (!user) {
            router.push("/login");
            return;
        }

        await logout(); // Ensure logout is awaited

        // Redirect to login after logout
        router.push("/login");
    };

    return <button onClick={handleLogOut}>{user ? "Logout" : "Login"}</button>;
}
