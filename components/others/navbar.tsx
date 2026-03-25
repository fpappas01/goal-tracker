"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  Timer,
  LayoutDashboard,
  UserPlus,
  LogOut,
  LogIn,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  console.log("Menu is open:", isOpen);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#0f0f0f] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-blue-500"
        >
          <Timer size={28} />
          <span>GoalTicker</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <NavContent session={session} />
        </div>

        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white p-2 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden ${isOpen ? "block" : "hidden"} bg-[#0f0f0f] border-t border-gray-800`}
      >
        <div className="flex flex-col space-y-2 p-6">
          <NavContent
            session={session}
            mobile
            onClick={() => setIsOpen(false)}
          />
        </div>
      </div>
    </nav>
  );
}

function NavContent({
  session,
  mobile,
  onClick,
}: {
  session: any;
  mobile?: boolean;
  onClick?: () => void;
}) {
  const baseLinkStyle =
    "text-gray-300 hover:text-white transition flex items-center gap-3";
  const desktopStyle = "text-sm";
  const mobileStyle =
    "text-lg py-3 w-full border-b border-gray-900 last:border-0";

  const combinedStyle = `${baseLinkStyle} ${mobile ? mobileStyle : desktopStyle}`;

  return (
    <>
      <Link href="/" className={combinedStyle} onClick={onClick}>
        Home
      </Link>

      {session ? (
        <>
          <Link href="/goals" className={combinedStyle} onClick={onClick}>
            <LayoutDashboard size={mobile ? 22 : 16} />
            Goals
          </Link>
          <button
            onClick={() => {
              signOut();
              onClick?.();
            }}
            className={`${combinedStyle} text-red-400 hover:text-red-300 justify-start`}
          >
            <LogOut size={mobile ? 22 : 16} />
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/register" className={combinedStyle} onClick={onClick}>
            <UserPlus size={mobile ? 22 : 16} />
            Register
          </Link>
          <Link
            href="/api/auth/signin"
            onClick={onClick}
            className={`
              flex items-center justify-center gap-2 rounded-lg bg-blue-600 font-medium text-white transition hover:bg-blue-700
              ${mobile ? "mt-4 py-4 text-lg" : "px-4 py-2 text-sm"}
            `}
          >
            <LogIn size={mobile ? 22 : 16} />
            Login
          </Link>
        </>
      )}
    </>
  );
}
