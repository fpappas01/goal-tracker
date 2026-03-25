"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Καλούμε το NextAuth Credentials login
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Θέλουμε να χειριστούμε εμείς το αποτέλεσμα
    });

    if (res?.error) {
      setError("Wrong email or password.");
    } else {
      router.push("/goals"); // Ανακατεύθυνση στη σελίδα των στόχων
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-gray-800 w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-2">Welcome</h2>
        <p className="text-gray-400 text-center mb-8 text-sm">
          Sign in to view your goals
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full p-3 rounded-lg bg-black border border-gray-800 focus:border-blue-500 focus:outline-none transition"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full p-3 rounded-lg bg-black border border-gray-800 focus:border-blue-500 focus:outline-none transition"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 rounded-lg font-bold text-white hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 text-sm">
          Do not have an account?{" "}
          <Link
            href="/register"
            className="text-blue-500 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
