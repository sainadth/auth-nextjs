"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast/headless";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      const response: any = await axios.post("/api/login", user);
      console.log("Login Successful", response);
      router.push(`/profile/${user.email}`);
    } catch (error: any) {
      console.log("Invalid email or password", error);
      toast.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col p-10 shadow-2xl bg-cyan-300 text-black items-center justify-center">
        <h1 className=" text-2xl">Login</h1>
        <div className="flex flex-col m-4">
          <label>Email</label>
          <input
            type="text"
            name="username"
            id="email"
            placeholder="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label>Password</label>
          <input
            type="text"
            name="username"
            id="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button
          onClick={onLogin}
          className="p-2 bg-emerald-600 text-center block"
        >
          Login
        </button>
        <Link href="/signup">SignUp</Link>
      </div>
    </div>
  );
}
