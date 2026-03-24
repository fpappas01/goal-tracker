"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Timer, LayoutDashboard, UserPlus, LogOut, LogIn } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#0f0f0f]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-blue-500"
        >
          <Timer size={28} />
          <span>GoalTicker</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Home
          </Link>

          {session ? (
            <>
              <Link
                href="/goals"
                className="text-sm text-gray-300 hover:text-white flex items-center gap-1"
              >
                <LayoutDashboard size={16} />
                Goals
              </Link>
              <button
                onClick={() => signOut()}
                className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="text-sm text-gray-300 hover:text-white flex items-center gap-1"
              >
                <UserPlus size={16} />
                Register
              </Link>
              <Link
                href="/api/auth/signin"
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition flex items-center gap-1"
              >
                <LogIn size={16} />
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
