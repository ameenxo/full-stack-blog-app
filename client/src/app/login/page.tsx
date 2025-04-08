"use client";
import { useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import Link from "next/link";

export default function Login() {
  const { login } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null)



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await login(emailOrUsername, password);
    if (response.error) {
      setLoginError(response.message)
    }
  };

  return (

    <div className="w-full h-screen flex justify-center items-center p-3">
      <div className=" border p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex flex-col gap-3">
        <h1 className="text-3xl font-semibold text-center">Login</h1>
        {loginError && <p className="text-red-500 text-center">{loginError}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            className="w-full p-2 border rounded my-2"
            onChange={(e) => setEmailOrUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded my-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Login
          </button>
          <p className="text-center p-3">
            Don&apos;t have an account? <Link href="/register" className="text-blue-500 hover:underline">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
