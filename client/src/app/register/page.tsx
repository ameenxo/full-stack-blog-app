"use client";
import React, { useState } from 'react'
import { RegisterError } from '@/types/error';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
function Register() {
  const router = useRouter();
  const [error, setError] = useState<RegisterError | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:2025/user/register',
        { username, email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setError(null);
        router.push('/login');
      } else {
        setError({error:true, message: res.data.message || "An unknown error occurred from register server" });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError({error:true, message: error.response.data.message });
      } else {
        setError({error:true, message: error instanceof Error ? error.message : "An unknown error occurred" });
      }
    }

  }
  return (
    <div className="w-full h-screen flex justify-center items-center p-3">
      <div className=" border p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex flex-col gap-3">
        <h1 className="text-3xl font-semibold text-center">Register</h1>
        {error && <p className="text-red-500 text-center">{error.message}</p>}
        <form onSubmit={handleSubmit} >
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded my-2"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            className="w-full p-2 border rounded my-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded my-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Register
          </button>
          <p className='text-center p-3'>
            Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register   