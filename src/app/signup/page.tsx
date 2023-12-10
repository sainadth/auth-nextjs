"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { errorMonitor } from "events";
import toast from "react-hot-toast";
import axios from "axios";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    if (user.email.length && user.username.length && user.password.length)
      setDisabled(false);
    else setDisabled(true);
  }, [user]);

  const onSignup: any = async () => {
    try {
      const response = await axios.post("/api/signup", user);
      console.log("Signup Success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col p-10 shadow-2xl bg-cyan-300 text-black items-center justify-center">
        <h1 className=" text-2xl">SignUp</h1>
        <div className="flex flex-col m-4">
          <label>Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </div>
        <button
          className="p-2 bg-emerald-600 text-center block"
          onClick={onSignup}
          disabled={isDisabled}
        >
          SignUp
        </button>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}
